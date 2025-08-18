import ContactSection from './utils/ContactSection';
import Header from './utils/Header';
import Footer from './utils/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<ContactSection />
			<Footer />
		</>
	);
};
export default Layout;
