import { profileState, profileUpdate, userState } from '@/store'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import axiosInstance from '@/utils/axiosInstance';


const Init = () => {
  const setUser = useSetRecoilState(userState)
  const setProfile = useSetRecoilState(profileState)
  const profileUpdates = useRecoilValue(profileUpdate)
  useEffect(() => {
    const getUserAndProfile = async () => {
      if(localStorage.getItem("authToken")){

        const res = await axiosInstance.get("/user/me", {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
          }
        })
        setUser(res.data.data)

        const res2 = await axiosInstance.get("/profile", {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
          }
        })
        
        setProfile(res2.data.profile)
      }
    }
    getUserAndProfile()
  }, [localStorage.getItem("authToken"), profileUpdates]) 

  


  return (
    <></>
  )
}

export default Init



