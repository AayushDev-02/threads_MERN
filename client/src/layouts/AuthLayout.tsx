import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full">
        <Navbar/>
        {children}
    </div>
  )
}

export default AuthLayout
