import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-[var(--text-secondary)]">
        {items.map((item, idx) => (
          <li key={item.href} className="flex items-center">
            {idx > 0 && <span className="mx-1">/</span>}
            {idx < items.length - 1 ? (
              <Link href={item.href} className="hover:underline text-[var(--primary-blue)]">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[var(--text-color)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
