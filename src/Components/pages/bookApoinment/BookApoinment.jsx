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
import { apiInstance } from '../../../api/AxiosApi';

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
    const { colors, theme } = useTheme();
    const [range, setRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [selectedQuick, setSelectedQuick] = useState('Today');
    const [time, setTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(8); // default selected date
    const [selectedTime, setSelectedTime] = useState("12:04 AM");
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', subject: '' });
    const [files, setFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(null);
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

                <DateTimePicker onApply={({ date }) => setAppointmentDate(date)} />
            </div> 
            

            <div className="w-full flex justify-center items-center pb-10">
                <div className="w-full max-w-4xl md:p-8 p-4">
                    <h3 className="text-xl font-bold mb-6 text-center font-kufam">Fill the Details</h3>
                    <form className="space-y-4" onSubmit={async (e) => {
                        e.preventDefault();
                        if (!appointmentDate) {
                            alert('Please select date and time and click Apply.');
                            return;
                        }
                        const fd = new FormData();
                        fd.append('name', form.name);
                        fd.append('email', form.email);
                        fd.append('phoneNumber', form.phoneNumber);
                        fd.append('appointmentDate', appointmentDate.toISOString());
                        fd.append('subject', form.subject);
                        files.forEach((f) => fd.append('referenceImages', f));
                        try {
                            setSubmitting(true);
                            const res = await apiInstance.post('/client/appointment', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
                            const msg = res?.data?.message || res?.data?.Message || 'Appointment booked successfully';
                            setSuccess({
                                message: msg,
                                appointmentDate,
                                form: { ...form }
                            });
                            setForm({ name: '', email: '', phoneNumber: '', subject: '' });
                            setFiles([]);
                        } catch (err) {
                            alert(err?.response?.data?.message || 'Failed to book appointment');
                        } finally {
                            setSubmitting(false);
                        }
                    }}>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Name<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className={`w-full p-[14px] rounded-[10px] text-[16px] ${theme === 'dark' ? 'bg-white text-[#64748B]' : 'bg-[#2B2B2B] text-white placeholder:text-[#A9B2B9] border border-[#3a3a3a]'}`}
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Email<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className={`w-full p-[14px] rounded-[10px] text-[16px] ${theme === 'dark' ? 'bg-white text-[#64748B]' : 'bg-[#2B2B2B] text-white placeholder:text-[#A9B2B9] border border-[#3a3a3a]'}`}
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Phone Number<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="tel"
                                placeholder="Enter Your Phone Number"
                                className={`w-full p-[14px] rounded-[10px] text-[16px] ${theme === 'dark' ? 'bg-white text-[#64748B]' : 'bg-[#2B2B2B] text-white placeholder:text-[#A9B2B9] border border-[#3a3a3a]'}`}
                                value={form.phoneNumber}
                                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className="block text-[20px] font-normal font-kufam">Subject<span className='text-[#FF383C] text-[20px]'>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Your Subject"
                                className={`w-full p-[14px] rounded-[10px] text-[16px] ${theme === 'dark' ? 'bg-white text-[#64748B]' : 'bg-[#2B2B2B] text-white placeholder:text-[#A9B2B9] border border-[#3a3a3a]'}`}
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div className='grid gap-[10px]'>
                            <input
                                type="file"
                                className={`w-full p-[14px] rounded-[10px] text-[16px] ${theme === 'dark' ? 'bg-white text-[#64748B]' : 'bg-[#2B2B2B] text-white placeholder:text-[#A9B2B9] border border-[#3a3a3a]'}`}
                                multiple
                                onChange={(e) => setFiles(Array.from(e.target.files || []))}
                            />
                            {appointmentDate && (
                                <span className="text-sm text-gray-500">Selected: {appointmentDate.toLocaleString()}</span>
                            )}
                        </div>
                        <div className='flex justify-center items-center'>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="py-[13px] px-[21px] bg-[#C79954] font-kufam text-white font-semibold rounded-[8px] transition disabled:opacity-60"
                            >
                                {submitting ? 'Submitting...' : 'Book Appointment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className={`${theme === 'dark' ? 'bg-white text-[#1E293B]' : 'bg-[#1f1f1f] text-white'} rounded-2xl shadow-2xl w-full max-w-2xl mx-4`}>
                        <div className={`flex items-center justify-between px-6 py-4 ${theme === 'dark' ? 'border-b border-gray-200' : 'border-b border-gray-700'}`}>
                            <div className="flex items-center gap-3">
                                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${theme === 'dark' ? 'bg-green-100 text-green-700' : 'bg-green-900 text-green-200'}`}>✓</span>
                                <h3 className="text-xl font-semibold">You are scheduled</h3>
                            </div>
                            <button onClick={() => setSuccess(null)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300 hover:text-gray-100'}`}>✕</button>
                        </div>
                        <div className={`px-6 py-4 ${theme === 'dark' ? 'text-[#64748B]' : 'text-gray-300'}`}>A calendar invitation has been sent to your email address.</div>
                        <div className="px-6 pb-6">
                            <div className={`rounded-xl p-5 ${theme === 'dark' ? 'border border-gray-200' : 'border border-gray-700'}`}>
                                <div className={`${theme === 'dark' ? 'text-[#334155]' : 'text-white'} text-lg font-semibold mb-2`}>Virtual Appointment</div>
                                <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-[#64748B]' : 'text-gray-300'} mb-2`}>
                                    <span>👤</span>
                                    <span>{success.form.name || 'Guest'}</span>
                                </div>
                                <div className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-[#64748B]' : 'text-gray-300'}`}>
                                    <span>📅</span>
                                    <span>
                                        {new Date(success.appointmentDate).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                        {" – "}
                                        {new Date(new Date(success.appointmentDate).getTime() + 30 * 60000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                        {", "}
                                        {new Date(success.appointmentDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookApoinment;
