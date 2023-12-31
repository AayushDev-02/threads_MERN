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

export const userState = atom({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const profileState = atom({
  key: 'profileState',
  default: null,
});

export const hasProfileState = atom({
  key: 'hasProfileState',
  default: false,
});