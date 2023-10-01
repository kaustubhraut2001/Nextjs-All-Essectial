"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const page = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const onsignup = async () => {};
  return (
    <>
      <div>Signup page</div>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={user.username}
        type="text"
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Username"
      />

      <label htmlFor="email">email</label>
      <input
        id="email"
        value={user.email}
        type="text"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        id="username"
        value={user.password}
        type="text"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
      />

      <button onClick={onsignup}>signup</button>

	  <Link href="/login">login</Link>
    </>
  );
};

export default page;
