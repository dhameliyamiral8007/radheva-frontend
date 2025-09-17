import React, { useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme'
import RingDesign from "../../../assets/radheva.png"
import { DateRange } from 'react-date-range';
import TimePicker from 'react-time-picker';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import format from 'date-fns/format';
import Clock from 'react-clock';
import DateTimePicker from './DateTimePicker';

const quickRanges = [
    {
        label: 'Today', range: () => {
            const today = new Date();
            return { startDate: today, endDate: today };
        }
    },
    {
        label: 'Last 7 days', range: () => {
            const today = new Date();
            const last7 = new Date();
            last7.setDate(today.getDate() - 6);
            return { startDate: last7, endDate: today };
        }
    },
    {
        label: 'Last 14 days', range: () => {
            const today = new Date();
            const last14 = new Date();
            last14.setDate(today.getDate() - 13);
            return { startDate: last14, endDate: today };
        }
    },
    {
        label: 'This month', range: () => {
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth(), 1);
            return { startDate: start, endDate: today };
        }
    },
    {
        label: 'Last month', range: () => {
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const end = new Date(today.getFullYear(), today.getMonth(), 0);
            return { startDate: start, endDate: end };
        }
    },
    { label: 'Custom', range: null }
];

const BookApoinment = () => {
    const { colors } = useTheme();
    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [selectedQuick, setSelectedQuick] = useState('Today');
    const [time, setTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(8); // default selected date
    const [selectedTime, setSelectedTime] = useState("12:04 AM");
    // extract current hour (1–12)
    const currentHour = time.getHours() % 12 || 12;

    const handleQuickSelect = (label) => {
        setSelectedQuick(label);
        const quick = quickRanges.find(q => q.label === label);
        if (quick && quick.range) {
            const { startDate, endDate } = quick.range();
            setRange({ startDate, endDate, key: 'selection' });
        }
    };

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen`}>
            {/* Hero */}
            <div className="relative h-[300px] md:h-[400px]">
                <img src={RingDesign} alt="RingDesign" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                    <h2 className="text-[40px] text-white font-sm md:text-[40px] font-kufam mb-4">Book Appointment</h2>
                    <p className="max-w-5xl text-white font-kufam leading-relaxed">
                        Be the first to explore our latest designs. And Get exclusive access to our showroom with a personalized appointment tailored to your needs.
                    </p>
                </div>
            </div>

            {/* Main Card */}
             <div className="flex justify-center items-center min-h-[600px] py-10">
                {/* <div className="bg-[#232323] border border-[#bfa46a] rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                   
                    <div className="flex flex-col items-center md:items-start bg-[#232323] lg:px-6 lg:py-8 p-6 border-r border-[#bfa46a] lg:w-[180px] md:w-[150px] w-full">
                        <span className="uppercase text-xs font-bold text-gray-300 mb-6 tracking-widest">Select By</span>
                        {quickRanges.map(q => (
                            <button
                                key={q.label}
                                onClick={() => handleQuickSelect(q.label)}
                                className={`w-full text-left px-6 py-2 mb-3 rounded-xl font-semibold border transition text-base
                  ${selectedQuick === q.label
                                        ? 'bg-white text-[#bfa46a] border-[#bfa46a] shadow font-bold'
                                        : 'bg-[#232323] text-white border border-[#bfa46a] hover:bg-[#bfa46a] hover:text-white'}
                  ${q.label === 'Custom' && 'font-bold'}`}
                            >
                                {q.label}
                            </button>
                        ))}
                    </div>
                    
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setRange(item.selection)}
                        moveRangeOnFirstSelection={false}
                        ranges={[range]}
                        className="shadow"
                        rangeColors={["#bfa46a"]}
                        showMonthAndYearPickers={false}
                    />

                    
                    <div className="flex flex-col items-center justify-center lg:w-[320px] md:w-full w-full lg:p-8 md:p-4 p-8">
                        <div className="w-full items-center">
                            <div className="w-full mb-4">
                                <div className="flex items-center justify-between bg-white text-black font-kufam rounded-lg px-4 py-2">
                                    
                                    <span className="text-sm font-medium">Select Time</span>

                                    
                                    <TimePicker
                                        onChange={(val) => {
                                            if (val) {
                                                const [hours, minutes] = val.split(":").map(Number);
                                                const newDate = new Date();
                                                newDate.setHours(hours);
                                                newDate.setMinutes(minutes);
                                                setTime(newDate);
                                            }
                                        }}
                                        value={time}
                                        clockIcon={null}
                                        clearIcon={null}
                                        className="timepicker-no-border"
                                        disableClock={true}
                                        format="hh:mm a"
                                    />

                                </div>
                            </div>
                            
                            <Clock
                                value={time}
                                renderNumbers={({ number }) => (
                                    <div
                                        style={{
                                            color: number === currentHour ? "white" : "black",
                                            fontWeight: "bold",
                                            fontSize: "18px",
                                        }}
                                    >
                                        {number}
                                    </div>
                                )}
                                hourHandWidth={2}
                                hourHandLength={90}
                                minuteHandWidth={false}
                                secondHandWidth={false}
                                className="mb-6 bg-white text-black rounded-full font-bold relative custom-clock"
                                size={250}
                                renderMinuteMarks={false}
                                renderHourMarks={false}
                            />
                            <div className="flex gap-4 mt-4 w-full justify-end">
                                <button className="px-8 py-2 rounded-lg bg-white text-[#bfa46a] font-semibold border border-[#bfa46a] hover:bg-[#bfa46a] hover:text-white transition">Cancel</button>
                                <button className="px-8 py-2 rounded-lg bg-[#bfa46a] text-white font-semibold border border-[#bfa46a] hover:bg-yellow-700 transition">Apply</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <DateTimePicker />
            </div> 
            

            <div className="w-full flex justify-center items-center pb-10">
                <div className="w-full max-w-4xl md:p-8 p-4">
                    <h3 className="text-xl font-bold mb-6 text-center font-kufam">Fill the Details</h3>
                    <form className="space-y-4">
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Name<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="w-full p-[14px] rounded-[10px] bg-white text-[#A9B2B9] text-[16px]"
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Email<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="w-full p-[14px] rounded-[10px] bg-white text-[#A9B2B9] text-[16px]"
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Subject<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Your Subject"
                                className="w-full p-[14px] rounded-[10px] bg-white text-[#A9B2B9] text-[16px]"
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <input
                                type="file"
                                className="w-full p-[14px] rounded-[10px] bg-white text-[#A9B2B9] text-[16px]"
                            />
                        </div>
                        <div className='flex justify-center items-center'>
                            <button
                                type="submit"
                                className="py-[13px] px-[21px] bg-[#C79954] font-kufam text-white font-semibold rounded-[8px] transition"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookApoinment;
