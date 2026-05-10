import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{note.title}</h2>
      <p className="text-gray-700 mt-2">{note.description}</p>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-500"
        >
          <FaEdit />
        </button>

        <button
          onClick={() => deleteNote(note._id)}
          className="text-red-500"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
