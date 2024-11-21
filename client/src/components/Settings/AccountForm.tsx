import { ChangeEvent, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store'
import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import axiosInstance from '@/utils/axiosInstance';
const AccountForm = () => {
    const user = useRecoilValue(userState)
    const { toast } = useToast();


    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const updateUser = async() => {
        const data = {
            password
        }
        try{

            const res = await axiosInstance.patch("/user/update/password", data, {
                headers :{
                    Authorization : `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            console.log(res)

            toast({
                variant: "default",
                title: "Success",
                description: "Your password was updated successfully",
            });
        }catch(err) {
            console.log(err)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error updating the password",
            });
        }

    }

    useEffect(() => {

        if (user) {
            // console.log(profile)
            setEmail(user.email || '');
            setPassword(user.password || '');
        }
    }, [user]);

    return (
        <div className="space-y-5">
            <div className="space-y-1.5">
                <Label htmlFor="Username">Email</Label>
                <Input
                    placeholder="Username"
                    value={email}
                    type='text'
                    disabled
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-1.5">
                <Label htmlFor="Bio">Password</Label>
                <Input
                    placeholder="Username"
                    value={password}
                    type='password'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
            </div>
            <Button type="button" onClick={updateUser} className="w-full ">
                Update
            </Button>
        </div>
    )
}

export default AccountForm
