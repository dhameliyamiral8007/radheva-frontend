import React, { useState, useEffect } from "react";
import ArrowLeft from "../../../assets/ArrowLeft.svg"
import ArrowRight from "../../../assets/Arrowrigth.svg"
import { useTheme } from "../../config/hooks/useTheme";
const DateTimePicker = () => {
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
    const daysInMonth = (month, year) =>
        new Date(year, month + 1, 0).getDate();

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

    // Clock angles
    const hourAngle = (selectedTime.hour % 12) * 30 + selectedTime.minute * 0.5;
    const minuteAngle = selectedTime.minute * 6;

    // Apply selection
    const handleApply = () => {
        alert(
            `✅ Appointment Set!\n\nDates: ${selectedDates
                .map((d) => d.toDateString())
                .join(", ")}\nTime: ${selectedTime.hour}:${selectedTime.minute
                    .toString()
                    .padStart(2, "0")} ${selectedTime.ampm}`
        );
    };

    return (
        <div className={` ${theme === "dark" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"}`}>
            <div className={` rounded-2xl shadow-xl p-6 w-[900px] ${theme === "dark" ? "bg-white" : "bg-[#282828]"}`}>
                <div className="flex">
                    {/* Sidebar */}
                    <div className={`flex flex-col gap-3 w-1/5 pr-4 border-r border-gray-700 `}>
                        {["Today", "Last 7 days", "Last 14 days", "This month", "Last month", "Custom"].map(
                            (item) => (
                                <button
                                    key={item}
                                    onClick={() => handleSelectBy(item)}
                                    className={`w-full px-4 py-2 rounded-lg hover:bg-gray-600 ${theme === "dark" ? "bg-[#F3F4F6]" : "bg-white text-gray-500"}`}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>

                    {/* Calendar */}
                    <div className="w-2/5 px-6 ">
                        <div className="flex justify-between font-kufam rounded-sm px-2 bg-white text-black items-center mb-4">
                            <button
                                onClick={() =>
                                    setViewMonth(new Date(year, month - 1, 1))
                                }
                                className="text-gray-400"
                            >
                                <img src={ArrowLeft} alt="Arrow Left" />
                            </button>
                            <h2 className="text-lg font-semibold">
                                {viewMonth.toLocaleString("default", { month: "long" })} {year}
                            </h2>
                            <button
                                onClick={() =>
                                    setViewMonth(new Date(year, month + 1, 1))
                                }
                                className="text-gray-400"
                            >
                                <img src={ArrowRight} alt="Arrow Left" />
                            </button>
                        </div>

                        {/* Weekdays */}
                        <div className="grid grid-cols-7 text-sm text-gray-400 mb-2">
                            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                                <div key={d} className="text-center">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Dates  */}
                        <div className="grid grid-cols-7 gap-2 text-center">
                            {Array.from({ length: totalDays }, (_, i) => i + 1).map((date) => {
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
                                        className={`p-2 rounded-lg cursor-pointer ${isSelected
                                            ? "bg-yellow-600 text-white"
                                            : "hover:bg-gray-700"
                                            }`}
                                    >
                                        {date}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Time Picker */}
                    <div className="w-3/6 pl-8">
                        {/* Header with "Select Time" and selected time */}
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg text-gray-400">Select Time</h3>
                            <div className="flex items-end gap-2">
                                {/* Hour */}
                                <select
                                    value={selectedTime.hour}
                                    onChange={(e) =>
                                        setSelectedTime({ ...selectedTime, hour: parseInt(e.target.value) })
                                    }
                                    className="bg-gray-700 text-white rounded-lg px-2 py-1"
                                >
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                        <option key={h} value={h}>
                                            {h}
                                        </option>
                                    ))}
                                </select>

                                {/* Minute */}
                                <select
                                    value={selectedTime.minute}
                                    onChange={(e) =>
                                        setSelectedTime({ ...selectedTime, minute: parseInt(e.target.value) })
                                    }
                                    className="bg-gray-700 text-white rounded-lg px-2 py-1"
                                >
                                    {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                                        <option key={m} value={m}>
                                            {m.toString().padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                                {/* AM/PM */}
                                <div className="flex flex-col ml-2">
                                    <button
                                        onClick={() => setSelectedTime({ ...selectedTime, ampm: "AM" })}
                                        className={`px-2 text-sm rounded-t ${selectedTime.ampm === "AM" ? "bg-yellow-600 text-white" : "bg-gray-600"
                                            }`}
                                    >
                                        AM
                                    </button>
                                    <button
                                        onClick={() => setSelectedTime({ ...selectedTime, ampm: "PM" })}
                                        className={`px-2 text-sm rounded-b ${selectedTime.ampm === "PM" ? "bg-yellow-600 text-white" : "bg-gray-600"
                                            }`}
                                    >
                                        PM
                                    </button>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                        {/* Clock  #EEF1F3*/}
                        <div className="relative w-64 h-64 rounded-full bg-white flex items-center justify-center">
                            {/* Hour hand */}
                            <div
                                className="absolute top-0 left-1/2 w-1 h-28 bg-yellow-600 origin-bottom -translate-x-1/2"
                                style={{ transform: `rotate(${hourAngle}deg)` }}
                            ></div>
                            {Array.from({ length: 12 }).map((_, i) => {
                                const angle = (i + 1) * 30; // each number 30°
                                const radius = 120; // distance from center
                                const x = radius * Math.sin((angle * Math.PI) / 180);
                                const y = -radius * Math.cos((angle * Math.PI) / 180);

                                return (
                                    <div
                                        key={i}
                                        className="absolute font-bold text-black"
                                        style={{
                                            transform: `translate(${x}px, ${y}px)`,
                                        }}
                                    >
                                        {i + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-6 gap-3">
                    <button className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700">
                        Cancel
                    </button>
                    <button
                        onClick={handleApply}
                        className="px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DateTimePicker;
