import { useState } from "react";
import { Button } from "../ui/button";
import { UserCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import axios from "axios";
import { useToast } from "../ui/use-toast";



const CreateThread: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const { toast } = useToast();
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };
    
    const handlePost = async () => {
        const data = {
            content: content,
            images: []
        }
        try {
             await axios.post("http://localhost:3000/thread/create", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            })
            // console.log(res)
            toast({
                title: "Success",
                description: "Thread Created Successfully",
              });
            
              setContent("");
        }catch (err) {
            toast({
                title: "destructive",
                description: "Error posting a thread",
              });
        }

        

    }

    return (
        <div>
            <div className="w-full flex items-center justify-between p-5 space-x-4">
                <div className="flex space-y-2 w-full items-center ">
                    <div className="w-full space-y-4">
                        <div className="flex items-center space-x-2">
                            <UserCircle2 width={30} height={30} />
                            <h2 className="w-fit">Aayush Yadav</h2>
                        </div>
                        <textarea
                            className="border-0 p-0 w-full outline-none bg-inherit resize-none text-slate-300 px-5"
                            placeholder="Start a thread..."
                            onInput={handleInputChange}
                            value={content}
                        />
                    </div>
                </div>
                <Button onClick={handlePost} className="text-blue-600" variant={"ghost"}>
                    Post
                </Button>
            </div>
            <Separator />

        </div>
    );
};

export default CreateThread;
