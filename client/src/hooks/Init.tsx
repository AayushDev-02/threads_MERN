import { profileState, userState } from '@/store'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

const Init = () => {
  const setUser = useSetRecoilState(userState)
  const setProfile = useSetRecoilState(profileState)
  useEffect(() => {
    const getUserAndProfile = async () => {
      if(localStorage.getItem("authToken")){

        const res = await axios.get("http://localhost:3000/user/me", {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
          }
        })
        setUser(res.data.data)

        const res2 = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("authToken")}`
          }
        })
        
        setProfile(res2.data.profile)
      }
    }
    getUserAndProfile()
  }, [localStorage.getItem("authToken")]) 

  


  return (
    <></>
  )
}

export default Init



