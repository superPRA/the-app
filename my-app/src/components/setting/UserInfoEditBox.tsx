import { useFormik } from "formik";
import Input from "../Input";
import uuid from "react-uuid";
import { BiSearchAlt, BiSolidLockAlt } from "react-icons/bi";
import { useGetAccount } from "@/hooks/useGetAccount";
import { useEffect } from "react";
import { TiWarning } from "react-icons/ti";
import * as Yup from "yup";

type inputs = "username" | "email" | "firstName" | "lastName";

export default function UserInfoEditBox() {
  const { data: account, isLoading } = useGetAccount();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      age: "",
      avatarImage: "",
      desc: "",
      role: "",
    },
    validationSchema: new Yup.ObjectSchema({
      username: Yup.string().required("required"),
      email: Yup.string()
        .required("required")
        .email("email format is not correct"),
      firstname: Yup.string().required("required"),
      lastName: Yup.string().required("required"),
      password: Yup.string().required("required").min(8, "too short"),
      age: Yup.number().required("required").positive("age can not be negative").moreThan(2, "too young").lessThan(100, "too old"),
      avatarImage: Yup.string().required("required"),
      desc: Yup.string().required("required"),
      role: Yup.string().required("required"),
    }),
    onSubmit: () => {},
  });

  useEffect(() => {
    if (!isLoading && account) {
      formik.setValues({
        username: account.username,
        role: account.role ?? "",
        email: account.email,
        firstName: account.firstName ?? "",
        lastName: account.lastName ?? "",
        password: account.password,
        age: account.age?.toString() ?? "",
        avatarImage: account.avatarImag ?? "",
        desc: account.desc ?? "",
      });
    }
  }, [isLoading, account]);

  return (
    <form className="grid grid-cols-2 p-24 gap-20">
      {Object.keys(formik.values).map((key) => {
        return (
          <label
            key={key}
            className="w-full flex h-14 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-all relative"
            htmlFor={key}
          >
            <BiSearchAlt className="h-14 w-14 p-3" />
            <div className="relative flex-grow">
              <input
                className="w-full bg-transparent p-3 h-14 peer outline-none disabled:text-neutral-400"
                value={formik.values[key as "username" | "email"]}
                name={key}
                onChange={(e) => {
                  if (key !== "username") formik.handleChange(e);
                }}
                data-value={
                  !!formik.values[key as keyof typeof formik.values].length
                }
                id={key}
                disabled={key === "username"}
              />
              <label
                htmlFor={key}
                className={`absolute left-3 top-3 text-xl text-neutral-400 transition-all
                            peer-focus:-top-10 peer-focus:-left-10 peer-focus:text-white peer-focus:text-2xl
                            peer-data-[value=true]:-top-10 peer-data-[value=true]:-left-10 peer-data-[value=true]:text-cyan-300 peer-data-[value=true]:text-2xl
                          `}
              >
                {key}
              </label>
            </div>
            {key === "username" ? (
              <BiSolidLockAlt
                className="h-14 w-14 p-3 text-red-600"
                title="this property can not be changed"
              />
            ) : !!formik.errors[key as keyof typeof formik.values]?.length ? (
              <TiWarning
                className="h-14 w-14 p-3 text-red-600"
                title={formik.errors[key as keyof typeof formik.values]}
              />
            ) : null}
          </label>
        );
      })}
    </form>
  );
}
