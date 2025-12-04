"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
// Load PBKDF2 helpers (CommonJS module)
const { verifyPassword } = require('./lib/password');
const client_1 = require("@prisma/client");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const uploadProducts = (0, multer_1.default)({ dest: path_1.default.join(__dirname, '../public/products') });
const uploadBlog = (0, multer_1.default)({ dest: path_1.default.join(__dirname, '../public/blog') });
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://mhmmobiles.vercel.app',
    ],
    credentials: true
}));
// Security headers middleware
app.use((req, res, next) => {
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
app.use(express_1.default.json());
// Admin login
app.post('/api/xdm/xadm', async (req, res) => {
    const { username, password } = req.body;
    const admin = await prisma.admin.findFirst({ where: { username } });
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
});
// JWT middleware
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    try {
        req.user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        next();
    }
    catch {
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
    if (!product)
        return res.sendStatus(404);
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
    if (!blog)
        return res.sendStatus(404);
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
app.post('/api/upload/product', auth, uploadProducts.single('image'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });
    res.json({ filename: req.file.filename });
});
app.post('/api/upload/blog', auth, uploadBlog.single('image'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });
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
    const transporter = nodemailer_1.default.createTransport({
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
app.use('/products', express_1.default.static(path_1.default.join(__dirname, '../public/products')));
app.use('/blog', express_1.default.static(path_1.default.join(__dirname, '../public/blog')));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Express API running on port ${PORT}`));
