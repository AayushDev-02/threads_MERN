import { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"


const Landing = () => {
    const {theme} = useTheme()
    const [logoUrl , setLogoUrl] = useState<string>("")
    useEffect(() => {
        if(theme === "light"){
            setLogoUrl("/logo-color.svg")
        } else{
            setLogoUrl("/logo.svg")
        }
    }, [theme]) 
    return (
        <div
            className=' h-full pt-20 flex items-center justify-center overflow-hidden relative shadow-inner-[20px] '>
            <img className="absolute blur left-0 saturate-200" src="/img-1.png" alt="" />
            <img className="absolute blur right-0 top-20 saturate-200" src="/img-3.png" alt="" />
            <img className="absolute blur left-0 right-0 saturate-0 w-full" src="/img-2.png" alt="" />

            <div className="flex space-x-4 items-center justify-center z-10">
                <img className="h-[10rem]" src={logoUrl} alt="" />
                <h1 className='text-7xl font-bold'>Threads</h1>
            </div>
        </div>
    )
}

export default Landing
