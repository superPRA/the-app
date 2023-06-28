"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  icon: any;
  link: string;
  subIcon: string;
  title: string;
};
export default function SidebarNavs({ icon, link, subIcon, title }: Props) {
  const pathname = usePathname();
  return (
    <Link
      data-active={pathname === link}
      href={link}
      className="hover:bg-blue-500 data-[active=true]:bg-blue-500 h-14 w-14 hover:text-white flex justify-center items-center rounded-xl"
    >
      {icon}
    </Link>
  );
}
