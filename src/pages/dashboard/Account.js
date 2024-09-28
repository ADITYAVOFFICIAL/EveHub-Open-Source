import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import { MdVerified } from "react-icons/md";
import client from "../../appwrite.config";
import { Account as Ac, Databases, Query } from "appwrite";
import { toast } from "react-hot-toast";
import { useUser } from "../../context/userContext";
import batGif from "../../assets/images/bat.gif"; // Import the bat.gif file

function Account() {
  const [loading, setLoading] = useState(false);
  const [updateFields, setUpdateFields] = useState(false);

  const { userInfo, setUserInfo } = useUser();

  const {
    name: userName,
    email: userEmail,
    phone: userPhone,
    emailVerification,
    phoneVerification,
  } = userInfo;

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState(userPhone);

  const verifyEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const account = new Ac(client);
      const res = await account.createVerification(
        `${process.env.REACT_APP_WEBSITE_URL}/verify-email`
      );

      toast.success("Verification email sent");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      value: name,
      cb: setName,
      disabled: !updateFields,
      required: true,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: email,
      cb: setEmail,
      disabled: true,
      rightIcon: emailVerification ? <Verified /> : <Verify cb={verifyEmail} />,
    },
    {
      label: "Phone",
      type: "tel",
      name: "phone",
      value: phone,
      cb: setPhone,
      disabled: true,
      rightIcon: phoneVerification ? <Verified /> : <Verify />,
    },
  ];

  const revalidateFields = () => {
    const user = JSON.parse(localStorage.getItem("evehub-user"));
    const { name: userName, email: userEmail, phone: userPhone } = user;
    setName(userName);
    setEmail(userEmail);
    setPhone(userPhone);
    setUserInfo(user);
  };

  const handleUpdateFields = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const account = new Ac(client);

      if (name !== userName) {
        const res = await account.updateName(name);

        const databases = new Databases(client);
        const userDoc = await databases.listDocuments(
          process.env.REACT_APP_DATABASE_ID,
          process.env.REACT_APP_USERS_COLLECTION_ID,
          [Query.equal("userId", userInfo.$id)]
        );
        if (userDoc?.documents?.length > 0) {
          const docRes = await databases.updateDocument(
            process.env.REACT_APP_DATABASE_ID,
            process.env.REACT_APP_USERS_COLLECTION_ID,
            userDoc?.documents[0]?.$id,
            {
              name,
            }
          );
        }
        toast.success("Name updated successfully!");

        localStorage.setItem("evehub-user", JSON.stringify(res));
        revalidateFields();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!updateFields) {
      setName(userName);
      setEmail(userEmail);
      setPhone(userPhone);
    }
  }, [updateFields]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full gap-4">
      <h1 className="page-title" style={{ fontSize: "50px", paddingBottom: "10px" }}>YOUR PROFILE PAGE</h1>
      <Avatar size={"text-3xl"} name={userName} />
      <h1 className="page-title">Hello, {userName} 👋🏼</h1>
      <form
        onSubmit={handleUpdateFields}
        className="flex flex-col gap-4 w-full max-w-[400px]"
      >
        {inputFields?.map((field, index) => (
          <Input key={index} {...field} show={true} />
        ))}
        {/* <button
          className="rounded-[18px] bg-black mt-2 p-4 outline outline-1 outline-black text-neutral-300"
          onClick={(e) => {
            e.preventDefault();
            setUpdateFields((prev) => !prev);
          }}
        >
          {updateFields ? "Cancel" : "Edit"}
        </button>
        {updateFields && (
          <Button
            type="submit"
            className="primary-btn"
            style="mt-0"
            text={"Save"}
            disabled={!updateFields}
            loading={loading}
          />
        )} */}
      </form>
      <p style={{ fontWeight: "bold" }}>To change your password send mail to av4923@srmist.edu.in</p>
      <img src={batGif} alt="Bat" className="absolute bottom-0 left-0 w-30 h-auto animate-bat" />
    </div>
  );
}

export default Account;

function Verified() {
  return (
    <p className="bg-green-600 rounded-[10px] p-2 py-1 inline-flex text-white gap-1 items-center">
      <MdVerified /> Verified
    </p>
  );
}

function Verify({ cb }) {
  return (
    <button onClick={cb} className="primary-btn">
      Verify
    </button>
  );
}
