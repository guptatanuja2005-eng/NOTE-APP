import React, { useEffect, useState } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || "");
      setDescription(currentNote.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return;
    }

    if (currentNote) {
      editNote(currentNote._id, title, description);
    } else {
      addNote(title, description);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white text-black p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {currentNote ? "Edit Note" : "ADD NEW NOTE"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border border-gray-300 text-black p-2 w-full mb-4"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border border-gray-300 text-black p-2 w-full mb-4"
            rows="4"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {currentNote ? "Update Note" : "ADD NOTE"}
          </button>
        </form>

        <button className="mt-4 text-red-500 w-full" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
