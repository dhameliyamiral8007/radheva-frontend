import React, { useMemo, useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme';
import underline from "../../../assets/about/underline.svg";

const AskQuestion = () => {
    const { colors, theme } = useTheme();
    const [form, setForm] = useState({ question: '', name: '', email: '' });
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const errors = useMemo(() => {
        const e = {};
        if (!form.question.trim()) e.question = 'Please enter your question.';
        if (!form.name.trim()) e.name = 'Please enter your name.';
        if (!form.email.trim()) e.email = 'Please enter your email.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
        return e;
    }, [form]);

    const handleChange = (ev) => {
        const { id, value } = ev.target;
        setForm(prev => ({ ...prev, [id]: value }));
    };

    const handleBlur = (ev) => {
        const { id } = ev.target;
        setTouched(prev => ({ ...prev, [id]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ question: true, name: true, email: true });
        if (Object.keys(errors).length > 0) return;
        setSubmitting(true);
        try {
            await new Promise(res => setTimeout(res, 600));
            setSubmitted(true);
            setForm({ question: '', name: '', email: '' });
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
        >
            {/* Heading */}
            <div className="text-center py-5">
                <h2 className="text-[35px] font-Belleza inline-block relative">
                    Ask Question
                    <img src={underline} alt="underline" className="p-2 mx-auto" />
                </h2>
            </div>
            {/* create question form */}
            <div className='flex justify-center '>
                <form onSubmit={handleSubmit} className={`w-full max-w-7xl rounded px-8 pt-6 pb-8`} noValidate>
                    <div className="mb-6">
                        <label
                            className={`block text-sm font-bold mb-2 ${theme === 'dark' ? ' text-black' : ' text-white'
                                }`}
                            htmlFor="question"
                        >
                            Question
                        </label>

                        <textarea
                            className={`appearance-none border rounded-xl ${theme === 'dark' ? ' bg-white' : ' bg-[#282828]'} border-white/20 w-full py-3 px-4 leading-tight focus:outline-none placeholder:text-[#A9B2B9] ${theme === 'dark' ? ' text-black' : ' text-white'} ${touched.question && errors.question ? 'border-red-500' : ''}`}
                            id="question"
                            placeholder="Enter question"
                            value={form.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={touched.question && !!errors.question}
                            aria-describedby="question-error"
                        />
                        {touched.question && errors.question && (
                            <p id="question-error" className="mt-2 text-xs text-red-500">{errors.question}</p>
                        )}
                    </div>
                    <div className='mb-6'>
                        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? ' text-black' : ' text-white'}`} htmlFor='name'>
                            Name
                        </label>
                        <input
                            className={`appearance-none border rounded-xl ${theme === 'dark' ? ' bg-white' : 'bg-[#282828]'} border-white/20  w-full py-3 px-4 leading-tight focus:outline-none  placeholder:text-[#A9B2B9] ${theme === 'dark' ? ' text-black' : ' text-white'} ${touched.name && errors.name ? 'border-red-500' : ''}`}
                            id='name'
                            type='text'
                            placeholder='Enter your name'
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={touched.name && !!errors.name}
                            aria-describedby="name-error"
                        />
                        {touched.name && errors.name && (
                            <p id="name-error" className="mt-2 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>
                    <div className='mb-6'>
                        <label className={`block text-sm font-bold mb-2 ${theme === 'dark' ? ' text-black' : ' text-white'}`} htmlFor='email'>
                            Email<span className='text-red-500'> *</span>
                        </label>
                        <input
                            className={`appearance-none border  ${theme === 'dark' ? ' bg-white' : 'bg-[#282828]'} border-white/20 rounded-xl w-full py-3 px-4 leading-tight focus:outline-none  placeholder:text-[#A9B2B9] ${theme === 'dark' ? ' text-black' : ' text-white'} ${touched.email && errors.email ? 'border-red-500' : ''}`}
                            id='email'
                            type='email'
                            placeholder='Enter email'
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={touched.email && !!errors.email}
                            aria-describedby="email-error"
                        />
                        {touched.email && errors.email && (
                            <p id="email-error" className="mt-2 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {submitted && (
                        <div className='mb-4 text-center text-sm text-green-500'>Thanks! We received your question.</div>
                    )}

                    <div className='flex items-center justify-center'>
                        <button
                            className={`${colors.button.background} ${colors.button.text} font-belleza py-2 px-8 rounded focus:outline-none focus:shadow-outline disabled:opacity-60`}
                            type='submit'
                            disabled={submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AskQuestion
