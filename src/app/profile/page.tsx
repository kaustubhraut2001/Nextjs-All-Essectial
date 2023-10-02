"use client";

import React, { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const log = await axios.get("/api/users/logout");
      router.push("/login");
      console.log(log);
    } catch (error: any) {
      console.log(error);
    }
  };
  const [data, setData] = useState();

  const getuserdetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data._id);
    console.log(res.data);
  };
  return (
    <>
      <h1>Profile Page</h1>
      <p>Profile Page</p>

      <h4>
        {data === "nothing" ? (
          "No Data"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h4>

      <button onClick={logout}>Logout</button>

      <button onClick={getuserdetails}>GetUser Details</button>
    </>
  );
};

export default page;
