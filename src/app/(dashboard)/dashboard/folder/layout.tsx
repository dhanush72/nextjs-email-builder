import Breadcrumb from '@/components/shared/breadcrumb';

const breadcrumbItems = [{ title: 'Email', link: '/dashboard' }];
const EmailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex-1 p-4 pt-6 md:p-6">
        <Breadcrumb items={breadcrumbItems} />
        {children}
      </div>
    </>
  );
};

export default EmailLayout;
