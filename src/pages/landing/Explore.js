import React, { useState, useMemo } from "react";
import GetExporeLogic from "../../Logic/Explore/getEvents";
import EventCarousel from "../../components/EventCarousel";
import Loading from "../../components/Loading";
import { categories } from "../../Logic/EventsLogic/categories";
import Cal from "../../pages/dashboard/Cal";
import Calimage from "../../assets/images/cal.jpg";

function Explore() {
  const {
    events,
    offlineEvent,
    onlineEvent,
    loading,
    error,
    setSearchParams,
  } = GetExporeLogic();

  // Set initial category to "All"
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredEvents = useMemo(() => {
    if (searchInput.trim() === "") return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [events, searchInput]);

  if (loading) return <Loading />;

  return (
    <section className="container py-4 md:py-16">
      <h1 className="pb-6 text-2xl md:text-4xl font-bold text-center md:text-left text-slate-400">
        Explore the events happening at SRM KTR Campus
      </h1>
      <h1 className="pb-5 text-2xl font-bold text-slate-400">Categories</h1>
      <div className="flex gap-4 mb-8 items-center flex-wrap font-bold justify-center md:justify-start">
        {[{ label: "All" }, ...categories]?.map((item, index) => {
          const isActive = category === item.label;

          return (
            <button
              key={index}
              style={{
                border: "1px solid",
                borderRadius: "6px",
                height: "36px", // Adjusted height for better fitting
                color: isActive ? "white" : "#94a3b8", // Change text color based on active state
                borderColor: "#0f172a",
                backgroundColor: isActive ? "#0f172a" : "transparent", // Change background based on active state
                fontWeight: "bold",
                marginTop: "0px",
                fontSize: "17px",
                padding: "0 15px", // Adjusted padding for better appearance
              }}
              onClick={(e) => {
                e.preventDefault();
                // Update search parameters based on the button clicked
                if (item?.label === "All") {
                  setSearchParams((prev) => ({})); // Clear category when "All" is selected
                  setCategory("All"); // Set category to "All"
                } else {
                  setSearchParams((prev) => ({ ...prev, category: item?.label })); // Set specific category
                  setCategory(item?.label); // Set the selected category
                }
              }}
              className={`text-sm`}
            >
              {item?.label}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        placeholder="🔎 Search event here"
        onChange={handleChange}
        value={searchInput}
        className="border-none text-slate-400 bg-zinc-900"
        style={{
          borderRadius: "20px",
          padding: "15px",
          width: "100%",
          maxWidth: "400px", // Adjust the width as needed
          marginBottom: "20px", // Adjust spacing as needed
        }}
      />

      {error ? (
        <div>{error}</div>
      ) : (
        <>
          {filteredEvents?.length > 0 ? (
            <EventCarousel events={filteredEvents} title={"All"} />
          ) : (
            <div className="text-white" style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center", marginBottom: "15px" }}>
              <span className="bg-slate-400 px-4 py-2 flex flex-col items-center justify-center" style={{ borderRadius: "16px" }}>
                <span>⚠️ NO EVENTS FOUND</span>
                <span className="mt-1 text-base">Wait for Organisers to Post</span>
              </span>
            </div>
          )}
          {offlineEvent?.length > 0 && (
            <EventCarousel events={offlineEvent} title={"Offline"} />
          )}
          {onlineEvent?.length > 0 && (
            <EventCarousel events={onlineEvent} title={"Online"} />
          )}
        </>
      )}
      <hr className="w-full border border-slate-400 opacity-80 mb-5"></hr>
      <div style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundImage: `url(${Calimage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
        <h1 className="pb-6 text-2xl md:text-4xl font-bold text-center md:text-center text-slate-400">
          EVENT CALENDAR : SRMIST KTR
        </h1>
        <Cal/>
      </div>
    </section>
  );
}

export default Explore;
