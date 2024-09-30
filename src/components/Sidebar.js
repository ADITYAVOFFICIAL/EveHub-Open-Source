import React, { useCallback, useEffect } from "react";
import {
  IoBook,
  IoCalendarNumberOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoutLogic from "../Logic/UserLogic.js/Logout.logic";
import client from "../appwrite.config";
import { Account } from "appwrite";
import { useNotifications } from "../context/notificationContext";
import Brand from "./Brand";
import { useUser } from "../context/userContext";

function Sidebar() {
  const { logout } = LogoutLogic();
  // const [userInfo, setUserInfo] = useState(null);

  const { userInfo, setUserInfo } = useUser();

  const { toggleNotificationBar, unreadNotifications } = useNotifications();
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const account = new Account(client);
      const res = await account.get();
      
      localStorage.setItem("evehub-user", JSON.stringify(res));
      setUserInfo((prev) => res);
    } catch (err) {
      console.error(err);
      localStorage.removeItem("evehub-user");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate, setUserInfo]); // Include navigate and setUserInfo in the dependency array
  

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className="flex flex-col p-4 border-r border-slate-600 text-slate-400 rounded-r-3xl gap-2">
      <div className="sidebar-link hover:bg-transparent hover:shadow-none w-max text-slate-400">
        <Brand />
      </div>
      <Link className="sidebar-link" to="">
        <IoHomeOutline className="text-slate-400"/> Home
      </Link><Link className="sidebar-link" to="calendar">
        <IoCalendarNumberOutline className="text-slate-400" /> Shared Calendar
      </Link>
      <NavLink className="sidebar-link" to="events?filter=total">
        <IoTicketOutline className="text-slate-400" /> Events
      </NavLink>
      <button className="sidebar-link" onClick={toggleNotificationBar}>
        <div className="relative">
          <IoNotificationsOutline  className="text-slate-400"/>
          {unreadNotifications > 0 && (
            <p className="absolute -top-3 p-2 aspect-square -right-2 bg-primary text-white rounded-full text-[10px] text-center w-2 h-2 flex items-center justify-center">
              <span className="w-max h-max">
                {unreadNotifications > 9 ? `9+` : unreadNotifications}
              </span>
            </p>
          )}
        </div>
        Notifications
      </button>
      <NavLink className="sidebar-link" to="pdfer">
        <IoBook  className="text-slate-400"/> Instructions
      </NavLink>  
      <div className="mt-auto flex flex-col">
      <NavLink
  title={userInfo?.email}
  className="sidebar-link inline-flex items-center gap-1 "
  to="account"
>
  {userInfo ? (
    <>
      <IoPersonOutline  className="text-slate-400"/> {userInfo?.name}
    </>
  ) : (
    "Account"
  )}
</NavLink>

        <button className="sidebar-link" onClick={logout}>
          <IoLogOutOutline  className="text-slate-400"/> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
