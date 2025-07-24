export interface NavigationItem {
    name: string;
    href?: string;
    items?: Array<{
        name: string;
        href: string;
    }>;
}
