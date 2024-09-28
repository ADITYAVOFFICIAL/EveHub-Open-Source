import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Logo2 from "../assets/images/logo_color.png";

function Brand({ logoSize, fontSize }) {
  const { pathname } = useLocation();

  return (
    <Link
      title="Home"
      className={`font-extrabold gap-2 capitalize inline-flex text-xl items-center ${(pathname.includes('dashboard') || pathname.includes('auth')) && 'text-primary'} font-poppins`}
      to={"/"}
    >
      <img alt="Logo" className={logoSize="50px" ?? "w-8"} src={(pathname.includes('dashboard') || pathname.includes('auth')) ? Logo2 : Logo} style={{ width: "30", height: logoSize }} />
      <span className={(pathname.includes('dashboard') || pathname.includes('auth')) ? 'hidden' : 'block'} style={{ fontSize:"25px" }}>EveHub</span>
    </Link>
  );
}

export default Brand;
