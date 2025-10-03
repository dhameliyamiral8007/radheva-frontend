
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '../../config/hooks/useTheme'
import RingDesign from "../../../assets/radheva.png"
import underline from "../../../assets/about/underline.svg"
import RingSizes from "../../../assets/ringSize.jpg"
import { Link } from 'react-router-dom'
import { getAllBlogs, setCurrentPage } from '../../redux/slice/BlogSlice'

// Pagination Component
const BlogPagination = ({ totalBlogs, blogsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalBlogs / blogsPerPage)

  const getPageNumbers = () => {
    let pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages]
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
      }
    }
    return pages
  }

  return (
    <div className="flex justify-center mt-10">
      <nav className="inline-flex items-center space-x-2 text-sm font-medium">
        {/* Previous */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-[16px] rounded-md text-[#6a6c70] font-semibold font-nunito cursor-pointer uppercase tracking-[0px] leading-100% disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1">...</span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(page)}
              className={`px-[16.2px] py-[13px] rounded-[10px] cursor-pointer font-kufam ${currentPage === page
                ? "bg-[#6a6c70] text-white"
                : "bg-gray-400 dark:hover:bg-gray-600"
                }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-[16px] rounded-md text-[#6a6c70] font-semibold font-nunito cursor-pointer uppercase tracking-[0px] leading-100% disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  )
}

const Blog = () => {
  const { colors, theme } = useTheme()
  const dispatch = useDispatch()
  const { blogs, loading, error, currentPage, blogsPerPage } = useSelector((state) => state.blog)
  
  // Add local state to track initial load
  const [initialLoad, setInitialLoad] = useState(true)

  // Fetch blogs on component mount - only once
  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(getAllBlogs())
      setInitialLoad(false) // Mark initial load as complete
    }
    
    fetchBlogs()
  }, [dispatch]) // Remove blogs from dependencies to prevent infinite loops

  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page))
  }

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get excerpt from content
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return 'No content available.'
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  }

  // Slice blogs for current page
  const indexOfLastBlog = currentPage * blogsPerPage
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog)

  // Show loading only during initial load AND redux loading
  if (initialLoad && loading) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen flex justify-center items-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C79954] mx-auto"></div>
          <p className="mt-4 text-lg">Loading blogs...</p>
        </div>
      </div>
    )
  }

  // Error state - only show if we're not in initial load or if there's actually an error
  if (error && !initialLoad) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen flex justify-center items-center`}>
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => {
              setInitialLoad(true)
              dispatch(getAllBlogs()).finally(() => setInitialLoad(false))
            }}
            className="px-6 py-2 bg-[#C79954] text-white rounded-md hover:bg-[#b68947] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
      {/* Hero */}
      <div className="relative h-[500px]">
        <img src={RingDesign} alt="RingDesign" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col xl:top-[300px] md:top-[250px] xl:mx-0 md:mx-8 mx-4 top-32 items-center text-center gap-[20px]">
          <h2 className="text-[30px] text-[#FFFFFF] leading-[100%] tracking-[0px] md:text-[40px] font-kufam">Radheva's Blog</h2>
          <p className="max-w-[1532px] text-[#FFFFFF] font-semibold tracking-[0px] font-kufam leading-[25px] md:text-[20px] text-[15px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>

      {/* The Shine Line */}
      <div>
        <div className="text-center py-5">
          <h2 className="text-[35px] font-belleza inline-block relative">
            The Shine Line
            <img src={underline} alt="underline" className="p-2 mx-auto" />
          </h2>
        </div>

        {/* Blog Grid */}
        {blogs.length === 0 && !loading ? (
          <div className="text-center py-10">
            <p className="text-lg">No blogs available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center xl:mx-24 md:mx-10 mx-4">
              {currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className={`overflow-hidden grid gap-[30px] rounded-lg shadow-lg transition-all duration-300 ${theme === "dark" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"}`}
                >
                  <Link to={`/blog/${blog._id}`}>
                    <img
                      src={blog.blogImage || 'https://via.placeholder.com/300x200'}
                      alt={blog.title}
                      className="w-full h-[260px] object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="p-4 grid gap-[12px]">
                    <p className={`text-[14px] font-kufam font-normal tracking-[0px] leading-100% ${theme === "dark" ? "text-[#76869c]" : "text-[#94A3B8]"}`}>
                      {formatDate(blog.createdAt)}
                    </p>
                    <h3 className={`text-[24px] font-belleza font-normal tracking-[0px] leading-[28px] ${theme === "dark" ? "text-black" : "text-white"}`}>
                      {blog.title || 'Untitled Blog'}
                    </h3>
                    <p className={`text-[14px] font-kufam font-normal tracking-[0px] leading-100% ${theme === "dark" ? "text-[#64748B]" : "text-[#94A3B8]"}`}>
                      {blog.author || 'Unknown Author'}
                    </p>
                    <p className={`text-[16px] font-kufam font-normal tracking-[0px] leading-[24px] ${theme === "dark" ? "text-[#76869c]" : "text-[#cbd5e1]"}`}>
                      {getExcerpt(blog.content || blog.description)}
                    </p>
                    <Link
                      to={`/blog/${blog._id}`}
                      className={`text-[16px] font-kufam underline font-normal tracking-[0px] leading-100% ${theme === "dark" ? "text-black hover:text-[#C79954]" : "text-[#C79954] hover:text-[#b68947]"} transition-colors duration-200`}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <BlogPagination
              totalBlogs={blogs.length}
              blogsPerPage={blogsPerPage}
              currentPage={currentPage}
              setCurrentPage={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Banner */}
      <div className="relative w-full max-w-[1440px] mx-auto py-[50px]">
        <img src={RingSizes} alt="Expert" className="w-full h-[325.43px] object-cover" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="max-w-[458px] flex flex-col md:gap-[60px] gap-[40px] max-sm:px-[20px]">
            <div className="grid text-white gap-[12px]">
              <h2 className="text-[23px] md:text-[44px] leading-[52.08px] tracking-[0px] font-normal font-belleza">
                The Art of Sophistication
              </h2>
              <p className="font-kufam leading-[100%] text-white font-normal text-[16px] tracking-[0px]">
                With curves that flow like poetry and stones that gleam like stars, this pendant is jewelry reimagined.
              </p>
            </div>

            <div className="flex md:gap-[20px] gap-[10px] flex-wrap items-start justify-start">
              <button className="px-[21px] py-[13px] bg-[#C79954] font-medium font-kufam text-white leading-[100%] tracking-[0px] rounded-[8px] text-[20px] cursor-pointer hover:bg-[#b68947] transition-colors">
                Explore Artistic Elegance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog