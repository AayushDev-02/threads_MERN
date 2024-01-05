import React, { useState, ChangeEvent } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { profileState } from '@/store';
import { useNavigate } from 'react-router-dom';

interface Link {
    key: string;
    link: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate()
    const [links, setLinks] = useState<Link[]>([{ key: '', link: '' }]);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const setProfile = useSetRecoilState(profileState)
    const addLink = () => {
        if (links.length < 4) {
            setLinks([...links, { key: '', link: '' }]);
        }
    };

    const removeLink = (index: number) => {
        const updatedLinks = [...links];
        updatedLinks.splice(index, 1);
        setLinks(updatedLinks);
    };

    const handleLinkChange = (index: number, field: keyof Link, value: string) => {
        const updatedLinks = [...links];
        updatedLinks[index][field] = value;
        setLinks(updatedLinks);
    };

    const handleCreateProfile = async() => {
        const token = localStorage.getItem("authToken");
        const data = {
            username,
            bio,
            location: {
                city,
                state,
                country
            },
            links: Object.fromEntries(links.map((link) => [link.key, link.link])),
            avatar
        }
        try{

            const res = await axios.post("http://localhost:3000/profile", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(res.status === 200){
                setProfile(res.data.profile)
                navigate('/threads')
            }

        }catch(err) {
            console.log(err)
        }


    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Create your global profile. This info will be visible to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="Username">Username</Label>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="Bio">Bio</Label>
                        <Textarea
                            placeholder="Type your Bio here."
                            value={bio}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Avatar</Label>
                        <Input
                            placeholder="Enter an avatar link"
                            value={avatar}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setAvatar(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-x-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="City">City</Label>
                            <Input
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="State">State</Label>
                            <Input
                                type="text"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setState(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="Country">Country</Label>
                            <Input
                                type="text"
                                placeholder="Enter Country"
                                value={country}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}
                            />
                        </div>
                    </div>

                    {links.map((link, index) => (
                        <div key={index} className="grid grid-cols-6 gap-x-2">
                            <div className="space-y-1.5 grid-cols-2">

                                <Input
                                    type="text"
                                    id={`key-${index}`}
                                    value={link.key}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleLinkChange(index, 'key', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5 grid-cols-3">

                                <Input
                                    type="text"
                                    id={`link-${index}`}
                                    value={link.link}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleLinkChange(index, 'link', e.target.value)}
                                />
                            </div>
                            {index >= 0 && (
                                <div className="flex items-center grid-cols-1">
                                    <Button type="button" onClick={() => removeLink(index)} >
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}

                    <Button type="button" onClick={addLink} className="w-full">
                        Add More Links
                    </Button>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => handleCreateProfile()} type="submit" className="w-full">
                        Create
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Profile;
