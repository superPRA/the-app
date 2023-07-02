import uuid from "react-uuid";
import SidebarNavs from "./SidebarNavs";
import SidebarAvatar from "./SidebarAvatar";
import { CiGrid41, CiUser } from "react-icons/ci";

export default function Sidebar() {
  const navbarMlst = [
    {
      icon: <CiGrid41 />,
      title: "Dashboard",
      link: "/dashboard",
      subIcon: "",
    },
    {
      icon: <CiUser />,
      title: "Portfolio",
      link: `/portfolio`,
      subIcon: "",
    },
  ];
  return (
    <div className="fixed top-0 text-center left-0 w-24 bg-white bg-opacity-30 gap-8 backdrop-blur-lg bottom-0 flex flex-col px-4 py-8 rounded-r-[2rem]">
      <div className="mx-auto">
        <SidebarAvatar />
      </div>
      <hr />
      <div>
        <span>Menu: 6</span>
        <div className="flex flex-col items-center py-4 text-3xl">
          {navbarMlst.map(({ icon, link, subIcon, title }) => {
            return (
              <SidebarNavs {...{ icon, link, subIcon, title }} key={uuid()} />
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}
