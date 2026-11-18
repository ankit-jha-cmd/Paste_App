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
      <div>
        <input
          type="search"
          placeholder="Search Paste"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          onClick={() => {
            dispatch(deleteAllPastes());
            toast.success("All pastes deleted!");
          }}
        >
          {" "}
          DELETE ALL{" "}
        </button>
      </div>
      <div className="flex flex-col">
        {filteredPastes.map((paste) => {
          return (
            <div key={paste.pasteId} className="flex flex-col">
              <div>{paste.title}</div>
              <div className="flex flex-row gap-2">
                <button onClick={() => navigate(`/pastes/${paste.pasteId}`)}>
                  View
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.body);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  Copy
                </button>
                <button
                  onClick={
                    // when clicking edit, we need to navigate to home, with the pasteId, since the
                    // logic to update when pasteId is available is already written over there.
                    () => navigate(`/?pasteId=${paste.pasteId}`)
                  }
                >
                  {/* use query param to send pasteId */}
                  Edit {/*need fixing*/}
                </button>
                <button
                  onClick={() => {
                    dispatch(deletePaste(paste));
                    toast.success("Paste deleted successfully!");
                  }}
                >
                  Delete
                </button>

                <span>{paste.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Pastes;
