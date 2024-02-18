import { cn } from '@/lib/utils';
import Logo from './logo';
import ThemeToggle from './theme-toggle';
import UserButton from './user-button';

const Header = () => {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <div className="hidden lg:block">
          <Logo />

          <div className={cn('block lg:!hidden')}>{/* MobileSidebar */}</div>
        </div>

        <div className="flex items-center gap-x-2">
          <UserButton />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Header;
