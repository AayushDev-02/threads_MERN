import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import axios from "axios"
import { ThreadsInterface, profileUpdate, threadUpdate } from "@/store"
import ThreadList from "./Home/ThreadList"
import { useRecoilValue } from "recoil"


const Threads = () => {

    const [personalThreads, setPersonalThreads] = useState<ThreadsInterface[]>([])
    const [allThreads, setAllThreads] = useState<ThreadsInterface[]>([])
    const [followedThreads, setFollowedThreads] = useState<ThreadsInterface[]>([])
    const profileUpdates = useRecoilValue(profileUpdate)
    const threadsUpdate = useRecoilValue(threadUpdate)

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
    }, [threadsUpdate])

    useEffect(() => {
        const getAllThreads = async () => {
          const res = await axios.get("http://localhost:3000/thread/all", {
            headers: {
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          })

        //   console.log(res)
          setAllThreads(res.data.threads)
        }
        getAllThreads();
    }, [threadsUpdate])
    useEffect(() => {
        const getFollowingThreads = async () => {
          const res = await axios.get("http://localhost:3000/thread/followed", {
            headers: {
              Authorization : `Bearer ${localStorage.getItem("authToken")}`
            }
          })

          // console.log(res)
        setFollowedThreads(res.data.threads)
        }
        getFollowingThreads();
    }, [threadsUpdate,profileUpdates ])

    return (
        <div className="w-full">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="account">Explore</TabsTrigger>
                    <TabsTrigger className="w-full" value="password">Followring</TabsTrigger>
                    <TabsTrigger className="w-full" value="personal">Personal</TabsTrigger>
                </TabsList>
                <TabsContent className="w-full  p-5" value="account"><ThreadList threads={allThreads} noThreadTitle="No Threads" noThreadDesc="Be the first one to thread"  /></TabsContent>
                <TabsContent className="w-full  p-5" value="password"><ThreadList threads={followedThreads} noThreadTitle="No Threads" noThreadDesc="Be the first one to thread"  /></TabsContent>
                <TabsContent className="w-full  p-5" value="personal"><ThreadList threads={personalThreads} noThreadTitle="No Threads" noThreadDesc="Be the first one to thread"  /></TabsContent>
            </Tabs>
        </div>

    )
}

export default Threads
