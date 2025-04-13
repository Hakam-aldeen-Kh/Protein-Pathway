import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = ({ control, errors }) => {
  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor="phoneNumber"
        className="text-sm font-normal text-[#111118] opacity-80 mb-1"
      >
        Phone Number
      </label>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <PhoneInput
            {...field}
            value={value || ""}
            onChange={(val) => {
              onChange(val || "");
            }}
            id="phoneNumber"
            placeholder="Enter phone number"
            className={`w-full px-3 border-[#878787] border rounded-sm min-h-[40px] focus:outline-none ${
              errors.phoneNumber ? "border-red-500" : "border-[#878787]"
            }`}
            international
          />
        )}
      />
      {errors.phoneNumber && (
        <p className="text-red-500 text-xs mt-1">
          {errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
