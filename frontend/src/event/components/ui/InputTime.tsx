import { CalendarIcon, ClockIcon } from "./Icons";

interface InputTimeProps {
  form: {
    dateString: string;
    startTime: string;
    endTime: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

export default function InputTime({ form, handleChange, errors }: InputTimeProps) {
  return (
    <div className="flex w-full">
      <div className="flex flex-col space-y-5 md:flex lg:flex-row lg:gap-[72px]">
        <div className="relative flex flex-col">
          <label htmlFor="dateString" className="mb-1 text-sm font-medium text-gray-800">
            Fecha <span className="text-red-500">*</span>
          </label>
          <div className="relative items-center">
            <div className="absolute top-1/2 flex h-[58px] w-[58px] -translate-y-1/2 items-center justify-center bg-black p-3 text-white lg:rounded-l-[20px]">
              <CalendarIcon />
            </div>
            <input
              type="text"
              name="dateString"
              id="dateString"
              value={form.dateString}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 8);
                const formatted = cleaned
                  .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
                  .replace(/^(\d{2}\/\d{2})(\d{0,2})/, "$1/$2");
                handleChange({
                  target: {
                    name: "dateString",
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder="DD/MM/AA"
              inputMode="numeric"
              className="input-time-event"
            />
          </div>
          {errors?.dateString && <p className="text-sm text-red-600">{errors.dateString}</p>}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="startTime" className="mb-1 text-sm font-medium text-gray-800">
            Comienza <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-1/2 flex h-[58px] w-[58px] -translate-y-1/2 items-center justify-center bg-black p-3 text-white lg:rounded-l-[20px]">
              <ClockIcon />
            </div>
            <input
              type="text"
              name="startTime"
              id="startTime"
              value={form.startTime}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                const formatted = cleaned.replace(/^(\d{2})(\d{0,2})/, "$1:$2");
                handleChange({
                  target: {
                    name: "startTime",
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder="12:00 AM"
              className={`input-time-event`}
            />
          </div>
          {errors?.startTime && <p className="text-sm text-red-600">{errors.startTime}</p>}
        </div>

        <div className="relative flex flex-col">
          <label htmlFor="endTime" className="mb-1 text-sm font-medium text-gray-800">
            Termina <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-1/2 flex h-[58px] w-[58px] -translate-y-1/2 items-center justify-center bg-black p-3 text-white lg:rounded-l-[20px]">
              <ClockIcon />
            </div>
            <input
              type="text"
              name="endTime"
              id="endTime"
              value={form.endTime}
              onChange={(e) => {
                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 4);
                const formatted = cleaned.replace(/^(\d{2})(\d{0,2})/, "$1:$2");
                handleChange({
                  target: {
                    name: "endTime",
                    value: formatted,
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              placeholder="12:00 AM"
              className={`input-time-event`}
            />
          </div>
          {errors?.endTime && <p className="text-sm text-red-600">{errors.endTime}</p>}
        </div>
      </div>
    </div>
  );
}
