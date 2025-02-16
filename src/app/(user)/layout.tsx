import MobileNavigation from "./_components/mobile-nav";
import Sidebar from "./_components/sidebar";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <div className="w-1/4 min-w-60 hidden lg:block"><Sidebar /></div>
      <MobileNavigation />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default UserDashboardLayout;
