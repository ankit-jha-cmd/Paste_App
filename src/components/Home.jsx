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
      //if pasteId already exists, then update the paste with that pasteId
      const existingPaste = pastes.find((p) => p.pasteId === Number(pasteId));
      if (!existingPaste) return toast("Paste not found!");
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
      // else create a new paste

      // check if the title already exist
      const existingPaste = pastes.find(
        (p) => p.title.trim().toLowerCase() === title.trim().toLowerCase(),
      );
      if (existingPaste) return toast.error("Title already exist");
      const paste = {
        title: title,
        body: body,
        pasteId: Date.now(),
        createdAt: new Date().toLocaleString(), // know about date formatting
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
      <div>
        <input
          type="text"
          value={title}
          placeholder="Add your title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {pasteId ? "Update Your Paste" : "Create Your Paste"}
        </button>
      </div>

      <div>
        <textarea
          placeholder="Add your code"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </>
  );
}

export default Home;
