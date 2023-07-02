"use client";
import { useAppDispatch } from "@/redux/hooks";
import { actions } from "@/redux/slices/masterSlice";
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
export default function SidebarNavs({ icon, link, subIcon }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const {
    data: account,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return await axios({
        url: `/api/accounts/loadData?token=${token}`,
        method: "get",
      })
        .then((res) => res.data.account)
        .catch((err) => {
          dispatch(
            actions.setMassage({
              message: err.response.data.err,
              type: "error",
            })
          );
        });
    },
    enabled: !!token,
  });
  const pathname = usePathname();
  if (isLoading || isError)
    return (
      <div
        data-active={pathname === link}
        className="hover:bg-blue-500 data-[active=true]:bg-blue-500 h-14 w-14 hover:text-white flex justify-center items-center rounded-xl"
      >
        <span className="animate-spin">
          <VscLoading />
        </span>
      </div>
    );
  if (link === "/portfolio")
    return (
      <Link
        data-active={pathname === link}
        href={`${link}/${account.username}`}
        className="hover:bg-blue-500 data-[active=true]:bg-blue-500 h-14 w-14 hover:text-white flex justify-center items-center rounded-xl"
      >
        <span>{icon}</span>
      </Link>
    );
  return (
    <Link
      data-active={pathname === link}
      href={link}
      className="hover:bg-blue-500 data-[active=true]:bg-blue-500 h-14 w-14 hover:text-white flex justify-center items-center rounded-xl"
    >
      <span>{icon}</span>
    </Link>
  );
}
