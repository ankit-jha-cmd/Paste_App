import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewPaste, updatePaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [actualLink, setActualLink] = useSearchParams();
  const pasteId = actualLink.get("pasteId");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.paste);

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p.pasteId === Number(pasteId));
      if (paste) {
        setTitle(paste.title);
        setBody(paste.body);
      }
    }
  }, [pasteId, pastes]);

  function handleSubmit() {
    //empty check
    if (!title.trim() && !body.trim()) {
      return toast.error("Paste is empty!");
    }
    if (!title.trim()) {
      return toast.error("Please enter a title!");
    }
    if (!body.trim()) {
      return toast.error("Paste is empty!");
    }

    if (pasteId) {
      //if pasteId already exists, then update that paste
      const existingPaste = pastes.find((p) => p.pasteId === Number(pasteId));

      //if a non valid pasteId is entered.
      if (!existingPaste) return toast.error("Paste not found!");

      //duplicate check while updating
      const duplicate = pastes.find(
        (p) =>
          p.title.trim().toLowerCase() === title.trim().toLowerCase() &&
          p.pasteId !== Number(pasteId),
      );
      if (duplicate) return toast.error("Title already exist");

      const paste = {
        title: title,
        body: body,
        pasteId: Number(pasteId),
        createdAt: existingPaste.createdAt,
      };
      dispatch(updatePaste(paste));
      toast.success("Paste updated successfully!");
    } else {
      //duplicate check while creating
      const existingPaste = pastes.find(
        (p) => p.title.trim().toLowerCase() === title.trim().toLowerCase(),
      );
      if (existingPaste) return toast.error("Title already exist");

      const paste = {
        title: title,
        body: body,
        pasteId: Date.now(),
        createdAt: new Date().toLocaleString(),
      };

      dispatch(createNewPaste(paste));
      toast.success("Paste created successfully!");
    }
    setActualLink({});
    setTitle("");
    setBody("");
  }

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-3xl gap-3 px-4">
        <input
          type="text"
          value={title}
          placeholder="Add your title"
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded-lg border border-[#d9ccb8] bg-white/70 px-4 py-2.5 text-[#2b2a27] placeholder-[#a39882] outline-none transition focus:border-[#2f4a3c] focus:ring-2 focus:ring-[#2f4a3c]/20"
        />

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-[#2f4a3c] px-5 py-2.5 text-sm font-medium text-[#f5efe6] shadow-sm transition hover:bg-[#243a2e] active:scale-95"
        >
          {pasteId ? "Update Your Paste" : "Create Your Paste"}
        </button>
      </div>

      <div className="mx-auto mt-4 max-w-3xl px-4 pb-10">
        <textarea
          placeholder="Add your paste"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-[60vh] w-full resize-none rounded-xl border border-[#d9ccb8] bg-white/70 p-5 font-mono text-sm leading-relaxed text-[#2b2a27] placeholder-[#a39882] shadow-sm outline-none transition focus:border-[#2f4a3c] focus:ring-2 focus:ring-[#2f4a3c]/20"
        />
      </div>
    </>
  );
}

export default Home;
