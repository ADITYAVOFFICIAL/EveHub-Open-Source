import React from "react";
import GetEventLogic from "../../Logic/EventsLogic/getEvents";
import Loading from "../../components/Loading";
import { MdComputer, MdCurrencyRupee, MdVerified } from "react-icons/md";
import { FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';
import {
  IoBookmarkOutline,
  IoCalendarClearOutline,
  IoLanguageOutline,
  IoLocationOutline,
  IoTimerOutline,
  IoWalletOutline,
  IoPeople,
  IoMegaphoneOutline,
} from "react-icons/io5";
import { shareLinks } from "../../static/shareLinks";
import { useLocation } from "react-router-dom";
import RsvpLogic from "../../Logic/Explore/rsvp.logic";

function EventPage() {
  const { loading, error, events } = GetEventLogic();
  const { adding } =
    RsvpLogic(events);
  

  const { pathname } = useLocation();

  if (loading || !events) return <Loading />;
  if (error) return <div>{error}</div>;

  const {
    title,
    description,
    medium,
    price,
    category,
    usernamee,
    lumaurl,
    webyurl,
    name1,
    name2,
    ph1,
    ph2,
    facebooker,
    insta,
    maxParticipants,
    startDate,
    endDate,
    location,
    image,
    meet,
    tnc,
    language,
    duration,
  } = events;

  const start = startDate ? new Date(startDate?.split("+")[0]) : null;
  const end = endDate ? new Date(endDate?.split("+")[0]) : null;
  const startDay = start ? formatDate(start) : null;
const endDay = end ? formatDate(end) : null;

function formatDate(date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = monthsOfYear[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
}
  const startTime = start
  ? convertTo12HourFormat(start.getHours(), start.getMinutes())
  : null;
const endTime = end
  ? convertTo12HourFormat(end.getHours(), end.getMinutes())
  : null;

function convertTo12HourFormat(hours, minutes) {
  // Determine AM or PM
  const meridiem = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  let hour12 = hours % 12;
  hour12 = hour12 || 12; // Convert 0 to 12

  // Add leading zero to minutes if needed
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time
  return `${hour12}:${minutesStr} ${meridiem}`;
}

  

  const RSVPBtn = () => {
    const disableLink = webyurl === window.location.href;
    
    // Return null if webyurl is null
    if (!webyurl) return null;
  
    return (
      <button
        disabled={adding || disableLink}
        onClick={() => {
          if (medium === "offline") {
            // Redirect to webyurl when medium is offline
            window.open(webyurl, '_blank');
          } else {
            // Open meet[0] link when medium is online
            window.open(meet[0], '_blank');
          }
        }}
        className={`primary-btn ${adding ? 'disabled:opacity-60' : ''}`}
      >
        {price <= 0 ? "VISIT LINK" : "VISIT LINK"}
      </button>
    );
  };  
  
  
  

  return (
    <section className="container py-8 pb-16 w-full font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:items-start">
        <div className="col-span-4 space-y-4">
        <div class="image-container">
  <a href={image} rel="noopener noreferrer">
    <img
      src={image}
      className="rounded-lg w-full aspect-video object-cover"
    />
  </a>
  <button onClick={() => window.location.href = image} class="overlay-button primary-btn" style={{borderRadius:"8px", height:"50px"}}>View Full Image</button></div>



          <div className="flex flex-col md:hidden w-full space-y-4">
            <div className="rounded-lg flex flex-col gap-4 outline w-full outline-1 outline-neutral-300 p-6">
              <h2 className="font-bold text-xl">{title}</h2>
              <h3 className="font-bold">
  <span style={{ display: "flex", alignItems: "center" }}>
    {usernamee}
    <MdVerified style={{ color: "#17c3ff", marginLeft: "3px" }} />
  </span>
</h3>
              <h2 className="inline-flex items-center gap-2 text-sm">
                <IoBookmarkOutline /> {category}
              </h2>
              {duration?.length > 0 && (
                <h2 className="inline-flex items-center gap-2 text-sm">
                  <IoTimerOutline /> {duration.split(":").join("h ")}
                </h2>
              )}
              {medium?.length > 0 && (
  <h2 className="inline-flex items-center gap-2 text-sm">
    <IoMegaphoneOutline /> {medium.charAt(0).toUpperCase() + medium.slice(1)}
  </h2>
)}
              {language?.length > 0 && (
                <h2 className="inline-flex items-center gap-2 text-sm">
                  <IoLanguageOutline /> {language}
                </h2>
              )}
             {maxParticipants && (
  <h2 className="inline-flex items-center gap-2 text-sm">
    <IoPeople />Available Seats : {maxParticipants}
  </h2>
)}

              <h2 className="inline-flex items-center gap-2 text-sm">
                <IoCalendarClearOutline /> {startDay}, {startTime}
                {startDay === endDay && ` to ${endTime}`}
              </h2>
              {startDay !== endDay && endDate && endDay && (
                <h2 className="inline-flex items-center gap-2 text-sm">
                  <IoBookmarkOutline /> {endDay}, {endTime}
                </h2>
              )}
              
              <h2 className="inline-flex flex-wrap items-center gap-2 text-sm">
                {medium === "offline" ? (
                  <>
                    <IoLocationOutline />
                    <span className="flex-1">{location[0]}</span>
                    <iframe
                      title="map"
                      className="w-full h-max outline outline-1 outline-neutral-300 shadow-md rounded-lg flex-1 mt-2"
                      src={`https://maps.google.com/maps?q=${location[1]},${location[2]}&hl=en&output=embed`}
                    ></iframe>
                  </>
                ) : (
                  <>
                    <MdComputer />
                    <span className="overflow-hidden whitespace-nowrap">{meet[0] || "Online"}</span>
                  </>
                )}
              </h2>
              <div className="inline-flex items-center justify-between w-full">
                <h2 className="inline-flex items-center gap-2 font-extrabold font-grostek text-xl mt-2">
                  <IoWalletOutline />{" "}
                  {price <= 0 ? (
                    "Free"
                  ) : (
                    <>
                      <MdCurrencyRupee />
                      {price}
                    </>
                  )}
                </h2>
                
                <RSVPBtn />
                
              </div>
              { (name1 || ph1 || name2 || ph2) && (
  <div className="rounded-lg flex flex-col gap-4 outline w-full outline-1 outline-neutral-300 p-6">
    <h2 className="font-bold text-md">Contact Details</h2>
    { name1 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "1" }}>
        <span style={{ fontWeight: "600" }}>Name</span> : {name1}
      </p>
    )}
    { ph1 && (
      <p style={{ fontSize: "14px", marginBottom: "12px", padding: "0", lineHeight: "0.1" }}>
        <span style={{ fontWeight: "600" }}>Phone Number</span> : {ph1}
      </p>
    )}
    { name2 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "1" }}>
        <span style={{ fontWeight: "600" }}>Name</span> : {name2}
      </p>
    )}
    { ph2 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "1" }}>
      <span style={{ fontWeight: "600" }}>Phone Number</span> :{ph2}
    </p>    
    )}
  </div>
)}
            </div>
            
            <div className="inline-flex w-full items-center gap-2">
              <div className="mr-auto">
                
                <h2 className="font-semibold text-lg">Invite your friends</h2>
                <p className="text-xs text-neutral-500 font-grostek">
                  and enjoy a shared experience!
                </p>
              </div>
              {shareLinks?.map((link, index) => (
                
                <a
                  href={link?.share(
                    `${window.location.origin}${pathname}`,
                    title
                  )}
                  target="_blank"
                  title={`Share on ${link?.title}`}
                  className={`border flex items-center justify-center rounded-full p-2 text-xl hover:scale-125 transition-all text-white bg-gradient-to-br ${link?.color}`}
                >
                  {link?.icon}
                </a>
              ))}
              
         </div>

          </div>
          {medium === "offline" && webyurl ? (
  <button 
    onClick={() => window.location.href = webyurl} 
    className="bg-gradient-to-r shadow-xl from-primary to-primary/90 p-5 text-white text-center hover:shadow-md"
    style={{ 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "bold", 
      fontSize: "20px",
      borderRadius: "10px", 
      transition: "background 1s, background-position 0.5s"
    }}
  >
    REGISTER FOR THIS EVENT
  </button>
) : medium === "offline" && lumaurl ? (
  <button 
    onClick={() => window.location.href = lumaurl} 
    className="bg-gradient-to-r shadow-xl from-primary to-primary/90 p-5 text-white text-center hover:shadow-md"
    style={{ 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "bold", 
      fontSize: "20px",
      borderRadius: "10px", 
      transition: "background 1s, background-position 0.5s"
    }}
  >
    REGISTER FOR THIS EVENT
  </button>
) : medium === "online" && meet[0] ? (
  <button 
    onClick={() => window.location.href = meet[0]} 
    className="bg-gradient-to-r shadow-xl from-primary to-primary/90 p-5 text-white text-center hover:shadow-md"
    style={{ 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "bold", 
      fontSize: "20px",
      borderRadius: "10px", 
      transition: "background 1s, background-position 0.5s"
    }}
  >
    REGISTER FOR THIS EVENT
  </button>
) : (
  <button 
    className="bg-gradient-to-r shadow-xl from-red-500 to-black p-5 text-white text-center hover:shadow-md"
    style={{ 
      width: "100%", 
      textAlign: "center", 
      fontWeight: "bold", 
      fontSize: "20px",
      borderRadius: "10px", 
      transition: "background 1s, background-position 0.5s"
    }}
  >
    REGISTRATIONS ARE CLOSED
  </button>
)}


{insta && window.innerWidth <= 768 && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <InstagramEmbed url={insta} width={550}/>
  </div>
)}

          <h2 className="font-semibold py-2 border-b border-neutral-300 text-lg">
            About
          </h2>
          <div className="display-linebreak text-neutral-800 text-sm font-grostek">
            {description}
          </div>
          {lumaurl && (
  <div sty>
    <iframe
      src={lumaurl}
      frameborder="0"
      aria-hidden="false"
      tabindex="0"
      style={{borderRadius: "20px",height:"550px",width:"100%" }}
    ></iframe>
  </div>
)}
          {tnc && (
  <>
    <h2 className="font-semibold py-2 border-b border-neutral-300 text-lg">
      Terms and Conditions
    </h2>
    <div className="display-linebreak text-neutral-800 text-sm font-grostek">
      {tnc
        .split("\n\n") // Split by double line breaks to separate sections
        .map((section, index) => (
          <div key={index} className="mb-4">
            {section
              .split("\n") // Split each section by single line breaks
              .map((line, index) => (
                <p key={index}>{line}</p> // Render each line as a paragraph
              ))}
          </div>
        ))}
    </div>
  </>
)}


        </div>
        <div className="col-span-2 hidden md:block w-full space-y-4">
          <div className="rounded-lg flex flex-col gap-4 outline w-full  outline-1 outline-neutral-300 p-6">
            <h2 className="font-bold text-xl">{title}</h2>
            <h3 className="font-bold">
  <span style={{ display: "flex", alignItems: "center" }}>
    {usernamee}
    <MdVerified style={{ color: "#17c3ff", marginLeft: "3px" }} />
  </span>
</h3>

            <h2 className="inline-flex items-center gap-2 text-sm">
              <IoBookmarkOutline /> {category}
            </h2>
            {duration?.length > 0 && (
              <h2 className="inline-flex items-center gap-2 text-sm">
                <IoTimerOutline /> {duration.split(":").join("h ")}
              </h2>
            )}
            {language?.length > 0 && (
              <h2 className="inline-flex items-center gap-2 text-sm">
                <IoLanguageOutline /> {language}
              </h2>
            )}
            {medium?.length > 0 && (
  <h2 className="inline-flex items-center gap-2 text-sm">
    <IoMegaphoneOutline /> {medium.charAt(0).toUpperCase() + medium.slice(1)}
  </h2>
)}
{maxParticipants && (
  <h2 className="inline-flex items-center gap-2 text-sm">
    <IoPeople />Available Seats : {maxParticipants}
  </h2>
)}

            <h2 className="inline-flex items-center gap-2 text-sm">
              <IoCalendarClearOutline /> {startDay}, {startTime}
              {startDay === endDay && ` to ${endTime}`}
            </h2>
            {startDay !== endDay && endDate && endDay && (
              <h2 className="inline-flex items-center gap-2 text-sm">
                <IoBookmarkOutline /> {endDay}, {endTime}
              </h2>
            )}
            <h2 className="inline-flex flex-wrap items-center gap-2 text-sm">
              {medium === "offline" ? (
                <>
                  <IoLocationOutline />
                  <span className="flex-1">{location[0]}</span>
                  <iframe
                    title="map"
                    className="w-full h-max outline outline-1 outline-neutral-300 shadow-md rounded-lg flex-1 mt-2"
                    src={`https://maps.google.com/maps?q=${location[1]},${location[2]}&hl=en&output=embed`}
                  ></iframe>
                </>
              ) : (
                <>
                  <MdComputer />
                  <span className="overflow-hidden whitespace-nowrap">{meet[0] || "Online"}</span>
                </>
              )}
            </h2>
{ (name1 || ph1 || name2 || ph2) && (
  <div className="rounded-lg flex flex-col gap-4 outline w-full outline-1 outline-neutral-300 p-6">
    <h2 className="font-bold text-md">Contact Details</h2>
    { name1 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "1" }}>
        <span style={{ fontWeight: "600" }}>Name</span> : {name1}
      </p>
    )}
    { ph1 && (
      <p style={{ fontSize: "14px", marginBottom: "12px", padding: "0", lineHeight: "0.1" }}>
        <span style={{ fontWeight: "600" }}>Phone Number</span> : {ph1}
      </p>
    )}
    { name2 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "1" }}>
        <span style={{ fontWeight: "600" }}>Name</span> : {name2}
      </p>
    )}
    { ph2 && (
      <p style={{ fontSize: "14px", margin: "0", padding: "0", lineHeight: "0.1" }}>
        <span style={{ fontWeight: "600" }}>Phone Number</span> : {ph2}
      </p>
    )}
  </div>
)}

            <div className="inline-flex items-center justify-between w-full">
              <h2 className="inline-flex items-center gap-2 font-extrabold font-grostek text-xl mt-2">
                <IoWalletOutline />{" "}
                {price <= 0 ? (
                  "Free"
                ) : (
                  <>
                    <MdCurrencyRupee />
                    {price}
                  </>
                )}
              </h2>

              <RSVPBtn />
              
            </div>
          </div>
          <div className="inline-flex w-full items-center gap-2">
  <div className="mr-auto">
    <h2 className="font-semibold text-lg">Invite your friends</h2>
    <p className="text-xs text-neutral-500 font-grostek">
      and enjoy a shared experience!
    </p>
  </div>
  {shareLinks?.map((link, index) => (
    <a
      href={link?.share(`${window.location.origin}${pathname}`, title)}
      target="_blank"
      title={`Share on ${link?.title}`}
      rel="noopener noreferrer"
      className={`border flex items-center justify-center rounded-full p-2 text-xl hover:scale-125 transition-all text-white bg-gradient-to-br ${link?.color}`}
      key={index}
    >
      {link?.icon}
    </a>
  ))}
  
</div>
{insta && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <InstagramEmbed url={insta} width={550}/>
  </div>
)}

{facebooker && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <FacebookEmbed url={facebooker} width={550} />
  </div>
)}

        </div>
      </div>
    </section>
  );
}

export default EventPage;