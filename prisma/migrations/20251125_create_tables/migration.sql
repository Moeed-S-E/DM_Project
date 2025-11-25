-- Migration: create missing tables for Prisma schema models
-- Generated manually from /prisma/schema.prisma
-- Use `npx prisma migrate deploy` to run this against a target database

-- Products
CREATE TABLE IF NOT EXISTS `Product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` longtext NOT NULL,
  `price` double NOT NULL,
  `salePrice` double NULL,
  `stock` int NOT NULL,
  `image` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Product_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Blogs
CREATE TABLE IF NOT EXISTS `Blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` longtext NOT NULL,
  `coverImage` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Blog_slug_key` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admins
CREATE TABLE IF NOT EXISTS `Admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact messages
CREATE TABLE IF NOT EXISTS `ContactMessage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `handled` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Note: The `Order` table already exists (you mentioned it).
-- If the schema might differ from these types (e.g., `price` as decimal) adjust accordingly.

-- Optional: enforce foreign keys here if needed for future models (none exist today)

-- End of migration
