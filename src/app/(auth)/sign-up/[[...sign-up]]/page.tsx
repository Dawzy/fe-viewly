"use client"

import { SignUp } from "@clerk/nextjs";
import { useEffect } from "react";

const SignUpPage = () => {
  // Remove disclaimer cookie
  useEffect(() => {
    if (localStorage.getItem("disclaimer"))
      localStorage.removeItem("disclaimer");
  }, []);
  
  return <SignUp />;
}

export default SignUpPage;