import { ThreadsInterface } from "@/store/user";
import React from "react";



interface PersonalThreadsProps {
  personalThreads: ThreadsInterface[];
}

const PersonalThreads: React.FC<PersonalThreadsProps> = ({ personalThreads }) => {
  console.log(personalThreads)
  return (
    <div>
      <h2>Personal Threads</h2>
      <div className="space-y-5">
      {personalThreads.map((thread, index) => (
        <div key={index}>
          <h1>{thread.content}</h1>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PersonalThreads;
