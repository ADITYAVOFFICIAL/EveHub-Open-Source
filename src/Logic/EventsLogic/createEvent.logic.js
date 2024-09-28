import { useState, useEffect, useRef, useCallback } from "react";
import client from "../../appwrite.config";
import { Databases, Storage, ID, Teams } from "appwrite";
import { categories } from "./categories";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../context/userContext";

function CreateEventLogic() {
  const { userInfo, setUserInfo } = useUser();
  const {
    name: userName,
  } = userInfo;
  const [validateMessage, setValidateMessage] = useState(null);
  const [signingin, setSigningin] = useState(false);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  


  

  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [title, setTitle] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [ph1, setPh1] = useState("");
  const [ph2, setPh2] = useState("");
  const [usernamee, setName] = useState(userName);
  const [webyurl, setWebyurl] = useState("");
  const [insta, setInsta] = useState("");
  const [lumaurl, setLumaurl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(null);
  const [language, setLanguage] = useState(null);
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [category, setCategory] = useState("");
  const [medium, setMedium] = useState("offline");
  const [meetLink, setMeetLink] = useState("");
  const [meetId, setMeetId] = useState("");
  const [meetPassword, setMeetPassword] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [fetchedDoc, setFetchedDoc] = useState(null);
  const [fetchingDoc, setFetchingDoc] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [tnc, setTnc] = useState(null);
  const [acceptingAttendance, setAcceptingAttendance] = useState(false);
  const [acceptingRsvp, setAcceptingRsvp] = useState(false);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageError("");
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getEventById = useCallback(async () => {
    try {
      setFetchingDoc((prev) => true);
      const database = new Databases(client);
      const response = await database.getDocument(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_EVENTS_COLLECTION_ID,
        id
      );
      
      const {
        title,
        ph1,
        ph2,
        name1,
        name2,
        usernamee,
        price,
        webyurl,
        insta,
        lumaurl,
        description,
        location,
        startDate,
        endDate,
        maxParticipants,
        category,
        medium,
        meet,
        privacy,
        image,
        imageId,
        duration,
        language,
        tnc,
        acceptingAttendance,
        acceptingRsvp
      } = response;
      setFetchedDoc((prev) => response);
      setTitle((prev) => title);
      setName1((prev) => name1);
setName2((prev) => name2);
setPh1((prev) => ph1);
setPh2((prev) => ph2);
      setName((prev) => userName);
      setPrice((prev) => price);
      setDescription((prev) => description);
      setLocation((prev) => location[0]);
      setLatitude((prev) => location[1]);
      setLongitude((prev) => location[2]);
      setStartDate((prev) => startDate?.split("+")[0]);
      setEndDate((prev) => endDate?.split("+")[0]);
      setDuration((prev) => duration);
      setLanguage((prev) => language);
      setMaxParticipants((prev) => maxParticipants);
      setCategory((prev) => category);
      setMedium((prev) => medium);
      setMeetLink((prev) => meet[0]);
      setWebyurl((prev) => webyurl);
      setInsta((prev)=>insta);
      setLumaurl((prev) => lumaurl);
      setMeetId((prev) => meet[1]);
      setMeetPassword((prev) => meet[2]);
      setPrivacy((prev) => privacy);
      setImage((prev) => image);
      setImagePreview((prev) => image);
      setImageId((prev) => imageId);
      setTnc((prev) => tnc);
      setAcceptingAttendance((prev) => acceptingAttendance);
      setAcceptingRsvp((prev) => acceptingRsvp);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFetchingDoc((prev) => false);
    }
  }, [id]);

  useEffect(() => {
    if (id) getEventById();
  }, [getEventById]);

  const getUpdatedValues = (value) => {
    const updatedObj = {};
    if (value.title !== fetchedDoc?.title) {
      updatedObj.title = title;
    }
    if (value.name1 !== fetchedDoc?.name1) {
      updatedObj.name1 = name1;
    }
    if (value.name2 !== fetchedDoc?.name2) {
      updatedObj.name2 = name2;
    }
    if (value.ph1 !== fetchedDoc?.ph1) {
      updatedObj.ph1 = ph1;
    }
    if (value.ph2 !== fetchedDoc?.ph2) {
      updatedObj.ph2 = ph2;
    }
    if (value.webyurl !== fetchedDoc?.webyurl) {
      updatedObj.webyurl = value.webyurl;
    }   
    if (value.insta !== fetchedDoc?.insta) {
      updatedObj.insta = value.insta;
    }  
    if (value.lumaurl !== fetchedDoc?.lumaurl) {
      updatedObj.lumaurl = value.lumaurl;
    }   
    if (value.usernamee !== fetchedDoc?.usernamee) {
      updatedObj.usernamee = usernamee;
    }
    if (value.price !== fetchedDoc?.price) {
      updatedObj.price = price;
    }
    if(value?.acceptingAttendance !== fetchedDoc?.acceptingAttendance) {
      updatedObj.acceptingAttendance = acceptingAttendance;
    }
    if(value?.acceptingRsvp !== fetchedDoc?.acceptingRsvp) {
      updatedObj.acceptingRsvp = acceptingRsvp;
    }
    if (value.tnc !== fetchedDoc?.tnc) {
      updatedObj.tnc = tnc;
    }
    if (value.description !== fetchedDoc?.description) {
      updatedObj.description = description;
    }
    if (
      new Date(value.startDate).toUTCString() !==
      new Date(fetchedDoc?.startDate?.split("+")[0]).toUTCString()
    ) {
      updatedObj.startDate = startDate.length > 0 ? startDate : null;
    }
    if (
      new Date(value.endDate).toUTCString() !==
      new Date(fetchedDoc?.endDate?.split("+")[0]).toUTCString()
    ) {
      updatedObj.endDate = endDate?.length > 0 ? endDate : null;
    }
    if (value?.maxParticipants !== fetchedDoc?.maxParticipants) {
      updatedObj.maxParticipants = maxParticipants;
    }
    if(value?.duration !== fetchedDoc?.duration) {
      updatedObj.duration = duration;
    }
    if(value?.language !== fetchedDoc?.language) {
      updatedObj.language = language;
    }
    if (value.category !== fetchedDoc?.category) {
      updatedObj.category = category;
    }
    if (value.privacy !== fetchedDoc?.privacy) {
      updatedObj.privacy = privacy;
    }
    if (value.imageId !== fetchedDoc?.imageId) {
      updatedObj.imageId = value.imageId;
      updatedObj.image = value.image;
    }
    if (value.medium !== fetchedDoc?.medium) {
      updatedObj.medium = medium;
    }
    updatedObj.location = value.location;
    updatedObj.meet = value.meet;
    return updatedObj;
  };

  const handleCreateEvent = async (e) => {
    e?.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    
    setSigningin((prev) => true);
    setValidateMessage((prev) => null);
    try {
      const formattedDescription = description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (lumaurl.trim() !== "" && !lumaurl.startsWith("https://lu.ma/embed")) {
      throw new Error("Luma URL must start with 'https://lu.ma/embed'.");
    }
      if (!title) {
        throw new Error("Please provide a title for your event.");
      }
      if (!description) {
        throw new Error("Please provide a description for your event.");
      }
      if (!usernamee) {
        throw new Error("Please provide a club / department name");
      }
      // if (!price) {
      //   throw new Error("Enter price, if free enter 0");
      // }
      if (!privacy) {
        throw new Error("Please provide a privacy for your event.");
      }
      if (!startDate) {
        throw new Error("Please provide a start date for your event.");
      }
      if (endDate) {
        if (new Date(endDate) < new Date(startDate)) {
          throw new Error("End date cannot be before start date.");
        }
      }
      if (!category) {
        throw new Error("Please provide a category for your event.");
      }
      if (medium === "offline") {
        if (!location) {
          throw new Error("Please provide a location for your event.");
        }
        // if (!latitude) {
        //   throw new Error("Please provide a latitude for your event.");
        // }
        // if (!longitude) {
        //   throw new Error("Please provide a longitude for your event.");
        // }
      }
      // if (medium === "online") {
      //   if (!meetLink) {
      //     throw new Error("Please provide a meeting link for your event.");
      //   }
      //   if (!meetId) {
      //     throw new Error("Please provide a meeting id for your event.");
      //   }
      // }
      if (image === null) {
        throw new Error("Please provide an image for your event.");
      }
      try {
        let uploadedFile, filePreviewUrl;
        const storage = new Storage(client);
        if (typeof image !== "string") {
          if (fetchedDoc?.imageId) {
            const deletedFile = await storage.deleteFile(
              process.env.REACT_APP_IMAGES_BUCKET_ID,
              fetchedDoc?.imageId
            );
            
          }
          uploadedFile = await storage.createFile(
            process.env.REACT_APP_IMAGES_BUCKET_ID,
            ID.unique(),
            image
          );
          
          filePreviewUrl = await storage.getFilePreview(
            uploadedFile.bucketId,
            uploadedFile.$id
          );
          
        } else if (image === null) {
          const deletedFile = await storage.deleteFile(
            process.env.REACT_APP_IMAGES_BUCKET_ID,
            fetchedDoc?.imageId
          );
          
          filePreviewUrl = null;
        } else {
          filePreviewUrl = image;
        }
        const value = {
          title,
          name1,
          name2,
          ph1,
          ph2,
          usernamee,
          price,
          description,
          medium,
          startDate,
          endDate,
          category,
          maxParticipants: String(maxParticipants).length === 0 ? 0 : maxParticipants,
          location:
  medium === "online"
    ? []
    : [
      String(location),
        latitude ? String(latitude) : "12.821065", // Set latitude to SRM KTR latitude if not provided
        longitude ? String(longitude) : "80.038597", // Set longitude to SRM KTR longitude if not provided
      ],
          meet:
            medium === "offline"
              ? []
              : [String(meetLink), String(meetId), String(meetPassword)],
          privacy,
          createdBy: token.userId,
          image: filePreviewUrl,
          imageId: filePreviewUrl ? uploadedFile?.$id : fetchedDoc?.imageId,
          tnc,
          acceptingAttendance,
          duration,
          webyurl,
          insta,
          language,
          acceptingRsvp,
          lumaurl
        };
        const updatedValues = id ? getUpdatedValues(value) : value;
        
        const databases = new Databases(client);
        const teams = new Teams(client);
        let teamId;
        if (id === undefined || id === null || id === "" || !id) {
          const teamResponse = await teams.create(ID.unique(), title);
          
          teamId = teamResponse.$id;
        }
        const response = id
          ? await databases.updateDocument(
              process.env.REACT_APP_DATABASE_ID,
              process.env.REACT_APP_EVENTS_COLLECTION_ID,
              id,
              updatedValues
            )
          : await databases.createDocument(
              process.env.REACT_APP_DATABASE_ID,
              process.env.REACT_APP_EVENTS_COLLECTION_ID,
              ID.unique(),
              { ...value, teamId }
            );
        
        if(title !== fetchedDoc?.title) {
          const teamNameUpdate = await teams.updateName(teamId, title);
          
        }
        if (!updatedValues.teamId && !fetchingDoc) {
          await getEventById();
      }
        // const updateTeamPreferences = await teams.updatePrefs( teamId, {...fetchedDoc?, ...response } )
        // 
        toast.success(`Event ${id ? "updated" : "created"} successfully`);
        navigate(-1);
      } catch (error) {
        
        setValidateMessage((prev) => error.message);
        toast.error(error.message);
      }
    } catch (err) {
      
      toast.error(err.message);
    } finally {
      setSigningin((prev) => false);
    }
  };


  const inputs = [
    {
      label: "Title",
      placeholder: "Please provide a title for your event.",
      value: title,
      cb: setTitle,
      show: true,
      required: true,
    },
    {
      label: "Enter Club / Department",
      value: usernamee, // Define the corresponding state variable
      placeholder: "Please provide a name for your club / department.",
      cb: setName, // Define the corresponding state-setting function
      show: false, // Show this field always
      required: true, // Make it required if you want
    },
    {
      label: "Enter Cost of participation",
      value: price, // Define the corresponding state variable
      placeholder: "Enter value here. If FREE enter 0",
      cb: setPrice, // Define the corresponding state-setting function
      show: true, // Show this field always
      required: true, // Make it required if you want
    },
    {
      label: "Description",
      value: description,
      placeholder: "Please provide a description of your event.",
      cb: setDescription,
      multiline: true,
      show: true,
      required: true,
      type: "textarea",
    },
    {
      label: "Contact Name 1",
      placeholder: "Please provide a contact person name for your event.",
      value: name1,
      cb: setName1,
      show: true,
    },
    {
      label: "Contact Name 1 Phone Number",
      placeholder: "Please provide a contact person's phone number for your event.",
      value: ph1,
      cb: setPh1,
      show: true,
    },
    {
      label: "Contact Name 2",
      placeholder: "Please provide a contact person name for your event.",
      value: name2,
      cb: setName2,
      show: true,
    },
    {
      label: "Contact Name 2 Phone Number",
      placeholder: "Please provide a contact person's phone number for your event.",
      value: ph2,
      cb: setPh2,
      show: true,
    },
    {
      label: "Privacy",
      value: privacy,
      placeholder: "Please provide a medium for your event.",
      cb: setPrivacy,
      options: [
        {
          label: "Public",
          value: "public",
        },
        {
          label: "Private",
          value: "private",
        },
      ],
      show: true,
      required: true,
    },
    {
      label: "Medium",
      value: medium,
      placeholder: "Please provide a medium for your event.",
      cb: setMedium,
      options: [
        {
          label: "Online",
          value: "online",
        },
        {
          label: "In Person",
          value: "offline",
        },
      ],
      show: true,
      required: true,
    },
    {
      label: "Start Date-Time",
      value: startDate,
      placeholder: "Please provide a start date for your event.",
      cb: setStartDate,
      show: true,
      required: true,
      type: "datetime-local",
    },
    {
      label: "End Date-Time",
      value: endDate,
      placeholder: "Please provide an end date for your event.",
      cb: setEndDate,
      show: true,
      type: "datetime-local",
    },
    {
      label: "Duration",
      value: duration,
      placeholder: "Please provide a duration for your event. [In Hours or Minutes or Days]",
      cb: setDuration,
      show: true,
      type: "string",
    },
    {
      label: "Language",
      value: language,
      placeholder: "Please provide a language for your event.",
      cb: setLanguage,
      show: true,
      type: "string",
    },
    {
      label: "Max Participants",
      value: maxParticipants,
      placeholder:
        "Please provide a maximum number of participants for your event.",
      cb: setMaxParticipants,
      type: "number",
      show: true,
    },
    {
      label: "Category",
      value: category,
      placeholder: "Please provide a category for your event.",
      cb: setCategory,
      show: true,
      options: categories,
      required: true,
    },
    {
      label: "Terms and Conditions",
      value: tnc,
      placeholder: "Please provide terms and conditions for your event.",
      cb: setTnc,
      multiline: true,
      show: true,
      type: "textarea",
    },
    {
      label: "Location Name",
      value: location,
      placeholder: "Please provide a location for your event.",
      cb: setLocation,
      show: medium === "offline",
      required: medium === "offline",
    },
    {
      label: "Latitude",
      value: latitude,
      placeholder: "Please provide a latitude for your event. [DEFAULT WILL BE SET TO SRM KTR LOCATION]",
      cb: setLatitude,
      inputMode: "numeric",
      show: medium === "offline",
    },
    {
      label: "Longitude",
      value: longitude,
      placeholder: "Please provide a longitude for your event. [DEFAULT WILL BE SET TO SRM KTR LOCATION]",
      cb: setLongitude,
      inputMode: "numeric",
      show: medium === "offline",
    },
    {
      label: "Meet Link",
      value: meetLink,
      placeholder: "Please provide a meet link for your event.",
      cb: setMeetLink,
      type: "url",
      show: medium === "online",
    },
    {
      label: "Web URL",
      value: webyurl,
      placeholder: "Please provide a web URL for your event.",
      cb: setWebyurl,
      type: "url",
      show: true, // Show the field always
    },
    {
      label: "Insta Post or Profile URL",
      value: insta,
      placeholder: "Please provide a web URL for your event.",
      cb: setInsta,
      type: "url",
      show: true, // Show the field always
    },
    {
      label: "LUMA EMBED URL",
      value: lumaurl,
      placeholder: "Please provide Luma Embed URL Only.",
      cb: setLumaurl,
      type: "url",
      show: true, // Show the field always
    },     
    {
      label: "Meet ID",
      value: meetId,
      placeholder: "Please provide a meet ID for your event.",
      cb: setMeetId,
      show: medium === "online",
    },
    {
      label: "Meet Password",
      value: meetPassword,
      placeholder: "Please provide a meet password for your event.",
      cb: setMeetPassword,
      show: medium === "online",
    },
    {
      label: "Accepting Attendances",
      value: acceptingAttendance,
      // placeholder: "Please provide a meet password for your event.",
      cb: setAcceptingAttendance,
      show: false,
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
    },
    {
      label: "Accepting RSVPs",
      value: acceptingRsvp,
      // placeholder: "Please provide a meet password for your event.",
      cb: setAcceptingRsvp,
      show: false,
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
    }
  ];

  const removeImage = (e) => {
    e?.preventDefault();
    setImagePreview((prev) => null);
    setImage((prev) => null);
  };

  return {
    inputs,
    validateMessage,
    signingin,
    setSigningin,
    setValidateMessage,
    imageError,
    setImageError,
    fileRef,
    handleCreateEvent,
    handleImage,
    imagePreview,
    setImagePreview,
    setImage,
    removeImage,
    id,
    fetchingDoc,
  };
}
export default CreateEventLogic;
