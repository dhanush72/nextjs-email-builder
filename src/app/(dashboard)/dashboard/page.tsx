import { auth } from '@/app/api/auth/auth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { metaObject } from '@/config/site.config';
import { currentUser } from '@/lib/auth';
import { getFolders } from '@/lib/queries';
import CreateFolderButton from './_components/create-folder-button';
import FolderItem from './_components/folder';

export const metadata = {
  ...metaObject('Dashboard'),
};

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user || !user.id) return;

  const folders = await getFolders(user.id);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Folders</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CreateFolderButton label="Add folder" />
          </div>
        </div>

        {folders?.length ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {folders.map((folder) => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
              <h5 className="text-xl font-medium">No folders</h5>
              <p className="mb-2 text-sm text-muted-foreground">
                Get started by creating a new folder
              </p>
              <CreateFolderButton label="Create new folder" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default DashboardPage;
