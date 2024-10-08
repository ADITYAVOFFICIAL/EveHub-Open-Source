import Border from "../assets/images/eventCard.png";
import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdComputer } from "react-icons/md";
import imageCompression from 'image-compressor';
import { useState, useEffect } from "react";

const compressImage = async (file) => {
  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1, // Adjust the maximum size as needed
      maxWidthOrHeight: 1920, // Adjust the maximum width or height as needed
    });
    return compressedFile;
  } catch (error) {
    console.error('Image compression error:', error);
    return file; // Return the original file if compression fails
  }
};

const EventCard = ({
  event: { title, description, category, image, location, $id, medium, startDate, endDate, usernamee, maxParticipants },
}) => {
  const [compressedImage, setCompressedImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const compressedFile = await compressImage(image);
        setCompressedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    };
    fetchImage();
  }, [image]);

  return (
    <Link to={`/dashboard/event/${$id}`} className="bg-slate-900 overflow-hidden text-slate-400 p-2 rounded-[18px] mr-2 outline outline-1 outline-none shadow-sm hover:shadow-lg transition-all">
      <div className="relative ">
        {compressedImage && (
          <img
            alt="event"
            className="w-full rounded-[18px] h-48 object-cover "
            src={compressedImage}
          />
        )}
        <div className=" w-max absolute  left-0 top-0 flex flex-row justify-between ">
          <div>
            <p className="bg-slate-900 p-2 px-4 rounded-tl-[8px] rounded-br-[18px]">
              {category}
            </p>
            <img alt="" className="w-4 h-4 object-cover " src={Border} />
          </div>
            <img alt="" className="w-4 h-4 object-cover " src={Border} />
        </div>
        <div className=" w-max absolute  right-0 bottom-0 flex flex-row items-end justify-end ">
            <img alt="" className="w-4 h-4 object-cover rotate-180 " src={Border} />
          <div className='flex flex-col items-end '>
            <img alt="" className="w-4 h-4 object-cover rotate-180 " src={Border} />
            <p className="bg-slate-900 p-2 px-4 rounded-tl-[18px] rounded-br-[12px] inline-flex items-center gap-1">
              {medium === 'offline' ? <IoLocation />: <MdComputer />}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 p-2 ">
        <div className="flex flex-col items-start md:max-w-[75%] lg:max-w-[78%] xl:max-w-[80%] ">
          <p className="text-xl font-bold text-slate-400">{title}</p>
          <p className="text-xl font-bold text-slate-400">{usernamee}</p>
          <p className="text-xs text-slate-400 line-clamp-5 pt-2">{description}</p>
        </div>
        <div className="flex md:flex-col gap-2  items-center md:items-end h-full justify-evenly">
          <p>{new Date(startDate?.split('+')[0]).toTimeString().slice(0,5)}</p>
          <p className="text-xs text-slate-400">{new Date(startDate?.split('+')[0]).toDateString().slice(4)}</p>
          <hr className="w-[1px] h-full md:w-full md:h-[1px]"></hr>
          <p>{new Date(endDate?.split('+')[0]).toTimeString().slice(0,5)}</p>
          <p className="text-xs text-slate-400">{new Date(endDate?.split('+')[0]).toDateString().slice(4)}</p>
          <p className="text-xs text-slate-400">{maxParticipants}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
