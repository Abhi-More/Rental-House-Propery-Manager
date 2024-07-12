import Footer from "./Footer";
import Header from "./Header";
import Style from "../assets/css/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <div className={Style.wrapper}>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
