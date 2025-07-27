import React, { useRef, useState, useEffect } from "react";

interface Option {
  code: string;
  country: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  label,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected = options.find((opt) => opt.code === value);

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <p className="text-sm font-medium text-gray-400 mb-2">{label}</p>
      )}
      <button
        type="button"
        className={`w-full h-14 pl-12 pr-4 rounded-xl border border-gray-600 bg-gray-700 text-gray-100 flex items-center relative transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none ${disabled ? "opacity-60 cursor-not-allowed" : "hover:border-blue-400"}`}
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <img
              src={`https://flagsapi.com/${selected.country}/flat/64.png`}
              alt={selected.code}
              className="w-7 h-7"
            />
            <span className="ml-2 font-semibold">{selected.code}</span>
          </span>
        )}
        <span className="ml-12">{selected?.code}</span>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <i className="fa-solid fa-chevron-down" />
        </span>
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-600 rounded-xl shadow-lg max-h-64 overflow-y-auto p-1 animate-fadeIn"
          role="listbox"
        >
          {options.map((opt) => (
            <li
              key={opt.code}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition hover:bg-gray-700 ${opt.code === value ? "bg-blue-600 text-white" : "text-gray-100"}`}
              onClick={() => {
                onChange(opt.code);
                setOpen(false);
              }}
              role="option"
              aria-selected={opt.code === value}
            >
              <img
                src={`https://flagsapi.com/${opt.country}/flat/64.png`}
                alt={opt.code}
                className="w-6 h-6"
              />
              <span className="font-medium">{opt.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 