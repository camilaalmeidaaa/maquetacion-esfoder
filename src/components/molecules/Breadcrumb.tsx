interface BreadcrumbProps {
  items: string[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm min-w-0 flex-shrink-0">
      {items.map((crumb, i, arr) => (
        <span key={`${crumb}-${i}`} className="flex items-center gap-1.5 min-w-0">
          {i > 0 && <span className="text-border">/</span>}
          <span
            className={
              i === arr.length - 1
                ? "font-semibold text-foreground truncate"
                : "text-muted-foreground"
            }
          >
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
}
