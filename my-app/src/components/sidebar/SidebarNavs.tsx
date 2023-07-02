"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";

type Props = {
  icon: any;
  link: string;
  subIcon: string;
  title: string;
};
export default function SidebarNavs({
  icon,
  link,
  subIcon,
}: Props) {
  const router = useRouter();
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const { data: account, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await axios({
        url: `http://localhost:3000/api/accounts/loadData?token=${token}`,
        method: "get",
      }).then((res) => res.data.account);
    },
    enabled: !!token,
  });
  const pathname = usePathname();
  return (
    <Link
      data-active={pathname === link}
      href={link}
      className="hover:bg-blue-500 data-[active=true]:bg-blue-500 h-14 w-14 hover:text-white flex justify-center items-center rounded-xl"
    >
      {!isLoading ? (
        <span>{icon}</span>
      ) : (
        <span className="animate-spin">
          <VscLoading />
        </span>
      )}
    </Link>
  );
}
