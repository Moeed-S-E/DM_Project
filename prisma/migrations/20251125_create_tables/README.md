Prisma migration to create initial tables (Product, Blog, Admin, ContactMessage)

- Run `npx prisma migrate deploy` to apply this migration to your target DATABASE_URL.
- This migration contains `CREATE TABLE IF NOT EXISTS` SQL for TiDB/MySQL.

Notes:
- `Order` table is assumed to already exist (you reported it exists).
- If your production DB has a different schema for any table, review and adjust the SQL accordingly.
- Always backup production before applying migrations.
