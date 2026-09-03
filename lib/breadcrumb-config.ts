export const BREADCRUMB_LABELS: Record<string, string> = {
  accounts: "Accounts",
  transactions: "Transactions",
  categories: "Categories",
  profile: "Profile",
};

export type Crumb = { label: string; href: string };

export function buildTrail(
  pathname: string,
  overrides: Record<string, string> = {},
): Crumb[] {
  const pathParts = pathname.split("/").filter(Boolean);
  const trail: Crumb[] = [{ label: "Dashboard", href: "/" }];

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];
    const href = `/${pathParts.slice(0, i + 1).join("/")}`;
    const prettify = decodeURIComponent(part).replace(/[-_]/g, " ");
    const label = overrides[href] || BREADCRUMB_LABELS[part] || prettify;
    trail.push({ label, href });
  }

  return trail;
}
