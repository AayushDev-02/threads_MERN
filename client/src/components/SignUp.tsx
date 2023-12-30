import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "./ui/button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"


const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast()
  const handleSignUp = async () => {
    const data = {
      email,password
    }

    try{
      const res = await axios.post("http://localhost:3000/auth/signup",data)
      
      if(res.status === 200){
        localStorage.setItem("authToken", res.data.token)
        toast({
          title: "Success",
          description: "Redirecting to Profile Page",
        })
        navigate("/profile")
      }

    }catch(err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast({
            variant: "destructive",
            title: "Unauthorized",
            description: err.response.data.msg,
          });
        } else {
    
          toast({
            variant : "destructive",
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
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Enter your email and set a password to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e) => setEmail(e.target.value) } placeholder="Email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setPassword(e.target.value) } type="password" placeholder="Password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSignUp()} type="submit" className="w-full">Sign Up</Button>
        </CardFooter>
      </Card>
    </div>

  )
}

export default SignUp
