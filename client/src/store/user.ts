import { atom } from "recoil";

export interface Profile {
  userId: string;
  username: string;
  bio: string;
  links: Map<string, string>;
  avatar: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  followers: string[];
  following: string[];
}

interface Image {
  url:string,
  caption?:string
}
export interface Comment {
  user: string;
  content: string;
  likes: string[];
  likeCount: number
}
export interface ThreadsInterface {
  _id:string;
  user: string;
  content:string;
  images?: Image[];
  likes: string[];
  comment :Comment[];
  commentCount: number;
  likeCount: number;
}

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
export const profileState = atom({
  key: 'profileState',
  default: [],
});

export const hasProfileState = atom({
  key: 'hasProfileState',
  default: false,
});