import { cn } from '@/lib/utils';
import { BreadcrumbType } from '@/types';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface BreadCrumbProps {
  items: BreadcrumbType[];
}

const Breadcrumb = ({ items }: BreadCrumbProps) => {
  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        Dashboard
      </Link>
      {items.map((item: BreadcrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h4 w-4" />
          <Link
            href={item.link}
            className={cn(
              'font-medium',
              index === items.length - 1
                ? 'pointer-events-none text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
