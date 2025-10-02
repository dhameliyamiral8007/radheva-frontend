// import React from 'react'
// import { useParams, Link } from 'react-router-dom'
// import { blogs, aboutBlog } from '../../config/data/blogs'
// import { useTheme } from '../../config/hooks/useTheme'
// import PopularBlog from './PopularBlog'
// const AboutBlog = () => {
//     const { colors, theme } = useTheme()
//     const { id } = useParams()
//     const blog = blogs.find((b) => b.id === Number(id))
//     const about = aboutBlog.find((b) => b.id === Number(id))

//     if (!blog) {
//         return <div className="text-center py-20">Blog not found.</div>
//     }

//     return (
//         <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
//             {/* Hero Section */}
//             <div className="relative h-[500px]">
//                 <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
//                 {/* <div className="absolute inset-0 bg-black/30" /> */}
//                 <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:top-[170px] md:top-[150px] xl:mx-24 lg:mx-5 md:mx-10 mx-4">
//                     <h2 className="text-[30px] text-white font-semibold md:text-[40px] font-kufam tracking-[0px] leading-100%">{blog.title}</h2>
//                     <p className=" text-white font-kufam font-normal md:text-[20px] text-[16px] leading-relaxed tracking-[0px] leading-100% max-sm:px-4">{blog.category}</p>
//                     <p className='text-[#A9B2B9] text-[18px] font-normal font-kufam tracking-[0px] leading-100% mt-3 '>Posted by: <span className='text-[#EEF1F3] font-kufam font-semibold text-[18px] tracking-[0px] leading-100% mt-3'>{blog.author}</span> <span className='text-[#A9B2B9] font-kufam font-normal text-[18px] tracking-[0px] leading-100% mt-3'>on {blog.date}</span></p>
//                     {/* <p className="max-w-5xl text-white font-kufam leading-relaxed">{blog.author}</p> */}
//                 </div>
//             </div>

//             {/* Blog Content */}
//             <div className={`xl:mx-24 md:mx-10 mx-4 pt-10`}>
//                 {about && (
//                     <div className="mt-2">
//                         <h4 className={`${colors.aboutBlog.text} font-kufam mb-2 font-bold text-[20px] tracking-[0px] leading-100%`}>Introduction</h4>
//                         <p className={`${colors.aboutBlog.introduction} mb-4 font-kufam  font-normal text-[20px] tracking-[0px] leading-100%`}>{about.introduction}</p>
//                         <h4 className={`${colors.aboutBlog.text} font-kufam mb-2 text-[#334155] font-bold text-[20px] tracking-[0px] leading-100%`}>Why Choose Lab-Grown Diamond?</h4>
//                         <p className={`${colors.aboutBlog.introduction} mb-4 font-kufam text-[#64748B] font-normal text-[20px] tracking-[0px] leading-100%`}>{about.selection}</p>
//                         {about.sections && about.sections.map((section, idx) => (
//                             <div key={idx} className="mb-4">
//                                 <span className={`${colors.aboutBlog.text} font-kufam mb-2 text-[#334155] font-bold text-[20px] tracking-[0px] leading-100%`}>{section.title}</span>
//                                 <div className={`${colors.aboutBlog.text} font-kufam mb-2 text-[#334155] font-bold text-[20px] tracking-[0px] leading-100%`}>{section.subTitle}</div>
//                                 <ul className="list-disc pl-10">
//                                     {section.points.map((point, i) => (
//                                         <div className={`${colors.aboutBlog.introduction} tracking-[0px] leading-100% font-kufam  font-semibold text-[20px] mb-2`}>
//                                             <li key={i}><span>Lorem Ipsum is simply:</span> {point}</li>
//                                         </div>
//                                     ))}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             <div>
//                 <PopularBlog />
//             </div>
//         </div>
//     )
// }

// export default AboutBlog
import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTheme } from '../../config/hooks/useTheme'
import PopularBlog from './PopularBlog'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogById, clearCurrentBlog } from '../../redux/slice/BlogSlice'

const AboutBlog = () => {
    const { colors, theme } = useTheme()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentBlog, loading, error } = useSelector((state) => state.blog)

    // Fetch blog when component mounts or id changes
    useEffect(() => {
        if (id) {
            dispatch(getBlogById(id))
        }
        return () => {
            dispatch(clearCurrentBlog())
        }
    }, [dispatch, id])

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Loading state
    if (loading) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen flex justify-center items-center`}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C79954] mx-auto"></div>
                    <p className="mt-4 text-lg">Loading blog...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen flex justify-center items-center`}>
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">Error: {error}</p>
                    <Link 
                        to="/blog"
                        className="px-6 py-2 bg-[#C79954] text-white rounded-md hover:bg-[#b68947] transition-colors"
                    >
                        Back to Blogs
                    </Link>
                </div>
            </div>
        )
    }

    // Blog not found state
    if (!currentBlog) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen flex justify-center items-center`}>
                <div className="text-center">
                    <p className="text-lg mb-4">Blog not found.</p>
                    <Link 
                        to="/blog"
                        className="px-6 py-2 bg-[#C79954] text-white rounded-md hover:bg-[#b68947] transition-colors"
                    >
                        Back to Blogs
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            {/* Hero Section */}
            <div className="relative h-[500px]">
                <img 
                    src={currentBlog.blogImage || 'https://via.placeholder.com/800x400'} 
                    alt={currentBlog.title} 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:top-[170px] md:top-[150px] xl:mx-24 lg:mx-5 md:mx-10 mx-4">
                    <h2 className="text-[30px] text-white font-semibold md:text-[40px] font-kufam tracking-[0px] leading-100%">
                        {currentBlog.title || 'Untitled Blog'}
                    </h2>
                    <p className="text-white font-kufam font-normal md:text-[20px] text-[16px] leading-relaxed tracking-[0px] leading-100% max-sm:px-4">
                        {currentBlog.category || 'General'}
                    </p>
                    <p className='text-[#A9B2B9] text-[18px] font-normal font-kufam tracking-[0px] leading-100% mt-3 '>
                        Posted by: <span className='text-[#EEF1F3] font-kufam font-semibold text-[18px] tracking-[0px] leading-100% mt-3'>
                            {currentBlog.author || 'Unknown Author'}
                        </span> 
                        <span className='text-[#A9B2B9] font-kufam font-normal text-[18px] tracking-[0px] leading-100% mt-3'>
                            on {formatDate(currentBlog.createdAt)}
                        </span>
                    </p>
                </div>
            </div>

            {/* Blog Content */}
            <div className={`xl:mx-24 md:mx-10 mx-4 pt-10`}>
                <div className="mt-2">
                    <div 
                        className={`${colors.aboutBlog.introduction} mb-4 font-kufam font-normal text-[20px] tracking-[0px] leading-100%`}
                        dangerouslySetInnerHTML={{ __html: currentBlog.content || 'No content available.' }}
                    />
                </div>
            </div>
            
            <div>
                <PopularBlog />
            </div>
        </div>
    )
}

export default AboutBlog