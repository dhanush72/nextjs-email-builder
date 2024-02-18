'use client';

import Logo from '@/components/shared/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="relative flex min-h-full flex-col">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-gray-950"></div>

      <div className="flex flex-1 flex-col">
        <div className="absolute top-0 mx-auto mt-6 w-full px-8 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10">
            <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
              <div className="flex w-full items-center justify-between md:w-auto">
                <Logo />
              </div>
            </div>
          </nav>
        </div>

        <div className="flex flex-1">
          <main className="flex flex-1 flex-shrink-0 flex-col items-center border-r px-5 pb-8 pt-16 shadow-lg dark:border-gray-800">
            {children}
          </main>

          {pathname !== '/forgot-password' && (
            <aside className="hidden flex-1 flex-shrink basis-1/4 flex-col items-center justify-center xl:flex"></aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
