import logo from "/logo.svg"


const Landing = () => {
    return (
        <div 
        style={{
            background: "radial-gradient(64.09% 64.09% at 49.2% 38.61%, rgba(34, 34, 34, 0.00) 0%, #000 100%)"
        }}
        className=' h-full pt-20 flex items-center justify-center overflow-hidden relative shadow-inner-[20px] '>
            <img className="absolute blur left-0 saturate-200" src="/img-1.png" alt="" />
            <img className="absolute blur right-0 top-20 saturate-200" src="/img-3.png" alt="" />
            <img className="absolute blur left-0 right-0 saturate-0 w-full" src="/img-2.png" alt="" />
            {/* <div className="h-[40rem] w-[40rem] bg-black rounded-full"></div> */}
            {/* <div className="h-full p-40 "> */}
            {/* <div className="bg-primary-pattern rounded-xl border border-primary-foreground  shadow-lg flex items-center relative justify-center h-full z-0"> */}
                <div className="flex space-x-4 items-center justify-center z-10">
                    <img className="h-[10rem]" src={logo} alt="" />
                    <h1 className='text-7xl font-bold'>Threads</h1>
                {/* </div> */}
            {/* </div> */}
            </div>
        </div>
    )
}

export default Landing
