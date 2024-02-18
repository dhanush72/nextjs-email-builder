'use client';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavProps {
  items: NavItem[];
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const path = usePathname();
  if (!items.length) return;

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          item.href && (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  {
                    'bg-accent': item.href === path,
                    'transparent cursor-not-allowed opacity-80': item.disabled,
                  },
                )}
              >
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default SidebarNav;
