import { IoPersonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import Brand from "./Brand";
import LogoutLogic from "../Logic/UserLogic.js/Logout.logic";
import { useUser } from "../context/userContext";

function Navbar() {
  const { userInfo } = useUser();
  const location = useLocation();
  let token = localStorage.getItem("token");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    setNavData([
      {
        title: "Explore",
        link: "/explore",
        show: true,
      },
      {
        title: "Login",
        link: "/auth/login",
        show: !token,
      },
    ]);
  }, [token]);

  const { logout } = LogoutLogic();

  return (
    <div className="app">
<nav className={`text-white w-full bg-secondary text-lg py-2 ${location.pathname === "/" ? "rounded-b-none" : ""}`} style={{borderRadius: location.pathname !== "/" ? "0 0 25px 25px" : ""}}>
        <div className="container">
          <div className="flex mx-auto justify-between">
            {/* Primary menu and logo */}
            <div className="flex items-center justify-between w-full gap-16 my-2 font-poppins">
              {/* logo */}
              <div>
                <Brand style={{ fontSize: "34px" }} />
              </div>
              {/* middle */}
              <div className="flex gap-8">
                {userInfo && (
                  <NavLink
                    title={userInfo.email}
                    className="inline-flex items-center justify-center gap-1 hover:text-accent hidden md:flex" // Hide on mobile screens
                    style={{
                      border: "1px solid",
                      borderRadius: "20px",
                      height: "35px",
                      width: "530px",
                      color: "black",
                      borderColor: "white",
                      backgroundColor: "white",
                      fontWeight: "bold"
                    }}
                    to="/dashboard"
                  >
                    <>
                      <IoPersonOutline className="text-lg" style={{fontWeight:"600"}}/>
                      <span className="text-lg" style={{fontWeight:"600"}}>Welcome {userInfo.name}</span>
                    </>
                  </NavLink>
                )}
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8">
                {navData?.map(
                  (item, index) =>
                    item.show && (
                      <NavLink
                        onClick={() => setToggleMenu(false)}
                        key={index}
                        to={item.link}
                        className="hover:text-accent font-bold" // Apply bold font style
                      >
                        {item.title}
                      </NavLink>
                    )
                )}
                {token && <button onClick={logout} className="font-bold">Logout</button>} {/* Apply bold font style */}
              </div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <RiMenu3Line size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full bg-secondary overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 font-poppins ${
            !toggleMenu ? "h-0" : "h-full"
          }`} style={{borderRadius:"0 0 30px 30px"}}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 tracking-wider">
              {navData?.map(
                (item, index) =>
                  item.show && (
                    <NavLink
                      onClick={() => setToggleMenu(false)}
                      key={index}
                      to={item.link}
                      className="hover:text-accent font-bold pt-10 flex items-center"                    >
                      {item.title}
                    </NavLink>
                  )
              )}
              
              {token && (
                <button className="logout-btn font-bold" onClick={logout}> {/* Apply bold font style */}
                  Logout
                </button>
              )}<div className="flex items-center justify-center w-full"> {/* Added w-full class */}
              {userInfo && (
  <NavLink to="/dashboard">
    <button className="primary-btn" style={{
      border: "1px solid",
      borderRadius: "20px",
      height: "60px",
      width: "100%",
      color: "black",
      borderColor: "white",
      backgroundColor: "white",
      fontWeight: "bold"
    }}>
      <>
        <IoPersonOutline className="text-lg" />
        <span className="text-lg" style={{width:"280px",fontWeight:"600"}}>Welcome {userInfo.name}</span>
      </>
    </button>
  </NavLink>
)}
            </div>            
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
