import { ScrollArea } from '@/components/ui/scroll-area';
import { metaObject } from '@/config/site.config';
import { currentUser } from '@/lib/auth';
import { getEmailsByFolderId } from '@/lib/queries';
import CreateEmailButton from '../_components/create-email-button';
import EmailCard from '../_components/email-card';

export const metadata = {
  ...metaObject('Emails'),
};

interface FolderPageIdProps {
  params: { folderId: string };
}

const FolderPageId = async ({ params }: FolderPageIdProps) => {
  const user = await currentUser();
  if (!user || !user.id) return;

  const emails = await getEmailsByFolderId(params.folderId);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Emails</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CreateEmailButton folderId={params.folderId} label="Add email" />
          </div>
        </div>

        {emails?.length ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {emails.map((email) => (
              <EmailCard
                key={email.id}
                folderId={params.folderId}
                email={email}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[400px] items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
              <h5 className="text-xl font-medium">No emails</h5>
              <p className="mb-2 text-sm text-muted-foreground">
                Get started by creating a new email
              </p>
              <CreateEmailButton
                folderId={params.folderId}
                label="Create new email"
              />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default FolderPageId;
