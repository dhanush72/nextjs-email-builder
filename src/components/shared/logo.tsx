import { siteConfig } from '@/config/site.config';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      className={twMerge(
        'flex items-end gap-2 text-base font-medium dark:text-white',
        className,
      )}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.title}
        width={36}
        height={36}
      />
      EmailCraft
    </Link>
  );
};

export default Logo;
