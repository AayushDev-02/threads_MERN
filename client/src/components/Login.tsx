import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { profileState, userState } from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const isLoginDisabled = !email || !password;
  const setProfile = useSetRecoilState(profileState);
  const setUser = useSetRecoilState(userState)



  const handleLogin = async () => {
    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post("http://localhost:3000/auth/login", data);

      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token);
        setUser(res.data.user);
        

        //check if profile is present ?
        
          const res2 = await axios.get("http://localhost:3000/profile", {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          });
  
          if (res2.status === 200) {
            console.log(res2.data);
            setProfile(res2.data.profile);
            toast({
              title: "Success",
              description: "Login successful. Redirecting to Home Page",
            });
            navigate('/threads')
          }
          else{
            toast({
              title: "Success",
              description: "Login successful. Redirecting to Profile Page",
            });
            navigate("/profile")
          }
       //handle profile errors
      }
    } catch (err) {
      console.error("Error during login:", err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: "Invalid email or password",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: err.response?.data.msg || "Unknown error",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Unhandled error",
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <img className="absolute z-0 bottom-0 rotate-180" src="/bg-2.webp" alt="" />
      <div className="z-10 w-1/4">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl">Log in using email and passowrd</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">

          <Input className="py-8 px-6 text-base bg-secondary rounded-xl border-0" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

          <Input className="py-8 px-6 text-base bg-secondary rounded-xl border-0" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />

          <Button disabled={isLoginDisabled} onClick={() => handleLogin()} type="submit" className="w-full py-8 rounded-xl ">Log In</Button>
        </CardContent>


      </div>
    </div>
  );
};

export default Login;
