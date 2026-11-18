import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteAllPastes, deletePaste } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Pastes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.paste);
  const [searchInput, setSearchInput] = useState("");

  const filteredPastes = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchInput.toLowerCase());
  });
  return (
    <>
      <div className="mx-auto mt-10 flex max-w-3xl gap-3 px-4">
        <input
          type="search"
          placeholder="Search Paste"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 rounded-lg border border-[#d9ccb8] bg-white/70 px-4 py-2.5 text-[#2b2a27] placeholder-[#a39882] outline-none transition focus:border-[#2f4a3c] focus:ring-2 focus:ring-[#2f4a3c]/20"
        />

        <button
          onClick={() => {
            dispatch(deleteAllPastes());
            toast.success("All pastes deleted!");
          }}
          className="rounded-lg bg-[#b5533c] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#9a4330] active:scale-95"
        >
          {" "}
          DELETE ALL{" "}
        </button>
      </div>
      <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-4 px-4 pb-10">
        {pastes.length === 0 && (
          <p className="mt-16 text-center text-lg text-[#a39882]">
            No pastes yet!
          </p>
        )}
        {pastes.length > 0 && filteredPastes.length === 0 && (
          <p className="mt-16 text-center text-lg text-[#a39882]">
            No matching pastes.
          </p>
        )}
        {filteredPastes.map((paste) => {
          return (
            <div
              key={paste.pasteId}
              className="flex flex-col gap-3 rounded-xl border border-[#e3d8c5] bg-white/70 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="text-lg font-semibold text-[#2f4a3c]">
                {paste.title}
              </div>
              <div className="flex flex-row flex-wrap items-center gap-2">
                <button
                  onClick={() => navigate(`/pastes/${paste.pasteId}`)}
                  className="rounded-md border border-[#d9ccb8] px-3 py-1.5 text-sm text-[#2f4a3c] transition hover:bg-[#2f4a3c] hover:text-[#f5efe6]"
                >
                  View
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.body);
                    toast.success("Copied to clipboard!");
                  }}
                  className="rounded-md border border-[#d9ccb8] px-3 py-1.5 text-sm text-[#2f4a3c] transition hover:bg-[#2f4a3c] hover:text-[#f5efe6]"
                >
                  Copy
                </button>
                <button
                  onClick={
                    // when clicking edit, we need to navigate to home ('/'), with the pasteId, because the
                    // logic to update when pasteId is available is already written over there.
                    () => navigate(`/?pasteId=${paste.pasteId}`)
                  }
                  className="rounded-md border border-[#d9ccb8] px-3 py-1.5 text-sm text-[#2f4a3c] transition hover:bg-[#2f4a3c] hover:text-[#f5efe6]"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    dispatch(deletePaste(paste));
                    toast.success("Paste deleted successfully!");
                  }}
                  className="rounded-md border border-[#b5533c] px-3 py-1.5 text-sm text-[#b5533c] transition hover:bg-[#b5533c] hover:text-white"
                >
                  Delete
                </button>

                <span className="ml-auto text-xs text-[#a39882]">
                  {paste.createdAt}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Pastes;
