import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Profile } from "@/store";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import axiosInstance from '@/utils/axiosInstance';

const Search = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [searchResults, setSearchResults] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        // Fetch all profiles
        const res = await axiosInstance.get("/profile/current/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log(res.data.profiles)
        // Update the allProfiles state
        setAllProfiles(res.data.profiles);
        setSearchResults(res.data.profiles)
      } catch (error) {
        console.error(error);
      }
    };

    // Call the function to fetch all profiles
    fetchAllProfiles();
  }, []);

  useEffect(() => {
    // Filter profiles based on the entered username
    const filteredProfiles = allProfiles.filter((profile) =>
      profile.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the searchResults state
    setSearchResults(filteredProfiles);
  }, [searchTerm, allProfiles]);

  return (
    <div className="space-y-6 h-full overflow-y-scroll scrollbar-track-transparent scrollbar-thin scrollbar-thumb-secondary px-20 lg:px-40 xl:px-72">
      <div className="w-full flex items-center justify-center p-10">
        <h1 className="text-5xl">Search</h1>
      </div>
      <div className="w-full">
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      {searchResults.length > 0 ? ( 
        <div className="grid grid-cols-3 gap-5">
          {searchResults.map((element, index)=> (
            <Card onClick={() => navigate(`/profile/${element._id}`)} className="flex items-center space-x-4 p-5 cursor-pointer" key={index}>
                        <Avatar>
                            <AvatarImage src={element.avatar} />
                            <AvatarFallback>{element.username.substring(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className='space-y-1'>
                            <h1 className='font-semibold'>{element.username}</h1>
                            <p className='text-gray-500 text-sm'>{element.bio.substring(0, 15) + "......."}</p>
                        </div>
            </Card>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;
