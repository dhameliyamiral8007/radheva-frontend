import { Outlet } from "react-router-dom";
import Header from "../pages/header/Header";
import Footer from "../pages/footer/Footer"

const RootLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default RootLayout;

