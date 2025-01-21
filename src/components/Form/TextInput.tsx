import React, { forwardRef } from "react";
import MaskedInput from "react-text-mask";
import { TextInputProps } from "../../types";
import { maskRules } from "../../types/maskRules";
import { IoReloadOutline } from "react-icons/io5";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      value,
      onChange,
      placeholder,
      disabled = false,
      onBlur,
      error,
      maskType = "default",
      isLoading = false,
      onButtonClick,
    },
    ref
  ) => {
    const mask = maskRules[maskType];

    return (
      <div className="relative w-full">
        {isLoading ? (
          <div className="w-full p-2 h-10 bg-gray-200 rounded animate-pulse"></div>
        ) : mask.length > 0 ? (
          <MaskedInput
            mask={mask}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            render={(inputRef, props) => (
              <div className="relative">
                <input
                  {...props}
                  ref={(inputElement) => {
                    if (typeof inputRef === "function" && inputElement)
                      inputRef(inputElement);
                    if (ref && typeof ref === "function") ref(inputElement);
                  }}
                  name={name}
                  placeholder={placeholder}
                  className={`w-full p-2 border rounded pr-10 ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {onButtonClick && (
                  <button
                    type="button"
                    onClick={onButtonClick}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <IoReloadOutline size={20} />
                  </button>
                )}
              </div>
            )}
          />
        ) : (
          <div className="relative">
            <input
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              ref={ref}
              className={`w-full p-2 border rounded pr-10 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            {onButtonClick && (
              <button
                type="button"
                onClick={onButtonClick}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
              >
                <IoReloadOutline size={20} />
              </button>
            )}
          </div>
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
