import React from "react";

const CreateFeedCard = () => {
  return (
    <a href="/feeds/new">
      <li className="flex flex-col m-2 rounded-md bg-slate-500 justify-between">
        <span className="p-2">Add a new feed</span>
        <div className="relative h-64 w-64 p-10">
          <img
            src="images/plus.png"
            alt=""
            className="flex justify-center"
          />
        </div>
      </li>
    </a>
  );
};

export default CreateFeedCard;
