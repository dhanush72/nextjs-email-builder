import ThemeModeToggle from '@/components/shared/theme-mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { metaObject } from '@/config/site.config';
import { LogOut } from 'lucide-react';
import { auth, signOut } from '../api/auth/auth';

export const metadata = {
  ...metaObject('Dashboard'),
};

const DashboardPage = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    'use server';
    await signOut();
  };
  return (
    <div className="h-full min-h-[0px] flex-1 basis-0">
      <div className="flex h-full">
        <div className="h-full w-64 overflow-auto border-r border-gray-200">
          Sidebar
        </div>
        <div className="flex flex-1 flex-col">
          <header className="flex h-14 max-h-14 items-center justify-end border-b border-gray-200 px-5 py-2">
            <div className="flex items-center gap-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DH</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mr-16 w-56">
                  <Button variant="ghost" className="gap-x-2">
                    <LogOut size={16} className="text-muted-foreground" />
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
              <ThemeModeToggle />
            </div>
          </header>
          <div className="flex-1 flex-grow overflow-y-auto">
            {JSON.stringify(session)}

            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button variant="ghost" className="gap-x-2">
                <LogOut size={16} className="text-muted-foreground" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
