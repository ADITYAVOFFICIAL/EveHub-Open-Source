import React, { useEffect, useState } from "react";
import GetEventLogic from "../../Logic/EventsLogic/getEvents";
import EventCard from "../../components/EventCard";
import Loading from "../../components/Loading";

function Events() {
  const {
    loading,
    error,
    events,
    privateEvent,
    publicEvent,
    offlineEvent,
    onlineEvent,
    filter,
    searchParams,
    setSearchParams,
  } = GetEventLogic();

  const [filteredEvents, setFilteredEvents] = useState(null);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter === "total") {
      setFilteredEvents(events);
    } else if (filter === "private") {
      setFilteredEvents(privateEvent);
    } else if (filter === "public") {
      setFilteredEvents(publicEvent);
    } else if (filter === "offline") {
      setFilteredEvents(offlineEvent);
    } else if (filter === "online") {
      setFilteredEvents(onlineEvent);
    }
  }, [events, searchParams, privateEvent, publicEvent, offlineEvent, onlineEvent]);
  

  return (
    <>
      <div className="w-full px-6 my-4 rounded-[18px] bg-slate-800 outline outline-1 text-slate-400 outline-slate-800 flex items-center justify-between">
        <input
          onChange={(e) => {
            e?.preventDefault();
            setFilteredEvents((prev) =>
              events?.filter(
                (event) =>
                  event?.title
                    ?.toLowerCase()
                    .includes(e.target.value?.toLowerCase() ?? "") &&
                  (filter === 'total' ?  true : (event.medium === filter || event.privacy === filter))
              )
            );
          }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent py-4 outline-none"
        />
        <select
          defaultValue={filter}
          onChange={(e) => {
            e?.preventDefault();
            setSearchParams({ filter: e.target.value });
          }}
          className="w-max bg-transparent py-4 pl-4 outline-none border-l border-neutral-300"
        >
          <option value="total">Total</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
        </select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {error && <p>{error}</p>}
          <div className="grid lg:grid-cols-2 gap-4">
            {!loading && filteredEvents?.length > 0 ? (
              filteredEvents?.map((event, index) => (
                <EventCard key={index} event={event} />
              ))
            ) : (
              <p className="text-neutral-500">No events found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Events;
