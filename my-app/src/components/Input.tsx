import { ChangeEventHandler } from "react";

type Props = {
  label?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  required?: boolean;
  name: string;
  placeholder?: string;
  readonly?: boolean
};
export default function Input({
  name,
  label,
  required,
  value,
  onChange,
  placeholder,
  readonly
}: Props) {
  return (
    <div className="relative py-3 my-4">
      <input
        className="outline-none border border-gray-400 p-3 text-lg rounded-md w-full peer"
        value={value}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        // placeholder={placeholder}
        required={required}
        name={name}
        readOnly={readonly}
      />
      {label && (
        <label
          data-value={value}
          className="absolute transition-all bg-white top-0 left-3 text-base text-black data-[value='']:top-6 data-[value='']:text-xl data-[value='']:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-black"
        >
          {label}
        </label>
      )}
    </div>
  );
}
