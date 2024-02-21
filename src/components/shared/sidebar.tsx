import { sidebarNavItems } from '@/constants';
import { cn } from '@/lib/utils';
import SidebarNav from './sidebar-nav';

const Sidebar = () => {
  return (
    <nav
      className={cn(
        'relative hidden h-screen w-72 min-w-64 border-r pt-16 lg:block',
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h4 className="mb-2 px-2 text-xs font-normal uppercase tracking-widest  text-gray-500">
              Overview
            </h4>
            <SidebarNav items={sidebarNavItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
