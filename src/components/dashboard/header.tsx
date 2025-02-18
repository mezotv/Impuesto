import DynamicBreadcrumbs from "./dynamic-breadcrumbs";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import UserMenu from "./user-menu";

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/9.x/micah/svg",
};

function Header() {
  return (
    <header className="bg-sidebar sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-dashed pr-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="hover:bg-sidebar-accent -ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DynamicBreadcrumbs />
      </div>
      <div className="ml-auto">
        <UserMenu user={user} />
      </div>
    </header>
  );
}

export default Header;
