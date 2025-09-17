import React, { useMemo, useState } from 'react'
import RingDesign from "../../../assets/radheva.png"
import { useTheme } from '../../config/hooks/useTheme'
import CloudIcon from "../../../assets/Claud.svg";
import RingSizes from "../../../assets/ringSize.jpg"
import Gemologist from "../../../assets/gemolozist.png"
import InformationSection from '../home/InformationSection';
import drawnecklace from "../../../assets/drownecklace.svg"
import GeneralQuestions from '../solitaires/GeneralQuestions';
import Expert from "../../../assets/Expertjweles.png"
import underline from "../../../assets/about/underline.svg"
const Customize = () => {
    const { theme, colors } = useTheme();
    const [form, setForm] = useState({
        firstName: '',
        email: '',
        phone: '',
        stoneType: '',
        jewelryTypes: [],
        metalType: '',
        budget: '',
        comments: ''
    });
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const errors = useMemo(() => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = 'Required';
        if (!form.email.trim()) e.email = 'Required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
        if (!form.phone.trim()) e.phone = 'Required';
        if (!form.stoneType) e.stoneType = 'Select an option';
        if (form.jewelryTypes.length === 0) e.jewelryTypes = 'Choose at least one';
        if (!form.metalType) e.metalType = 'Select metal';
        if (!form.budget) e.budget = 'Select budget';
        return e;
    }, [form]);

    const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.id || e.target.name]: true }));
    const handleChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        const key = id || name;
        if (type === 'checkbox') {
            setForm(prev => {
                const set = new Set(prev.jewelryTypes);
                if (checked) set.add(value); else set.delete(value);
                return { ...prev, jewelryTypes: Array.from(set) };
            });
        } else {
            setForm(prev => ({ ...prev, [key]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ firstName: true, email: true, phone: true, stoneType: true, jewelryTypes: true, metalType: true, budget: true });
        if (Object.keys(errors).length > 0) return;
        setSubmitting(true);
        try {
            await new Promise(res => setTimeout(res, 700));
            // TODO: send to API
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} relative`}>
            {/* Hero with overlay text */}
            <div className="relative h-[500px]">
                <img src={RingDesign} alt="RingDesign" className="absolute inset-0 w-full h-full object-cover" />
                {/* <div className="absolute inset-0 bg-black/30" /> */}
                <div className="absolute inset-0 flex flex-col justify-center md:top-[200px] top-[100px] items-center text-center xl:mx-24 lg:mx-5 md:mx-10 mx-4">
                    <h2 className="text-[35px] text-white font-sm md:text-[40px] font-semibold leading-[100%] tracking-[0px] font-kufam mb-4">Design Your Own Jewelry</h2>
                    <p className=" text-white font-kufam leading-relaxed ">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged.
                    </p>
                </div>
            </div>
            {/* form */}
            <div className={`flex justify-center md:pt-[100px] md:pb-[50px] py-[50px] ${colors.firstPart.background} ${colors.firstPart.text}`}>
                <form onSubmit={handleSubmit} className="w-full max-w-[1020px] xl:mx-24 lg:mx-5 md:mx-10 mx-4 grid gap-[30px]">
                    {/* Row 1: Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='grid gap-[10px]'>
                            <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px]`}>Name</label>
                            <input id="firstName" value={form.firstName} onChange={handleChange} onBlur={handleBlur}
                                className={`appearance-none border ${theme === 'dark' ? ' bg-white text-[#5c6064]' : ' bg-[#282828] text-[#A9B2B9]'} border-white/20 rounded-[10px] w-full py-[10px] px-[16px] focus:outline-none leading-[100%] tracking-[0px]  text-[18px] font-normal font-kufam ${touched.firstName && errors.firstName ? 'border-red-500' : ''}`}
                                placeholder="First name" />
                            {touched.firstName && errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] `}>Email</label>
                            <input id="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                                className={`appearance-none border ${theme === 'dark' ? ' bg-white text-[#5c6064]' : ' bg-[#282828] text-[#A9B2B9]'} border-white/20 rounded-[10px] w-full py-[10px] px-[16px] focus:outline-none leading-[100%] tracking-[0px]  text-[18px] font-normal font-kufam ${touched.email && errors.email ? 'border-red-500' : ''}`}
                                placeholder="First name" />
                            {touched.email && errors.email && <p className="text-xs text-red-500 ">{errors.email}</p>}
                        </div>
                    </div>

                    {/* Row 2: Phone + Stone Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className='grid gap-[10px]'>
                            <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] `}>Phone Number</label>
                            <input id="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur}
                                className={`appearance-none border ${theme === 'dark' ? ' bg-white text-[#5c6064]' : ' bg-[#282828] text-[#A9B2B9]'} border-white/20 rounded-[10px] w-full py-[10px] px-[16px] focus:outline-none leading-[100%] tracking-[0px]  text-[18px] font-normal font-kufam ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                                placeholder="Enter your phone number" />
                            {touched.phone && errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                        </div>
                        <div className='grid gap-[10px]'>
                            <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] `}>Stone Type</label>
                            <select id="stoneType" value={form.stoneType} onChange={handleChange} onBlur={handleBlur}
                                className={`appearance-none border ${theme === 'dark' ? ' bg-white text-[#5c6064]' : ' bg-[#282828] text-[#A9B2B9]'} border-white/20 rounded-[10px] w-full py-[10px] px-[16px] focus:outline-none leading-[100%] tracking-[0px]  text-[18px] font-normal font-kufam ${touched.stoneType && errors.stoneType ? 'border-red-500' : ''}`}>
                                <option value="">Select Option</option>
                                <option>Diamond</option>
                                <option>Ruby</option>
                                <option>Emerald</option>
                                <option>Sapphire</option>
                            </select>
                            {touched.stoneType && errors.stoneType && <p className="text-xs text-red-500">{errors.stoneType}</p>}
                        </div>
                    </div>

                    {/* Row 3: Jewelry Type checkboxes */}
                    <div className="grid gap-[12px]">
                        <label
                            className={`block text-[20px] font-kufam leading-[100%] tracking-[0px] ${theme === "dark" ? "text-[#1E293B]" : "text-white"
                                }`}
                        >
                            Jewelry type (Multiple options)*
                        </label>

                        <div className="flex flex-wrap gap-6 items-center ">
                            {["Ring/Band", "Earrings", "Pendant", "Bracelets", "Necklace"].map((v) => (
                                <label key={v} className="inline-flex items-center gap-[18px] cursor-pointer">
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="jewelryTypes"
                                            value={v}
                                            onChange={handleChange}
                                            checked={form.jewelryTypes.includes(v)}
                                            className={`peer w-[26px] h-[26px] appearance-none border-[1px] rounded-[4px] transition-colors duration-150
                                                    ${theme === "dark"
                                                    ? "border-[#5E6A74] checked:bg-[#FFFFFF]"
                                                    : "border-[#5E6A74] bg-[#282828]"}
                                             checked:border-[#5E6A74] focus:outline-none focus:ring-none focus:ring-none`}
                                        />
                                        {/* Tick SVG */}
                                        <svg
                                            className="absolute w-[25px] h-[20px] text-[#64748B] pointer-events-none opacity-0 peer-checked:opacity-100"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                            style={{ left: "1px", top: "2.5px" }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>


                                    <span className="select-none  text-[20px] font-normal font-kufam leading-[100%] tracking-[0px]">{v}</span>
                                </label>
                            ))}
                        </div>

                        {touched.jewelryTypes && errors.jewelryTypes && (
                            <p className="text-xs text-red-500">{errors.jewelryTypes}</p>
                        )}
                    </div>


                    {/* Row 4: Metal type */}
                    <div className="grid gap-[10px]">
                        <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] `}>Metal type*</label>
                        <select id="metalType" value={form.metalType} onChange={handleChange} onBlur={handleBlur}
                            className={`appearance-none border ${theme === 'dark' ? ' bg-white' : ' bg-[#282828] text-white'} border-white/20 rounded-[10px] w-full p-[14px] focus:outline-none leading-[100%] tracking-[0px] text-[#94A3B8] text-[20px] font-normal font-kufam cursor-pointer ${touched.metalType && errors.metalType ? 'border-red-500' : ''}`}>
                            <option value="">Select metal type</option>
                            <option>Gold 14k</option>
                            <option>Gold 18k</option>
                            <option>Platinum</option>
                            <option>Silver</option>
                        </select>
                        {touched.metalType && errors.metalType && <p className="text-xs text-red-500">{errors.metalType}</p>}
                    </div>

                    {/* Row 5: Budget */}
                    <div className="grid gap-[10px]">
                        <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] `}>Budget?*</label>
                        <select id="budget" value={form.budget} onChange={handleChange} onBlur={handleBlur}
                            className={`appearance-none border ${theme === 'dark' ? ' bg-white' : ' bg-[#282828] text-white'} border-white/20 rounded-[10px] w-full p-[14px] focus:outline-none leading-[100%] tracking-[0px] text-[#94A3B8] text-[20px] font-normal font-kufam cursor-pointer ${touched.budget && errors.budget ? 'border-red-500' : ''}`}>
                            <option value="">Select</option>
                            <option>Under ₹50,000</option>
                            <option>₹50,000 - ₹1,00,000</option>
                            <option>₹1,00,000 - ₹2,00,000</option>
                            <option>₹2,00,000+</option>
                        </select>
                        {touched.budget && errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
                    </div>

                    {/* Row 6: Comments */}
                    <div className="grid gap-[10px]">
                        <label className={`block text-[20px] font-normal font-kufam leading-[100%] tracking-[0px] ${theme === 'dark' ? ' text-black' : ' text-white'}`}>Comments</label>
                        <textarea id="comments" value={form.comments} onChange={handleChange} onBlur={handleBlur}
                            className={`appearance-none border ${theme === 'dark' ? ' bg-white text-[#94A3B8]' : ' bg-[#282828] text-[#A9B2B9]'} border-white/20 rounded-lg w-full p-[14px] focus:outline-none min-h-[130px] placeholder:text-[#A9B2B9]`}
                            placeholder="" />
                    </div>

                    {/* Row 7: Upload box (UI only) */}
                    <div className="grid gap-[10px]">
                        <div className={`border border-dashed border-white/30 rounded-xl w-full h-[140px] flex flex-col items-center justify-center gap-[10px] ${theme === 'dark' ? ' bg-white text-[#94A3B8]' : ' bg-[#282828] text-[#A9B2B9]'}`}>
                            <div className="w-9 h-9 flex items-center justify-center">
                                <img
                                    src={CloudIcon}
                                    alt="upload"
                                    className={`w-[30px] h-[30px] ${theme === "dark" ? "" : ""}`}
                                />
                            </div>


                            <div className="text-[15px] leading-[26px] font-normal tracking-[1.05px] font-nunito text-[#94A3B8] opacity-80">Upload Reference Images</div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center">
                        <button type="submit" disabled={submitting}
                            className={`${colors.button.background} ${colors.button.text} font-normal font-belleza text-[22px] tracking-[0px] leading-[100%] py-[10px] px-[16px] w-[160px] h-[45px] rounded-[8px] cursor-pointer border-none`}>
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            {/* Confused About Ring Sizes */}
            <div className="relative w-full max-w-[1440px] mx-auto py-[50px]">
                {/* Background Image */}
                <img
                    src={RingSizes}
                    alt="RingSizes"
                    className="w-full h-[358.08px]"
                />
                <div className="absolute inset-0" /> {/* optional overlay */}

                {/* Content Wrapper - Centered */}
                <div className="absolute inset-0 md:top-[77px] top-[50px] flex flex-col md:gap-[60px] gap-[25px] md:left-[50px] max-sm:px-[20px]">
                    {/* Text */}
                    <div className="text-white max-w-lg">
                        <h2 className="text-[23px] md:text-[44px] leading-[52.08px] tracking-[0px] font-normal font-belleza md:mb-4">
                            Confused About Ring Sizes?
                        </h2>
                        <p className="font-kufam leading-relaxed text-white font-normal text-[16px] tracking-[0px]">
                            We’ve made it simple! Learn how to find your size with just a string,
                            paper strip, or one of your existing rings.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex md:gap-[20px] gap-[10px] flex-wrap justify-start">
                        <button className="px-[61px] py-[14px] bg-[#C79954] font-medium font-kufam text-white leading-[100%] tracking-[0px] rounded-[8px] text-[20px] cursor-pointer">
                            Print
                        </button>
                        <button className="px-[20px] py-[14px] bg-[#DFDFDF] text-[#475569] font-medium font-kufam leading-[100%] tracking-[0px] rounded-[8px] text-[20px] cursor-pointer">
                            Discover Your Size
                        </button>
                    </div>
                </div>
            </div>


            {/* Talk with Gemologist */}
            <div className="relative w-full max-w-[1440px] mx-auto md:py-[50px]">
                <img src={Gemologist} alt="Gemologist" className="w-full h-[308.52px]" />
                <div className="absolute inset-0" />

                {/* Content Wrapper */}
                <div className="absolute inset-0 flex flex-col items-end md:top-[77px] top-[50px] md:right-[50px] max-sm:px-[20px]">
                    {/* Text + Buttons Wrapper */}
                    <div className="w-full md:max-w-[450px] text-start ">
                        {/* Text */}
                        <div className="text-white">
                            <h2 className="text-[23px] md:text-[44px] leading-[52.08px] tracking-[0px] font-normal font-belleza md:mb-4">
                                Talk with Gemologist
                            </h2>
                            <p className="font-kufam leading-relaxed text-white font-normal text-[16px] tracking-[0px]">
                                Do you have inquiries about diamonds and moissanite? Arrange a virtual
                                meeting with a skilled gemologist to get your questions answered.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 md:gap-4 mt-4 items-start">
                            <button className="px-[21px] py-[13px] bg-[#C79954] font-medium font-kufam text-white leading-[100%] cursor-pointer tracking-[0px] rounded-[8px] text-[20px]">
                                Book an Appointment
                            </button>
                            <button className=" text-[#475569] font-nunito text-[14px] leading-[21px] font-semibold cursor-pointer tracking-[0px] flex items-center gap-[8px] underline uppercase">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 
                                        19.79 19.79 0 0 1-8.63-3.07 
                                        19.5 19.5 0 0 1-6-6 
                                        19.79 19.79 0 0 1-3.07-8.67
                                        A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 
                                        1.72 12.84 12.84 0 0 0 .7 2.81 
                                        2 2 0 0 1-.45 2.11L8.09 9.91
                                        a16 16 0 0 0 6 6l1.27-1.27
                                        a2 2 0 0 1 2.11-.45 
                                        12.84 12.84 0 0 0 2.81.7
                                        A2 2 0 0 1 22 16.92z"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                CALL US
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <InformationSection />
            </div>
            <div>
                <img src={drawnecklace} alt="drawnecklace" className="w-full h-[570px] object-cover" />
            </div>
            <div
                className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
            >
                <div className="text-center py-5">
                    <h2 className="text-[35px] font-belleza inline-block relative">
                        Frequently Asked Questions
                        <img src={underline} alt="underline" className="p-2" />
                    </h2>
                </div>
                <GeneralQuestions />
            </div>

            <div className="relative w-full max-w-[1440px] mx-auto py-[50px]">
                {/* Background Image */}
                <img src={Expert} alt="Expert" className="w-full  h-[325.43px]" />
                {/* Overlay */}
                <div className="absolute inset-0" />

                {/* Content Wrapper */}
                <div className="absolute inset-0 flex justify-center items-center">
                    {/* Wrapper with fixed width */}
                    <div className="max-w-[458px] flex flex-col md:gap-[60px] gap-[40px] max-sm:px-[20px]">
                        {/* Text */}
                        <div className="grid text-white gap-[12px]">
                            <h2 className="text-[23px] md:text-[44px] leading-[52.08px] tracking-[0px] font-normal font-belleza">
                                Expert Guidance Timeless Designs
                            </h2>
                            <p className="font-kufam leading-[100%] text-white font-normal text-[16px] tracking-[0px]">
                                Let our jewelry consultants help you find your dream piece.
                            </p>
                        </div>

                        {/* Buttons (start/left aligned) */}
                        <div className="flex md:gap-[20px] gap-[10px] flex-wrap items-start justify-start">
                            <button className="px-[21px] py-[13px] bg-[#C79954] font-medium font-kufam text-white leading-[100%] tracking-[0px] rounded-[8px] text-[20px] cursor-pointer">
                                Get Expert Help
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customize
