import { useState, useEffect } from "react";

export const Dropdown = ({ label, options = [], value }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  // Update selected if `value` prop changes
  useEffect(() => {
    if (value) {
      const found = options.find((opt) => opt.value === value);
      setSelected(found);
    }
  }, [value, options]);

  return (
    <div className="w-[200px] inline-block relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"
      >
        {selected ? selected.label : label}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="-mr-1 size-5 text-gray-400"
        >
          <path
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-900 shadow-lg z-50">
          <div className="py-1">
            {options.map(({ label, value, onClick }) => (
              <p
                key={value}
                onClick={() => {
                  onClick(value);

                  setSelected({ label, value, onClick });

                  setOpen(false);
                }}
                className={`cursor-pointer block px-4 py-2 text-sm ${
                  selected?.value === value
                    ? "bg-white/20 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
