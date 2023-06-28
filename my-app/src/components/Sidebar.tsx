import Image from "next/image";
import uuid from "react-uuid";
import { GoArchive } from "react-icons/go";
import { RxDashboard } from "react-icons/rx"
import Link from "next/link";

export default function Sidebar() {
  const navbar = [
    {
      icon: <RxDashboard />,
      title: "Dashboard",
      link: "/dashboard",
      subIcon: "",
    },
    {
      icon: <GoArchive />,
      title: "Portfolio",
      link: "/portfolio",
      subIcon: "",
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-80 bg-white bottom-0 flex flex-col px-4">
      <div className="flex gap-4 items-end py-12">
        <Image
          className="rounded-full border-2 border-gray-400 w-16"
          src="/5556512.png"
          alt="avatar"
          width={1000}
          height={1000}
        />
        <div>
          <h6 className="text-[10px] text-neutral-400 font-semibold">
            Good Day
          </h6>
          <h1 className="text-2xl font-bold text-neutral-700">
            Pooriya Mosavy
          </h1>
        </div>
      </div>
      <hr />
      <div className="">
        <h1 className="font-semibold text-gray-700 py-2">navbar: 1</h1>
        <div className="flex flex-col py-2">
          {navbar.map((item) => {
            return (
              <Link
                className="flex items-center gap-3 hover:bg-indigo-500 hover:text-white transition-all duration-200 p-3 rounded-xl"
                href={item.link}
                key={uuid()}
              >
                <i className="text-3xl">{item.icon}</i>
                <span className="text-xl">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
}
