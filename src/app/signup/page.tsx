"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",

  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const[loadding , setLoading] = useState(false);
  useEffect(() => {
    if (user.username.length && user.password && user.email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onsignup = async () => {

    try{
      setLoading(true);
      const res = await axios.post('/api/users/signup',user);
      console.log(res);
      setLoading(false);
      router.push('/login');

    }catch(err){
      console.log(err);

    }finally{
      setLoading(false);
    }

  };
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

      <button onClick={onsignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>

      <Link href="/login">login</Link>
    </>
  );
};

export default page;
