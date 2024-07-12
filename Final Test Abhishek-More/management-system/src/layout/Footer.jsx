import Style from "../assets/css/Layout.module.css";

const Footer = () => {
  // to get current year
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={Style["footer-section"]}>
      <div className={Style["footer-wrapper"]}>
        <p>
          &copy; Copyrights | All Rights Reserved | RHP Management System |{" "}
          {getCurrentYear()}
        </p>
      </div>
    </div>
  );
};

export default Footer;
