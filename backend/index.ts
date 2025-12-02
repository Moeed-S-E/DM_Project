import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const app = express();
const prisma = new PrismaClient();
const uploadProducts = multer({ dest: path.join(__dirname, '../public/products') });
const uploadBlog = multer({ dest: path.join(__dirname, '../public/blog') });
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mhmmobiles.vercel.app',
  ],
  credentials: true
}));
// Security headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https://mhmmobiles.vercel.app; script-src 'self'; style-src 'self' 'unsafe-inline';");
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=()');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Origin-Agent-Cluster', '?1');
  // Trusted Types header for supported browsers
  res.setHeader('Trusted-Types', 'default');
  next();
});
// Warm-up endpoint for Render
app.get('/ping', (req, res) => {
  res.status(200).json({ ok: true, message: 'pong' });
});
app.use(express.json());

// Admin login
app.post('/api/xdm/xadm', async (req, res) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findFirst({ where: { username } });
  if (!admin || !bcrypt.compareSync(password, admin.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
// JWT middleware
function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Product CRUD
app.get('/api/products', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
app.get('/api/products/:slug', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug } });
  if (!product) return res.sendStatus(404);
  res.json(product);
});
app.post('/api/products', auth, async (req, res) => {
  const product = await prisma.product.create({ data: req.body });
  res.json(product);
});
app.put('/api/products/:id', auth, async (req, res) => {
  const product = await prisma.product.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(product);
});
app.delete('/api/products/:id', auth, async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

// Blog CRUD
app.get('/api/blog', async (req, res) => {
  const blogs = await prisma.blog.findMany();
  res.json(blogs);
});
app.get('/api/blog/:slug', async (req, res) => {
  const blog = await prisma.blog.findUnique({ where: { slug: req.params.slug } });
  if (!blog) return res.sendStatus(404);
  res.json(blog);
});
app.post('/api/blog', auth, async (req, res) => {
  const blog = await prisma.blog.create({ data: req.body });
  res.json(blog);
});
app.put('/api/blog/:id', auth, async (req, res) => {
  const blog = await prisma.blog.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json(blog);
});
app.delete('/api/blog/:id', auth, async (req, res) => {
  await prisma.blog.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

// Image upload
app.post('/api/upload/product', auth, uploadProducts.single('image'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename });
});
app.post('/api/upload/blog', auth, uploadBlog.single('image'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.filename });
});

// Contact form
app.options('/api/contact', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'https://mhmmobiles.vercel.app',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.sendStatus(200);
});
app.post('/api/contact', async (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': 'https://mhmmobiles.vercel.app',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  const { name, email, message } = req.body;
  // Configure your SMTP transport here
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: email,
    to: process.env.CONTACT_EMAIL,
    subject: `Contact from ${name}`,
    text: message,
  });
  res.json({ success: true });
});

// Serve static images
app.use('/products', express.static(path.join(__dirname, '../public/products')));
app.use('/blog', express.static(path.join(__dirname, '../public/blog')));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
