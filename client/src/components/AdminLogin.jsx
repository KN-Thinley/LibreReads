import React, { useState } from "react";
import { TextField, Grid } from "@mui/material";
import axios from "axios";
import AdminLoginNav from "./AdminLoginNav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/login", {
        username,
        password,
      });
      
      if (response.data) {
        window.setTimeout(() => {
            navigate("/admin/home");
        },3000)
        toast.success("Admin logged in successfully");
        // Redirect or handle successful admin login here
      } else {
        console.log("Invalid credentials");
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error during login");
    }
  };

  return (
    <>
    
      <AdminLoginNav />
      <form className={"flex flex-col p-20"} noValidate autoComplete="off">
        <h1 className="font-sans font-bold text-4xl text-center pb-12 uppercase">
          Admin Login
        </h1>
        <Grid
          container
          direction="column"
          alignItems="center"
          className="gap-4"
        >
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            className="w-1/3"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            className="w-1/3"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-1/3 border border-[#82ca9f] bg-[#82ca9f] font-sans uppercase py-2 rounded-sm hover:border-[#82ca9f]  hover:bg-white hover:delay-75 hover:transition-all hover:duration-100 shadow-lg"
          onClick={handleLogin}
          >
            Login
          </button>
        </Grid>
      </form>
    </>
  );
};

export default AdminLogin;
