import DashboardNavBar from '@/components/layout/navigation-navbar';
import DashboardSidebar from '@/components/layout/navigation-sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <div className="flex text-white font-kanit">
        <DashboardSidebar />
        <DashboardNavBar>{children}</DashboardNavBar>
      </div>
    </div>
  );
}