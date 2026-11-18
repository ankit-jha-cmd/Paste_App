import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ViewPastes() {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.paste);
  const paste = pastes.find((p) => p.pasteId === Number(id));

  //Toast lives in useEffect, not the render body: StrictMode double-renders,
  //which would fire it twice.
  useEffect(() => {
    if (!paste) {
      toast.error("Invalid id!");
    }
  }, [paste]);

  if (paste === undefined) {
    return (
      <p className="mt-20 text-center text-lg text-[#a39882]">
        Paste not found
      </p>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-3xl px-4 pb-10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-[#2f4a3c]">{paste.title}</h1>

        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.body);
            toast.success("Copied to clipboard!");
          }}
          className="rounded-lg bg-[#2f4a3c] px-5 py-2 text-sm font-medium text-[#f5efe6] shadow-sm transition hover:bg-[#243a2e] active:scale-95"
        >
          Copy
        </button>
      </div>

      <p className="whitespace-pre-wrap rounded-xl bg-[#2b2a27] p-6 font-mono text-sm leading-relaxed text-[#f5efe6] shadow-lg">
        {paste.body}
      </p>
    </div>
  );
}

export default ViewPastes;
