import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  labelClassName?: string;
}

export default function InputField({
  label,
  name,
  required = true,
  error,
  labelClassName = "",
  type = "text",
  ...props
}: InputFieldProps) {
  const isFileInput = type === "file";

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center">
      <label
        htmlFor={name}
        className={`flex min-w-[150px] text-end text-sm font-medium text-gray-800 ${labelClassName}`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex w-full flex-col">
        <input
          id={name}
          name={name}
          type={type}
          className={`input-field-event`}
          {...(!isFileInput && { value: props.value })}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
