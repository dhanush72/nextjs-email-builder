import Header from '@/components/shared/header';
import Sidebar from '@/components/shared/sidebar';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Dashboard'),
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex min-h-full w-full flex-grow flex-col pt-16">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
