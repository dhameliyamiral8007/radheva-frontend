import React, { useState, useEffect } from "react";
import ArrowLeft from "../../../assets/ArrowLeft.svg";
import ArrowRight from "../../../assets/Arrowrigth.svg";
import { useTheme } from "../../config/hooks/useTheme";
import TimePickerCard from "./TimePicker";
import { AnalogHourFace } from "./Analog";

const DateTimePicker = ({ onApply }) => {
  const { theme } = useTheme();
  const [selectedDates, setSelectedDates] = useState([]);
  const [viewMonth, setViewMonth] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({
    hour: 12,
    minute: 0,
    ampm: "AM",
  });

  // Load current time on mount
  useEffect(() => {
    const now = new Date();
    updateTime(now.getHours(), now.getMinutes());
    setSelectedDates([now]);
    setViewMonth(now);
  }, []);

  // Utility: Days in month
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // Convert hour+minute to AM/PM format
  const updateTime = (hour, minute) => {
    let ampm = "AM";
    if (hour >= 12) {
      ampm = "PM";
      if (hour > 12) hour -= 12;
    }
    if (hour === 0) hour = 12;
    setSelectedTime({ hour, minute, ampm });
  };

  // Handle left sidebar selection
  const handleSelectBy = (type) => {
    const today = new Date();
    let dates = [];

    if (type === "Today") {
      dates = [today];
    } else if (type === "Last 7 days") {
      for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        dates.push(d);
      }
    } else if (type === "Last 14 days") {
      for (let i = 0; i < 14; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        dates.push(d);
      }
    } else if (type === "This month") {
      const totalDays = daysInMonth(today.getMonth(), today.getFullYear());
      for (let i = 1; i <= totalDays; i++) {
        dates.push(new Date(today.getFullYear(), today.getMonth(), i));
      }
    } else if (type === "Last month") {
      const lastMonth = today.getMonth() - 1;
      const year = today.getFullYear();
      const totalDays = daysInMonth(lastMonth, year);
      for (let i = 1; i <= totalDays; i++) {
        dates.push(new Date(year, lastMonth, i));
      }
      setViewMonth(new Date(year, lastMonth, 1));
    } else if (type === "Custom") {
      dates = [];
    }

    setSelectedDates(dates);
  };

  // Calendar values
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const totalDays = daysInMonth(month, year);

  // Apply selection
  const handleApply = () => {
    if (!onApply) return;
    const firstDate = selectedDates[0] || new Date();
    let hour24 = selectedTime.hour % 12;
    if (selectedTime.ampm === "PM") hour24 += 12;
    const finalDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate(),
      hour24,
      selectedTime.minute,
      0,
      0
    );
    onApply({ date: finalDate, meta: { selectedDates, selectedTime } });
  };

  return (
    <div className={` ${theme === "dark" ? "text-white" : " text-black"}`}>
      <div
        className={` rounded-2xl shadow-[32px] border-[1px] border-amber-50  p-6 w-[900px] ${
          theme === "dark" ? "bg-[#FFFFFF]" : "bg-[#323232] "
        }`}
      >
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`flex flex-col gap-3 w-1/5 pr-4 ${
              theme === "dark"
                ? "border-r border-gray-700"
                : "border-r border-gray-200"
            } `}
          >
            {[
              "Today",
              "Last 7 days",
              "Last 14 days",
              "This month",
              "Last month",
              "Custom",
            ].map((item) => (
              <button
                key={item}
                onClick={() => handleSelectBy(item)}
                className={`w-full px-4 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-white text-[#1E293B] hover:bg-gray-100"
                    : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className="w-2/5 p-6  ">
            <div
              className={`flex justify-between font-kufam rounded-sm px-2 items-center mb-4 ${
                theme === "dark" 
                  ? "bg-white text-black" 
                  : "bg-white text-black"
              }`}
            >
              <button
                onClick={() => setViewMonth(new Date(year, month - 1, 1))}
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                <img src={ArrowLeft} alt="Arrow Left" />
              </button>
              <h2 className={`text-lg font-semibold ${
                theme === "dark" ? "text-black" : "text-black"
              }`}>
                {viewMonth.toLocaleString("default", { month: "long" })} {year}
              </h2>
              <button
                onClick={() => setViewMonth(new Date(year, month + 1, 1))}
                className={theme === "dark" ? "text-gray-400" : "text-gray-600"}
              >
                <img src={ArrowRight} alt="Arrow Right" />
              </button>
            </div>

            {/* Weekdays */}
            <div
              className={`grid grid-cols-7 text-sm mb-2 ${
                theme === "dark" ? "text-black" : "text-white"
              }`}
            >
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div key={d} className="text-center">
                  {d}
                </div>
              ))}
            </div>

            {/* Dates  */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: totalDays }, (_, i) => i + 1).map(
                (date) => {
                  const thisDate = new Date(year, month, date);
                  const isSelected = selectedDates.some(
                    (d) =>
                      d.getDate() === thisDate.getDate() &&
                      d.getMonth() === thisDate.getMonth() &&
                      d.getFullYear() === thisDate.getFullYear()
                  );

                  return (
                    <div
                      key={date}
                      onClick={() => setSelectedDates([thisDate])}
                      className={`p-2 rounded-lg cursor-pointer ${
                        isSelected
                          ? "bg-yellow-600 text-white"
                          : theme === "dark"
                          ? `text-black hover:bg-gray-200`
                          : `text-white hover:bg-gray-600`
                      }`}
                    >
                      {date}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Time Picker */}
          <div className="w-2/5 p-6 flex justify-center items-center flex-col">
            {/* Header with "Select Time" and selected time */}
            <TimePickerCard
              // map your state -> component's expected shape
              value={{
                hour: selectedTime.hour,
                minute: selectedTime.minute,
                period: selectedTime.ampm, // AM | PM
              }}
              onChange={(t) =>
                setSelectedTime({
                  hour: t.hour,
                  minute: t.minute,
                  ampm: t.period, // map back
                })
              }
              label="Select Time"
              className={theme === "dark" ? " " : ""}
            />
            {/* Clock  #EEF1F3*/}
            <AnalogHourFace selectedTime={selectedTime} theme={theme} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            className={`px-4 py-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-200 hover:bg-gray-300 text-black"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;