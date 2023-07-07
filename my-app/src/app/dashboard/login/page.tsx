"use client";

import Input from "@/components/Input";
import PasswordInput from "@/components/PasswordInput";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import Massage from "@/components/massage";
import { actions } from "@/redux/slices/masterSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const queryclient = useQueryClient();
  const [token, setToken] = useState(null);
  console.log({ token });
  const router = useRouter();
  const {
    data: tokenData,
    mutate: tokenMutate,
    isLoading: isTokenLoading,
  } = useMutation({
    mutationKey: ["token"],
    mutationFn: async () => {
      return await axios({
        url: "/api/accounts/login",
        method: "post",
        data: {
          ...formik.values,
        },
      })
        .then((res) => res.data.token)
        .catch((err) => {
          dispatch(
            actions.setMassage({
              message: err.response.data.err,
              type: "error",
            })
          );
        });
    },
    onSuccess: (data, _variables, _context) => {
      typeof localStorage !== "undefined" && localStorage.setItem("token", data);
      // queryclient.setQueryData(["token"], data);
      setToken(data);
    },
  });

  const { mutate: accountMutate, isLoading: isAccountLoading } = useMutation({
    mutationKey: ["account"],
    mutationFn: async () => {
      return await axios
        .get(`/api/accounts/loadData?token=${token}`)
        .then((res) => res.data.account);
    },
    onSuccess() {
      router.replace("/dashboard");
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (formValue) => {
      tokenMutate();
    },
  });
  useEffect(() => {
    if (token) accountMutate();
  }, [accountMutate, token]);
  console.log({ isAccountLoading, isTokenLoading });
  return (
    <div className="grid grid-cols-2">
      <div className="h-screen bg-white flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[450px] p-4 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold ">Welcome Back</h1>
            <h3 className="text-gray-500 text-lg">
              welcome back please enter details
            </h3>
          </div>
          <div>
            <Input
              value={formik.values.username}
              onChange={formik.handleChange}
              label="UserName"
              name="username"
              required
            />
            <PasswordInput
              onChange={formik.handleChange}
              value={formik.values.password}
              label="Password"
              name="password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#7F5FDA] text-white h-12 text-xl flex justify-center items-center gap-4 font-semibold mt-6 rounded transition-all active:scale-95"
          >
            login{" "}
            {(isAccountLoading || isTokenLoading) && (
              <VscLoading className="animate-spin" />
            )}
          </button>
        </form>
      </div>
      <div className="h-screen bg-[#F3F5F9] grid grid-rows-2 relative isolate">
        <div className="absolute w-60 h-60 bg-[#634EB7] rounded-full top-[calc(50%-7.5rem)] left-[calc(50%-7.5rem)]"></div>
        <div className="bg-[#F3F5F9]"></div>
        <div className="bg-[#f3f5f9] bg-opacity-30 backdrop-blur-lg z-[1]"></div>
      </div>
    </div>
  );
}
