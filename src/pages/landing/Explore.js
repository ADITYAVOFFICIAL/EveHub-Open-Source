import React, { useState, useMemo } from "react";
import GetExporeLogic from "../../Logic/Explore/getEvents";
import EventCarousel from "../../components/EventCarousel";
import Loading from "../../components/Loading";
import { categories } from "../../Logic/EventsLogic/categories";
import Cal from "../../pages/dashboard/Cal";
import Calimage from "../../assets/images/cal.jpg"

function Explore() {
  const {
    events,
    offlineEvent,
    onlineEvent,
    loading,
    error,
    setSearchParams,
    category,
  } = GetExporeLogic();

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
      <h1 className="pb-6 text-2xl md:text-4xl font-bold text-center md:text-left">
        Explore the events happening at SRM KTR Campus
      </h1>
      <h1 className="pb-5 text-2xl font-bold">Categories</h1>
      <div className="flex gap-5 mb-8 items-center flex-wrap text-neutral-500 font-bold">
        {[{ label: "All" }, ...categories]?.map((item, index) => (
          <button
          style={{fontSize:"17px"}}
            onClick={(e) => {
              e.preventDefault();
              if (item?.label === "All") setSearchParams((prev) => ({}));
              else setSearchParams((prev) => ({ ...prev, category: item?.label }));
            }}
            className={`text-sm ${
              (category === item.label || item.label === "All") &&
              "text-primary"
              }`}
          >
            {item?.label}
          </button>
        ))}
      </div>
      <input
  type="text"
  placeholder="🔎 Search event here"
  onChange={handleChange}
  value={searchInput}
  style={{
    borderRadius: "20px",
    padding: "10px",
    border: "2px solid #ccc",
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
            <div className="text-white" style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" , marginBottom:"15px"}}>
              <span className="bg-black px-4 py-2 flex flex-col items-center justify-center" style={{ borderRadius: "16px" }}>
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
      <hr className="w-full  border border-black opacity-80 mb-5"></hr>
      <div style={{
  padding: "20px",
  borderRadius: "12px",
  backgroundImage: `url(${Calimage})`, // Wrap Calimage in url()
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  // Media query for mobile devices
  "@media (max-width: 550px)": {
    padding: "40px 40px 360px",
    borderRadius: "18px",
    width: "100%", // Increase border radius
  }
}}>
  <h1 className="pb-6 text-2xl md:text-4xl font-bold text-center md:text-center text-black">
    EVENT CALENDAR : SRMIST KTR
  </h1>
  <Cal />
</div>


    </section>
  );
}

export default Explore;
