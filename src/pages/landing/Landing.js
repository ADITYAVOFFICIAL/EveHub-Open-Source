import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GooglePlayButton } from "react-mobile-app-button";
import FutureUpdatesBackground from "../../assets/images/cardy.gif";
import OneBackground from "../../assets/images/b1.gif";
import TwoBackground from "../../assets/images/b2.gif";
import Card from "../../components/Card";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import apk from "../../assets/evehub.apk"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  IoArrowBack,
  IoArrowForward,
  IoCreateOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { MdOutlinePrivacyTip} from "react-icons/md";
import WelcomeBackground from "../../assets/images/welbag.gif";
import WelcomeBackgroundMobile from "../../assets/images/cardy.gif";
import Security from "../../assets/images/hero.png";
const data = [
  {
    title: <span style={{ color: "white" }}>Event Creation Made Easy</span>,
    description: (
      <span style={{ color: "white" }}>
        Effortlessly bring your events to life with our seamless event creation and management feature. Specify crucial details like date, time, location, and captivating descriptions to paint a vivid picture for your attendees. Tailor event settings, upload stunning images, and configure ticketing options with absolute ease. It's your vision, simplified and elevated.
      </span>
    ),
    icon: <IoCreateOutline  style={{ color: "white" }}/>,
    backgroundImage: OneBackground,
  },  
  {
    title: "Flexible Event Privacy",
    description:
      "Take control over event visibility with our private and public event options. Host private gatherings with exclusive access for selected participants or organize public events to reach a wider audience. Customize privacy settings to suit the unique needs of each event.",
    icon: <MdOutlinePrivacyTip />,
    backgroundImage: TwoBackground,
  },
  {
    title: "Future Updates",
    description:
      "Over time, we'll enhance the website with diverse features and user interface upgrades. We'll actively gather feedback from both organizers and end users to ensure continual improvements, creating a more dynamic and user-friendly online experience.",
    icon: <IoNotificationsOutline />,
    backgroundImage: FutureUpdatesBackground,
    className: "text-white",
    alt:"Black wavy thing smooth"
  }
];

function Landing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    Website_Origin:"EveHub",
  });
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");

  // Define options for dropdown menus
  const dropdownOptions1 = ["Organiser", "Student", "Other"];
  const dropdownOptions2 = ["Feature", "Error", "Design","Other"];

  // Handle change in dropdown 1
  const handleDropdown1Change = (e) => {
    setDropdown1Value(e.target.value);
  };
  const APKUrl = apk;
  
  // Handle change in dropdown 2
  const handleDropdown2Change = (e) => {
    setDropdown2Value(e.target.value);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Capitalize the first letter of each field name
      const capitalizedFormData = {};
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          capitalizedFormData[capitalizedKey] = formData[key];
        }
      }
      capitalizedFormData["Type of User"] = dropdown1Value;
      capitalizedFormData["Domain"] = dropdown2Value;
  
      const response = await fetch(process.env.REACT_APP_FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(capitalizedFormData),
      });
  
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          Website_Origin: "EveHub",
          name: "",
          email: "",
          message: "",
        });
        setDropdown1Value("");
        setDropdown2Value("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
    }
  };
  
  
  const swiperRef = useRef(null);

  // const token = JSON.parse(localStorage.getItem("token"));

  const isMobile = window.innerWidth <= 768; 

  return (
    <div className="flex-1 bg-white font-poppins select-none">
      <div className="bg-secondary" style={{ borderRadius: "0 0 25px 25px" }}>
        <section
          className="flex flex-col text-center w-full items-center py-8 lg:py-16 justify-center gap-8 md:gap-0 container min-h-[94vh] relative"
          style={{
            backgroundImage: `url(${isMobile ? WelcomeBackgroundMobile : WelcomeBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'fill',
            borderRadius:"25px 25px 20px 20px ",
          }}
        >
          {/* <Link
  to={""}
  className="bg-white shadow-xl from-primary to-primary/90 p-4 text-black text-center sm:text-xs md:text-base lg:text-lg lg:my-4"
  style={{ borderRadius: "12px", fontWeight: "bold", maxWidth: "90%", width: "100%", lineHeight: "1", padding: "8px 16px" }}
>
  ✅ 💬 Please share the link to EveHub to help promote the website once it's launched 💬 ✅
</Link>

<Link
  to={""}
  className="bg-white shadow-xl from-primary to-primary/90 p-4 text-black text-center sm:text-xs md:text-base lg:text-lg"
  style={{ borderRadius: "12px", fontWeight: "bold", maxWidth: "90%", width: "100%", lineHeight: "1", padding: "8px 16px" }}
>
  🔔 Website will launch on 8 Feb 11:00AM IST 🔔
</Link> */}

          <div
            className="flex flex-col gap-4 items-center justify-center z-10"
            style={{ flexBasis: "50%" }}
          >
            <h1 className=" text-2xl md:text-4xl lg:text-6xl text-slate-100 font-bold leading-relaxed lg:leading-normal drop-shadow-2xl">
              Welcome to EveHub
              <br />
              Your Events, Our Platform
            </h1>
            <p></p>
            {/* <div className="inline-flex items-center gap-2">
              <Link
                to={"/explore"}
                className="bg-gradient-to-r shadow-xl from-primary to-primary/90 p-4 text-white text-center"
                style={{ borderRadius: "12px", fontWeight:"bold"}}
              >
                Explore Events
              </Link>
            </div> */}
            <div class="w-full h-40 flex items-center justify-center">
          <a href="/explore" class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-56 group-hover:h-56 md:bg-blue-500"></span>
            <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span class="relative" style={{fontWeight:"bold"}}>Explore EveHub</span>
          </a>
        </div>
        <div>
      <GooglePlayButton
        url={APKUrl}
        theme={"dark"}
      />
    </div>
        <Link
  to={""}
  className="bg-black shadow-xl from-primary to-primary/90 p-4 text-white text-center sm:text-xs md:text-base lg:text-lg"
  style={{ borderRadius: "12px", fontWeight: "bold", maxWidth: "90%", width: "60%", lineHeight: "1", padding: "8px 16px" }}
>
  Developed and maintained by ADITYA VERMA
</Link>
          </div>
          <div className=" w-full relative"></div>
        </section>
      </div>
      <section className="flex flex-col-reverse lg:flex-row-reverse w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
        <div className="" style={{ flexBasis: "55%" }}>
          <img alt="Club/Dept Images" className="w-full" src={Security} style={{borderRadius:"25px"}}/>
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pr-16"
          style={{ flexBasis: "50%" }}
        >
          <p className="text-accent tracking-[1px] font-bold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr> Onboarded Members
          </p>
          <hr className="w-full border border-neutral-200"></hr>
          <ol className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-700 text-justify" style={{ fontWeight: "bold" }}>
  <li className="mb-2">1. Data Science Community SRM</li>
  <li className="mb-2">2. The Product House x SRMIST</li>
  <li className="mb-2">3. Aerospace Systems Research Laboratory </li>
  <li className="mb-2">4. Newton School Coding Club SRM </li>
  <li className="mb-2">5. Liftoff </li>
  <li className="mb-2">6. Hybrutos Racing </li>
  <li className="mb-2">7. ACM SIGKDD Student Chapter </li>
  </ol>
        </div>
      </section>
       {/* <section className="flex flex-col-reverse  lg:flex-row w-full py-8 md:py-16 justify-between gap-8 md:gap-0 container">
        <div className="md:pt-16 " style={{ flexBasis: "50%" }}>
          <img className="w-full" src={Hero2} />
        </div>
        <div
          className="flex flex-col gap-4 items-start justify-evenly text-left py-8 lg:pl-16"
          style={{ flexBasis: "50%" }}
        >
          <p className="text-accent tracking-[1px] font-semibold items-center gap-2 flex">
            <hr className="w-20 h-1 bg-accent"></hr>
          </p>
          <h1 className="text-3xl md:text-5xl text-primary font-semibold md:leading-normal">
            Promoted Events
          </h1>
          <hr className="w-full border border-neutral-200"></hr>
          <p className="text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-neutral-500 text-justify">
            Promoted Event description
          </p>
          <Link
                to=''
                className="bg-gradient-to-b shadow-xl focus:ring-accent from-accent to-accent/90 p-4 text-white text-center"
                style={{ borderRadius: "12px" }}
              >
                {token ? "[ PAID FEATURE ]" : "[ PAID FEATURE ]"}
              </Link>
        </div>
      </section>  */}
      <div className="bg-gradient-to-b from-secondary from-100% to-50% to-white pb-10" style={{ borderRadius: "25px 25px 0 0" }}>
        {/* <section className="flex flex-col lg:flex-row w-full items-center py-8 lg:pt-16 lg:pb-0 justify-between gap-4 md:gap-0 container">
          <div className="flex flex-row gap-16">
            <div className="flex-[80%] space-y-4">
              <p className="text-accent tracking-[1px] font-semibold  items-center gap-2 flex">
                <div className="w-20 h-1 bg-accent"></div> About
              </p>
              <h1 className="text-3xl md:text-5xl text-white font-semibold md:leading-normal">
                Seamless Event Planning and Organization
              </h1>
            </div>
          </div>
          <p className="flex-[80%] w-full text-sm leading-[1.4rem] md:max-w-[90%] py-4 text-slate-400 text-justify">
          Bid farewell to the hassles of event planning. Our intuitive interface streamlines the process, freeing you to concentrate on your creative pursuits. Seamlessly create and oversee events—from scheduling dates and venues to crafting event details and ticketing choices. Simplify your planning journey and transform your vision into reality.
          </p>
        </section> */}
        {/* <div className="flex flex-row gap-4 items-center justify-between container">
          <hr className="w-full  border border-neutral-200 opacity-30"></hr>
          <div className="inline-flex flex-[50%] gap-4 justify-end items-center">
            <button
              onClick={() => {
                swiperRef.current.swiper.slidePrev();
              }}
              className="text-white p-4 rounded-full outline outline-1 outline-white hover:bg-primary hover:outline-none transition-all"
            >
              <IoArrowBack />
            </button>
            <button
              onClick={() => {
                swiperRef.current.swiper.slideNext();
              }}
              className="text-white p-4 rounded-full bg-accent"
            >
              <IoArrowForward />
            </button>
          </div>
        </div> */}
        {/* <Swiper
          ref={swiperRef}
          modules={[Navigation]}
          spaceBetween={50}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 50,
            },
            820: {
              slidesPerView: 2.5,
              spaceBetween: 50,
            },
            960: {
              slidesPerView: 2.8,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 80,
            },
          }}
        >
          {data.map((item) => (
            <SwiperSlide>
              <Card {...item} />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      <div className="flex-1 bg-secondary font-poppins select-none">    
        <section className="container py-8">
          <h2 className="text-3xl font-semibold mb-4" style={{ color: "white" }}>Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="Website Origin" value="EveHub" />

            <div>
              <label htmlFor="name" className="block mb-1" style={{ color: "white" }}>👾 Name</label>
              <input
              placeholder="Bhupendra Jogi"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2"
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1" style={{ color: "white" }}>📧 Email</label>
              <input
              placeholder="bhupendra@jogi.com"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2"
                style={{ borderRadius: "12px" }}
              />
            </div>
            <div>
              <label htmlFor="dropdown1" className="block mb-1" style={{ color: "white" }}>👨🏼‍🦼 Type of user</label>
              <select
                id="dropdown1"
                name="dropdown1"
                value={dropdown1Value}
                onChange={handleDropdown1Change}
                required
                className="w-full border px-3 py-2"
                style={{ borderRadius: "12px" }}
              >
                <option value="">Select an option</option>
                {dropdownOptions1.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dropdown2" className="block mb-1" style={{ color: "white" }}>🥷🏼 Domain</label>
              <select
                id="dropdown2"
                name="dropdown2"
                value={dropdown2Value}
                onChange={handleDropdown2Change}
                required
                className="w-full border px-3 py-2"
                style={{ borderRadius: "12px" }}
              >
                <option value="">Select an option</option>
                {dropdownOptions2.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-1" style={{ color: "white" }}>💬 Message</label>
              <textarea
              placeholder="Share your grievances or appreciation here"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2"
                style={{ borderRadius: "12px", height: "250px" }}
              ></textarea>
            </div>    
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 hover:bg-primary-dark transition-colors"
              style={{ borderRadius: "12px", height: "55px" }}
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Landing;
