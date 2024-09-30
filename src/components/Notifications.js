import React from "react";
import { useNotifications } from "../context/notificationContext";
import NotificationCard from "./NotificationCard";
import { IoArrowBack } from "react-icons/io5";

function Notifications() {
  const { show, toggleNotificationBar, notifications } = useNotifications();

  return show ? (
    <div className={` overflow-y-auto transition-all border-r border-slate-500 rounded-r-3xl`} style={{ width: "35%" }}>
      <h2 className="sticky bg-slate-950 text-slate-400 top-0 p-4 z-10 px-2 page-title w-full border-slate-500 rounded-r-xl border-b inline-flex gap-2 items-center ">
        <button onClick={toggleNotificationBar}>
          <IoArrowBack className="text-slate-400"/>
        </button> 
        Notifications
      </h2>
      {notifications?.length === 0 ? 
        <p className="p-4 rounded-[18px] mt-6 flex items-center gap-2 shadow outline outline-1 outline-none bg-slate-900 text-slate-300 font-semibold">
        🥷 Dark Mode Added [BETA] <br/> - 30 Sep '24 --5.45am
      </p> :
        <div className="overflow-auto p-4 px-2 flex flex-col gap-2 bg-gray-200 h-full w-full">
          {notifications?.map((notification) => (
            <NotificationCard key={notification.$id} {...notification} />
          ))}
        </div>
      }
    </div>
  ) : null;
}

export default Notifications;
