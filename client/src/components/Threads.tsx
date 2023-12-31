import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExploreThreads from "./Home/ExploreThreads"
import PersonalThreads from "./Home/PersonalThreads"
import { useEffect, useState } from "react"
import axios from "axios"
import { ThreadsInterface } from "@/store/user"


const Threads = () => {

    const [personalThreads, setPersonalThreads] = useState<ThreadsInterface[]>([])
    useEffect(() => {
        const getCurrentUserThreads = async () => {
          const res = await axios.get("http://localhost:3000/thread/current", {
            headers: {
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          })

        //   console.log(res)
          setPersonalThreads(res.data.threads)
        }
        getCurrentUserThreads()
    }, [])

    return (
        <div className="w-full">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="account">Explore</TabsTrigger>
                    <TabsTrigger className="w-full" value="password">Followring</TabsTrigger>
                    <TabsTrigger className="w-full" value="personal">Personal</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full  p-5" value="account"><ExploreThreads/></TabsContent>
                <TabsContent className="w-full  p-5" value="password">Change your password here.</TabsContent>
                <TabsContent className="w-full  p-5" value="personal"><PersonalThreads personalThreads={personalThreads}/></TabsContent>
            </Tabs>
        </div>

    )
}

export default Threads
