import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSliders } from "../../redux/slice/sliderSlice";
import { setProductFilter } from "../../redux/slice/ProductFilterSlice";
const Hero = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { data: images, loading, error } = useSelector((state) => state.slider);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		dispatch(fetchSliders());
	}, [dispatch]);

	// Auto-rotate slides
	useEffect(() => {
		if (!images.length) return;
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [images.length]);

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	const getPositionConfig = (position = "center") => {
		const pos = position.toLowerCase();
		switch (pos) {
			case "left":
				return {
					container: "justify-start",
					textAlign: "items-start text-left",
					padding: "md:pl-12 pl-4 pr-4",
				};
			case "right":
				return {
					container: "justify-end",
					textAlign: "items-end text-right",
					padding: "md:pr-12 pr-4 pl-4",
				};
			default:
				return {
					container: "justify-center",
					textAlign: "items-center text-center",
					padding: "md:px-12 px-4",
				};
		}
	};

	// Handle button click - navigate to products with collection ID
	const handleButtonClick = (item, e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('Button clicked, item:', item);
		const collectionId = item?.collectionid?._id || item?.collectionid?.id || null;
		console.log('Collection ID:', collectionId);
		if (collectionId) {
			dispatch(setProductFilter({ navigationID: null, collectionID: collectionId, collectionItemID: null }));
			navigate('/products');
		} else {
			// If no collection ID, just navigate to products page
			console.log('No collection ID, navigating to products');
			navigate('/products');
		}
	};

	if (loading) return <div className="h-[600px] flex items-center justify-center">Loading...</div>;
	if (error) return <div className="h-[600px] flex items-center justify-center text-red-500">{String(error)}</div>;
	if (!images.length) return null;

	return (
		<div className="relative w-full ">
			<div className="relative w-full h-[600px] lg:h-[750px]">
				{images.map((item, index) => (
					<div
						key={item._id || index}
						className={`absolute inset-0 transition-opacity duration-1000 
							${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}
							`}
					>
						<img
							src={item.image}
							alt="hero"
							className="w-full h-full object-cover"
						/>
						{(() => {
							const { container, textAlign, padding } = getPositionConfig(item.position);
							const textColor = item.color || "#FFFFFF";
							return (
								<div className={`absolute inset-0 flex ${container} pt-12 ${padding}`}>
									<div className={`flex flex-col lg:gap-40 gap-20 max-w-3xl ${textAlign}`}>
										<div className="space-y-4">
											<div
												className={`flex ${textAlign.includes("items-end") ? "justify-end" : textAlign.includes("items-start") ? "justify-start" : "justify-center"} font-kufam text-2xl`}
												style={{ color: textColor }}
											>
												<span className="break-words">{item.shortdesc}</span>
												<hr className="ml-2 bg-[#C79954] w-5 border-0 h-[2px]" />
											</div>
											<h1
												className="mt-2 font-Ginger text-4xl sm:text-5xl leading-tight break-words"
												style={{ color: textColor, overflowWrap: "anywhere" }}
											>
												{item.title}
											</h1>
											<p
												className="mt-4 sm:mt-6 text-base sm:text-lg font-kufam break-words"
												style={{ color: textColor, overflowWrap: "anywhere" }}
											>
												{item.description}
											</p>
										</div>
										<div className={`flex ${textAlign.includes("items-end") ? "justify-end" : textAlign.includes("items-start") ? "justify-start" : "justify-center"} w-full`}>
											<div className="inline-flex flex-col items-center gap-2 px-6 py-3 rounded-xl">
												<button
													type="button"
													onClick={(e) => handleButtonClick(item, e)}
													className="inline-flex items-center gap-3 px-6 py-3 rounded-xl btn-accent w-auto cursor-pointer z-10 relative"
												>
													<span className="text-sm font-medium">{item.buttontxt}</span>
													<span className="h-[28px] w-[28px] flex items-center justify-center rounded-xl bg-white text-black">
														<svg
															width="16"
															height="11"
															viewBox="0 0 24 24"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path
																d="M5 12h14M13 5l7 7-7 7"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</span>
												</button>
												<div className={` ${index === currentSlide ? "opacity-100" : "opacity-0"} h-[2px] bg-[#D1AE6B] w-full`} />
											</div>
										</div>
									</div>
								</div>
							);
						})()}
						<div className="absolute md:bottom-8 bottom-4 left-1/2 -translate-x-1/2 flex items-center md:gap-6 gap-3 text-white/80">
							{images.map((_, idx) => (
								<div key={idx} className="flex items-center md:gap-6 gap-3">
									<button
										onClick={() => goToSlide(idx)}
										className={`md:text-[30px] text-[15px] transition-colors ${idx === currentSlide ? "text-[#C79954]" : "text-white"}`}
									>
										{String(idx + 1).padStart(2, "0")}
									</button>
									{idx === currentSlide && idx < images.length - 1 && (
										<span className="relative block h-[2px] w-14 md:w-[121px] bg-[#C79954]">
											<span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 bg-[#C79954] rotate-45" />
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Hero;
