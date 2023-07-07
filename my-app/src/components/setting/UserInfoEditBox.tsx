import { useFormik } from "formik";
import Input from "../Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function UserInfoEditBox({ account }: { account: any }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["account"],
    mutationFn: async () => {
      await axios({
        method: "post",
        url: "/api/accounts/edit/userData",
        data: {
          token: typeof localStorage !== "undefined" && localStorage.getItem('token'),
          ...formik.values,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["account"]);
    },
  });
  const formik = useFormik({
    initialValues: {
      username: account.username,
      password: account.password,
      firstName: account.firstName,
      lastname: account.lastName,
      email: account.email,
      avatarImag: account.avatarImag,
    },
    onSubmit: () => {
      mutate();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full bg-white rounded-xl grid grid-cols-2 px-5 gap-x-5 col-span-2"
    >
      <h1 className="col-span-full text-center text-3xl font-semibold my-4">
        main user info
      </h1>
      <Input name="username" label="username" value={formik.values.username} />
      <Input
        name="password"
        label="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <Input
        name="firstName"
        label="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />
      <Input
        name="lastname"
        label="lastname"
        value={formik.values.lastname}
        onChange={formik.handleChange}
      />
      <Input
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <Input
        name="avatarImag"
        label="Image Url"
        value={formik.values.avatarImag}
        onChange={formik.handleChange}
      />
      <button
        type="submit"
        className="col-span-full bg-[#7F5FDA] text-white h-12 text-xl flex justify-center items-center gap-4 font-semibold my-5 rounded transition-all active:scale-95"
      >
        submit edit
      </button>
    </form>
  );
}
