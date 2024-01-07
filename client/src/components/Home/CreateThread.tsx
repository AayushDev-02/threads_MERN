import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { Image, profileState, threadUpdate } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { LinkIcon } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ImageGrid from "./ImageGrid";


const CreateThread: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<Image[]>([])
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const { toast } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const profile = useRecoilValue(profileState);
  const [threadsUpdate, setThreadsUpdate] = useRecoilState(threadUpdate)
  const handlePost = async () => {
    const data = {
      content: content,
      profileId: profile?._id,
      images: images,
    };
    try {
      await axios.post("http://localhost:3000/thread/create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // console.log(res)
      setThreadsUpdate(!threadsUpdate)
      toast({
        title: "Success",
        description: "Thread Created Successfully",
      });

      setContent("");
      setImages([])
    } catch (err) {
      toast({
        title: "destructive",
        description: "Error posting a thread",
      });
    }
  };

  const handleAddImage = () => {
    const image: Image = {
      url: imageUrl,
      caption: caption
    }

    images.push(image)
    setImages(images)
    setImageUrl("")
    setCaption("")
  }

  return (
    <div>
      <div className="w-full flex items-center justify-between p-5 space-x-4">
        <div className="flex space-y-2 w-full items-center ">
          <div className="w-full space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={profile?.avatar} />

                <AvatarFallback>{profile?.username.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="w-fit">{profile?.username}</h2>
              <Dialog>
                <DialogTrigger><LinkIcon color="#9ca3af" width={20} height={20} /></DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Image</DialogTitle>
                    <DialogDescription>
                      Add images to thread increases its appeal.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5" >
                    <div className="space-y-2" >
                      <Label >Image URL</Label>
                      <Input onChange={(e) => setImageUrl(e.target.value)} id="imageUrl" />
                    </div>
                    <div className="space-y-2">
                      <Label >Caption URL</Label>
                      <Input onChange={(e) => setCaption(e.target.value)} id="caption" />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start ">
                    <DialogClose asChild>
                      <Button onClick={handleAddImage} type="button" className="xl:w-full" variant="default">
                        Add
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <textarea
              className="border-0 p-0 w-full outline-none bg-inherit resize-none text-slate-300 px-5"
              placeholder="Start a thread..."
              onInput={handleInputChange}
              value={content}
            />
            {images && (
            <div className="px-5">
              <ImageGrid images={images}/>
              </div>
            )}
          </div>
        </div>
        <Button disabled={!content.trim()} onClick={handlePost} className="text-blue-600" variant={"ghost"}>
          Post
        </Button>
      </div>


      <Separator />
    </div>
  );
};

export default CreateThread;
