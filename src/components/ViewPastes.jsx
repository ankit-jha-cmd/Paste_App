import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ViewPastes() {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.paste);
  const paste = pastes.find((p) => p.pasteId === Number(id));

  // we created a side effect for the toast and not add it in the 'if block' because, in strict mode, react might do two renders and due to that toast will be called twice, to prevent that we can add the side effect into a useEffect and add paste in the dependancy array, this works because until there is a change detected in paste, the effect will not run again.
  useEffect(() => {
    if (!paste) {
      toast.error("Invalid id!");
    }
  }, [paste]);

  if (paste === undefined) {
    return <p>Paste not found</p>;
  }

  return (
    <div>
      <h1>{paste.title}</h1>
      <p>{paste.body}</p>
    </div>
  );
}

export default ViewPastes;
