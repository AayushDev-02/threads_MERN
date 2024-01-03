// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"

import { Input } from "@/components/ui/input"
import { useRecoilValue } from "recoil"
import { profileState } from "@/store"
import { Label } from "@radix-ui/react-label"
import { ChangeEvent, useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { Separator } from "../ui/separator"
import { PlusCircle, X } from "lucide-react"


interface Link {
    key: string;
    link: string;
}


// const formSchema = z.object({
//     username: z.string().min(5).max(30),
//     bio: z.string().max(100),
//     links: z.record(z.string().url()),
//     avatar: z.string().url(),
//     location: z.object({
//         city: z.string().max(20),
//         state: z.string().max(20),
//         country: z.string().max(20),
//     }),
// })

const ProfileForm = () => {
    const profile = useRecoilValue(profileState);
    const { toast } = useToast();

    const [links, setLinks] = useState<Link[]>([{ key: '', link: '' }]);
    const [username, setUsername] = useState(profile?.username || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [avatar, setAvatar] = useState(profile?.avatar || '');
    const [city, setCity] = useState(profile?.location.city || '');
    const [state, setState] = useState(profile?.location.state || '');
    const [country, setCountry] = useState(profile?.location.country || '');

    useEffect(() => {

        if (profile) {
            // console.log(profile)
            setUsername(profile.username || '');
            setBio(profile.bio || '');
            setAvatar(profile.avatar || '');
            setCity(profile.location.city || '');
            setState(profile.location.state || '');
            setCountry(profile.location.country || '');

            if (profile.links) {
                const mappedArray = Object.entries(profile.links).map(([key, value]) => ({ key, link: value }));
                setLinks(mappedArray)
            }


        }
    }, [profile]);

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

    const addLink = () => {
        if (links.length < 4) {
            setLinks([...links, { key: '', link: '' }]);
        }
    };

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //       username: "",
    //     },
    //   })

    const onSubmit = async () => {

        const linkObj = links.reduce((acc, { key, link }) => {
            acc[key] = link;
            return acc;
        }, {} as Record<string, string>);


        const data = {
            username,
            bio,
            avatar,
            location: {
                city,
                country,
                state
            },
            links: linkObj
        }
        try {

            const res = await axios.patch("http://localhost:3000/profile/", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })

            console.log(res)

            toast({
                variant: "default",
                title: "Success",
                description: "Your profile was updated successfully",
            });
        } catch (err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error updating the profile",
            });
        }


    }
    return (
        <div className="space-y-5">
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
            <div className="space-y-5">
                <div className="flex space-x-4 items-center ">
                    <div className="text-lg font-bold">Links</div>
                    <Button size={"sm"} variant={"outline"} type="button" onClick={addLink} className="w-fit">
                        <PlusCircle className="h-4 w-4" />
                    </Button>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3 gap-x-10">
                    {links.map((link, index) => (
                        <div key={index} className="grid grid-cols-6 gap-x-2 items-center justify-center">


                            <Input
                                type="text"
                                id={`key-${index}`}
                                value={link.key}
                                className="w-full col-span-2"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleLinkChange(index, 'key', e.target.value)}
                            />


                            <Input
                                type="text"
                                id={`link-${index}`}
                                value={link.link}
                                className="w-full col-span-3"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleLinkChange(index, 'link', e.target.value)}
                            />

                            {index >= 0 && (

                                <Button variant={"outline"} className="w-full col-span-1" type="button" onClick={() => removeLink(index)}>
                                    <X />
                                </Button>

                            )}

                        </div>
                    ))}
                </div>
            </div>


            <Button type="button" onClick={onSubmit} className="w-full ">
                Submit
            </Button>
        </div>
    )
}

export default ProfileForm
