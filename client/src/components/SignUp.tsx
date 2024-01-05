import { Input } from "@/components/ui/input"
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useSetRecoilState } from "recoil"
import { userState } from "@/store"


const SignUp = () => {
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const isSignUpDisabled = !email || !password;
  const { toast } = useToast()
  const handleSignUp = async () => {
    const data = {
      email, password
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/signup", data)

      if (res.status === 200) {
        localStorage.setItem("authToken", res.data.token)
        setUser(res.data.user);

        toast({
          title: "Success",
          description: "Redirecting to Profile Page",
        })
        navigate("/create-profile")
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: err.response.data.msg,
          });
        } else {

          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: err.response?.data.msg,
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
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <img className="absolute z-0 bottom-0 rotate-180" src="/bg-2.webp" alt="" />
      <div className="z-10 w-1/4">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl">Sign Up using email and passowrd</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">

          <Input className="py-8 px-6 text-base bg-secondary rounded-xl border-0" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

          <Input className="py-8 px-6 text-base bg-secondary rounded-xl border-0" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />

          <Button disabled={isSignUpDisabled} onClick={() => handleSignUp()} type="submit" className="w-full py-8 rounded-xl ">Sign Up</Button>
        </CardContent>


      </div>
    </div>

  )
}

export default SignUp
