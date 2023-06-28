import Image from "next/image";
import uuid from "react-uuid";
import SidebarNavs from "./SidebarNavs";
import { navbarMlst } from "@/data/new";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="fixed top-0 text-center left-0 w-24 bg-white bg-opacity-30 gap-8 backdrop-blur-lg bottom-0 flex flex-col px-4 py-8 rounded-r-[2rem]">
      <div className="mx-auto">
        <Link href='my-account'>
          <Image
            className="bg-blue-200 border-4 rounded-full"
            alt="avatar"
            src="/5556512.png"
            width={100}
            height={100}
          />
        </Link>
      </div>
      <hr />
      <div>
        <span>Menu: 6</span>
        <div className="flex flex-col items-center py-4 text-3xl">
          {navbarMlst.map(({ icon, link, subIcon, title }) => {
            return (
              <SidebarNavs {...{icon,link,subIcon,title}} key={uuid()} />
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}
