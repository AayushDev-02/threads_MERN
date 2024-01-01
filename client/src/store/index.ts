import { atom, selector } from "recoil";

export interface Profile {
  _id: string;
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
  profile: Profile;
  content:string;
  images?: Image[];
  likes: string[];
  comment :Comment[];
  commentCount: number;
  likeCount: number;
}

export interface User {
  _id: string;
  email:string;
  password:string;
}

export const userState = atom<User | null>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
export const profileState = atom<Profile | null>({
  key: 'profileState',
  default: null,
});

export const hasProfileState = atom({
  key: 'hasProfileState',
  default: false,
});

export const profileIdSelector = selector<string | null>({
  key: 'profileIdSelector',
  get: ({ get }) => {
    const profile = get(profileState);

    return profile?.userId || null;
  },
});
export const userIdSelector = selector<string | null>({
  key: 'userIdSelector',
  get: ({ get }) => {
    const user = get(userState);

    return user?._id || null;
  },
});