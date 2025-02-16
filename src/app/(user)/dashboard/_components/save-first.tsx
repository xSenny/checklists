"use client";

import { api } from "@/trpc/react";
import { launchConfetti } from "@/utils/confetti";
import { useEffect, useState } from "react";

const SaveFirstChecklist = () => {
  const utils = api.useUtils();
  const { mutate } = api.checklist.createList.useMutation({
    onSuccess: async () => {
      await utils.checklist.invalidate();
    },
  });
  const [savedList, setSavedList] = useState<{
    name: string;
    selectedItems: string[];
  } | null>(null);
  useEffect(() => {
    if (window.localStorage.getItem("temporaryList") !== null) {
      const item = window.localStorage.getItem("temporaryList");
      setSavedList(item ? JSON.parse(item) : null);
      if (savedList !== null) {
        mutate({ name: savedList.name, items: savedList.selectedItems });
      }
      window.localStorage.removeItem("temporaryList");
      const modal = document.getElementById("my_modal_2");
      if (modal) {
        (modal as HTMLDialogElement).showModal();
      }
      launchConfetti();
    }
  });

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col items-center gap-6 text-center">
          <h3 className="text-3xl font-bold">Thank you for joining!</h3>
          <p className="text-2xl font-medium">
            We took care of your{" "}
            <span className="text-success">
              {savedList?.name ? savedList.name : ""}
            </span>{" "}
            list!
          </p>
          <div className="flex flex-col gap-2">
            {savedList?.selectedItems.map((item, index) => (
              <p key={index} className="text-lg">
                {item}
              </p>
            ))}
          </div>
          <form method="dialog" className="flex w-full">
            <button className="btn btn-primary w-full">Show me around</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SaveFirstChecklist;
