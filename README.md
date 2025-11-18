# MHMmobiles E-Commerce

A modern, production-ready e-commerce website for MHMmobiles built with Next.js 14, Express.js, MySQL, Prisma, TailwindCSS, and more.

## Features
- Next.js 14 (App Router)
- Express.js backend API (TypeScript)
- MySQL Database (Prisma ORM)
- JWT Auth for Admin
- Product & Blog CRUD (Admin)
- Image upload (products/blog)
- Dynamic alt tags for images
- next-seo for SEO, Open Graph, Twitter cards, JSON-LD
- Auto sitemap & robots.txt
- Responsive hero video section
- Category filtering & sorting
- Contact form (Express email API)
- Fully responsive, modern UI

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your MySQL database in `.env`:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
4. Start Next.js frontend:
   ```bash
   npm run dev
   ```
5. Start Express backend (in `express-backend`):
   ```bash
   cd express-backend
   npm install
   npm run dev
   ```

## Assets
- Place product images in `/public/products`
- Place blog images in `/public/blog`
- Place logo in `/public/logo.webp`
- Place hero video in `/public/hero.mp4`

## Admin Login
- username: root
- password: root

---

For full documentation, see code comments and `/docs` (if present).
