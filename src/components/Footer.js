import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      Copyright @{new Date().getFullYear()}{" "}
      <i className="fa-solid fa-envelope"></i>
      beclear
    </footer>
  );
}

export default Footer;
