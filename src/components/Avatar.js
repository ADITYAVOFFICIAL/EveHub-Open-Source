import React from "react";
import { useUser } from "../context/userContext";

function Avatar({ size }) {
  // Use the userInfo object from the context
  const { userInfo } = useUser();

  // Extract the user ID from userInfo
  const userId = userInfo?.$id || userInfo?.$uid || "Unknown";

  return (
    <div
      className={`font-bold p-4 flex aspect-square text-center items-center justify-center bg-gradient-to-br from-green-500 to-black text-white ${size}`}
      style={{ borderRadius: "16px", height: "65px", width: "360px" }}
    >
      {/* Display the user ID */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "16px" }}>User ID</p>
        <p style={{ marginTop: "-10px" }}>{userId}</p>
      </div>
    </div>
  );
}

export default Avatar;
