"use client";
import Link from "next/link";
import React, {  useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";


const page = () => {
  const [user, setUser] = useState({

    email: "",
    password: "",
  });
  const router = useRouter();


  const onlogin = async () => {
    try{
        const res = await axios.post('/api/users/login', user);
        console.log(res.data);
        router.push('/profile');



    }catch(err :any){
        console.log(err);


    }


  };


    // useEffect(()=>{
    //     if(user.email && user.password){
    //         axios.post('http://localhost:3000/api/login', user)
    //         .then((res)=>{
    //             console.log(res.data);
    //             if(res.data){
    //                 Router.push('/home');
    //             }
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })

    //     }
    // }, []);




  return (
    <>
      <div>Login page</div>
      <hr />

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

      <button onClick={onlogin}>Login</button>

      <Link href="/signup">Signup</Link>
    </>
  );
};

export default page;
