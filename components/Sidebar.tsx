import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full sm:w-40 flex items-center justify-between flex-wrap container mx-auto">
      {links.map((link) => (
        <SidebarLink key={link.link} link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
