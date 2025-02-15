"use client";

import { signIn } from "@/server/auth";
import { signInWithDiscord } from "@/server/auth/authAction";
import { listsIdeas } from "@/utils/constants";
import { useState } from "react";

const WelcomePage = () => {
  const [selectedList, setList] = useState<{
    name: string;
    items: string[];
    selectedItems: string[];
  }>({
    name: "",
    items: [],
    selectedItems: [],
  });
  const [stage, setStage] = useState<number>(0);

  const saveList = () => {
    window.localStorage.setItem('temporaryList', JSON.stringify(selectedList))
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-2">
      <div className="flex flex-col gap-4">
        {stage === 0 && (
          <>
            <h1 className="text-3xl font-bold">
              Your first list is going to be about...
            </h1>
            <ul className="menu w-full rounded-box bg-base-200">
              {listsIdeas.map((list) => (
                <li
                  key={list.name}
                  onClick={() => setList({ ...list, selectedItems: [] })}
                  className={`rounded-[8px] ${selectedList.name === list.name ? "overflow-hidden bg-success text-accent-content" : ""}`}
                >
                  <a className="text-lg">
                    {list.emoji} {list.name}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-success"
              onClick={() => {
                setStage(1);
              }}
              disabled={selectedList.name === ""}
            >
              Get Started
            </button>
          </>
        )}
        {stage === 1 && (
          <>
            <h1 className="text-3xl font-bold">
              Let's add some tasks to your list
            </h1>
            <ul className="menu w-full space-y-2 rounded-box bg-base-200">
              {selectedList.items.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setList((prevList) => {
                      const isSelected = prevList.selectedItems.includes(item);
                      const selectedItems = isSelected
                        ? prevList.selectedItems.filter((i) => i !== item)
                        : [...prevList.selectedItems, item];
                      return { ...prevList, selectedItems };
                    });
                  }}
                  className={`rounded-[8px] ${selectedList.selectedItems.includes(item) ? "overflow-hidden bg-success text-accent-content" : ""}`}
                >
                  <a className="flex flex-row justify-between text-lg">
                    <p>{item}</p>
                    {selectedList.selectedItems.includes(item) && (
                      <p>{selectedList.selectedItems.indexOf(item) + 1}</p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-success"
              onClick={() => {
                setStage(2);
              }}
              disabled={selectedList.selectedItems.length === 0}
            >
              Continue
            </button>
          </>
        )}
        {stage === 2 && (
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-3xl font-bold">
              I'll help you save your list for later
            </h1>
            <p className="text-lg font-medium">
              Sign Up to save your <span className="text-white">{selectedList.name}</span> list,<br /> and keep track of it!
            </p>

            <div className="card w-full bg-base-200 shadow-xl">
              <div className="card-body">
                <button
                  className="btn bg-[#4752c4] text-white hover:bg-[#3b47a8]"
                  onClick={async () => {
                    saveList()
                    await signInWithDiscord();
                  }}
                >
                  SIGN UP WITH DISCORD
                </button>
                <button
                  className="btn bg-white text-black hover:bg-gray-200"
                  onClick={async () => {
                    alert('Google Sign In is not implemented yet');
                  }}
                >
                  SIGN UP WITH GOOGLE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;
