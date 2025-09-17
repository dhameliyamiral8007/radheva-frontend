import React, { useState } from "react";
import { useTheme } from "../../../config/hooks/useTheme";
import contactUs from "../../../../assets/footer/contactUs.svg";
import CloudIcon from "../../../../assets/Claud.svg"

// src/config/contactConfig.js
const contactConfig = {
    hero: {
        title: "Contact Us",
        subtitle:
            "We have to make your diamond shopping effortless and exciting. Let’s get in touch today.",
        image: "/assets/footer/contactUs.svg", // use your real path
    },
    map: {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238124.45734886205!2d72.63589755430203!3d21.164546923458982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c145fabcd7b%3A0x4f0a8b4f1a22bb18!2sSneh%20Rashmi%20Botanical%20Garden!5e0!3m2!1sen!2sin!4v1756463196066!5m2!1sen!2sin",
    },
    form: {
        title: "Let’s Create Something Beautiful Together",
        fields: [
            { name: "name", label: "Name", type: "text", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "phone", label: "Phone Number", type: "text", required: true },
            { name: "subject", label: "Subject", type: "text", required: true },
        ],
        upload: {
            label: "Upload Reference Images",
            accept: "image/*",
        },
        button: {
            text: "Send Message",
        },
    },
};

const ContactUs = () => {
    const { colors, theme } = useTheme();
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload a file before submitting.");
            return;
        }
        alert("Form submitted successfully ✅");
    };

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[500px]">
                <img
                    src={contactUs}
                    alt="Contact Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center top-[130px] md:top-[250px] px-4">
                    <h2 className="text-[32px] md:text-[50px] text-white font-semibold font-kufam mb-4">
                        {contactConfig.hero.title}
                    </h2>
                    <p className="max-w-3xl text-white font-kufam text-[16px] md:text-[20px]">
                        {contactConfig.hero.subtitle}
                    </p>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[300px] md:h-[500px] flex justify-center items-center pt-6 md:pt-10 px-4">
                <iframe
                    title="location-map"
                    src={contactConfig.map.src}
                    className="w-full h-full rounded-lg"
                    loading="lazy"
                ></iframe>
            </div>

            {/* Form Section */}
            <div className="w-full flex justify-center items-center px-4 py-10">
                <div className="w-full max-w-4xl">
                    <h3 className="text-[22px] md:text-[26px] font-semibold mb-6 text-center  font-kufam">
                        {contactConfig.form.title}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {contactConfig.form.fields.map((field, idx) => (
                            <div key={idx} className="grid gap-2">
                                <label className="text-[18px] font-kufam">
                                    {field.label}
                                    {field.required && (
                                        <span className="text-[#FF383C]">*</span>
                                    )}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={`Enter Your ${field.label}`}
                                    required={field.required}
                                    className={`w-full p-3 rounded-lg text-[16px] ${theme === "dark"
                                        ? "bg-white text-black"
                                        : "bg-[#292929] text-[#A9B2B9]"
                                        }`}
                                />
                            </div>
                        ))}

                        {/* File Upload */}
                        <div
                            className={`border border-dashed rounded-xl w-full h-[140px] flex flex-col items-center justify-center gap-2 ${theme === "dark" ? "bg-white text-black" : "bg-[#282828] text-[#D9D9D9]"
                                }`}
                        >
                            <input
                                type="file"
                                id="fileInput"
                                accept={contactConfig.form.upload.accept}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="w-9 h-9 flex items-center justify-center cursor-pointer"
                            >
                                <img src={CloudIcon} alt="upload" className="w-7 h-7" />
                            </label>
                            <span className="text-[14px] md:text-[15px] font-nunito opacity-80">
                                {contactConfig.form.upload.label}
                            </span>
                            {file && <p className="text-sm text-green-500">{file.name}</p>}
                        </div>

                        {/* Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="py-3 px-6 bg-[#C79954] text-white font-kufam text-[18px] md:text-[20px] rounded-lg"
                            >
                                {contactConfig.form.button.text}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

