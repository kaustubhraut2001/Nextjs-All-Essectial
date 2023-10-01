"use client";

import React from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

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
  return (
    <>
      <h1>Profile Page</h1>
      <p>Profile Page</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default page;
