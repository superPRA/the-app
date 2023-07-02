"use client";
import { ChangeEventHandler, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  label?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean
  name: string
};

export default function PasswordInput({ name, label, value, onChange,required }: Props) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="relative py-3 my-4">
      <input
        className="outline-none border border-gray-400 p-3 text-lg rounded-md w-full peer"
        value={value}
        onChange={onChange}
        type={showPass ? "text" : "password"}
        id={label}
        required={required}
        name={name}
      />
      {label && (
        <label
          htmlFor={label}
          data-value={value}
          className="absolute transition-all bg-white top-0 left-3 text-base text-black data-[value='']:top-6 data-[value='']:text-xl data-[value='']:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-black"
        >
          {label}
        </label>
      )}
      <label className="absolute top-6 right-4 text-3xl text-gray-400 focus:text-black peer-focus:text-black" tabIndex={0} onClick={()=>setShowPass(!showPass)}>
        {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </label>

    </div>
  );
}
