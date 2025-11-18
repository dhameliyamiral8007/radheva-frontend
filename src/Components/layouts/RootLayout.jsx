import { Outlet } from "react-router-dom";
import Header from "../pages/header/Header";
import Footer from "../pages/footer/Footer"

const RootLayout = () => {
	return (
		<div className="w-full overflow-x-hidden">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default RootLayout;

