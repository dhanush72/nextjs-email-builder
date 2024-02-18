import { auth, signOut } from '@/app/api/auth/auth';
import Logo from '@/components/shared/logo';
import ThemeModeToggle from '@/components/shared/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { metaObject } from '@/config/site.config';
import { LogOut, Plus } from 'lucide-react';

export const metadata = {
  ...metaObject('Dashboard'),
};

const DashboardPage = async () => {
  const session = await auth();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Emails</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Button>
              {' '}
              <Plus /> New email
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default DashboardPage;
