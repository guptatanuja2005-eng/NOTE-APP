import React, { useState, useEffect } from "react";
import Navbar from "../assets/components/Navbar";
import NoteModal from "../assets/components/NoteModal";
import axios from "axios";
import NoteCard from "../assets/components/NoteCard";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5001";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNote] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setcurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
      return null;
    }

    return token;
  };

  const getAuthHeaders = () => {
    const token = getToken();

    if (!token) {
      return null;
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchNotes = async () => {
    const headers = getAuthHeaders();

    if (!headers) {
      setNotes([]);
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/note`, {
        headers,
      });

      setNotes(data.notes || []);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setNotes([]);
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNote(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const closeModal = () => {
    setModalOpen(false);
    setcurrentNote(null);
  };

  const onEdit = (note) => {
    setcurrentNote(note);
    setModalOpen(true);
  };

  const addNote = async (title, description) => {
    const headers = getAuthHeaders();

    if (!headers) {
      toast.error("Please login again");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/note/add`,
        { title, description },
        { headers }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
        toast.success("Note added");
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
      }
    }
  };

  const deleteNote = async (id) => {
    const headers = getAuthHeaders();

    if (!headers) {
      toast.error("Please login again");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/note/${id}`, {
        headers,
      });

      if (response.data.success) {
        toast.success("Note deleted");
        fetchNotes();
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
      }
    }
  };

  const editNote = async (id, title, description) => {
    const headers = getAuthHeaders();

    if (!headers) {
      toast.error("Please login again");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/note/${id}`,
        { title, description },
        { headers }
      );

      if (response.data.success) {
        fetchNotes();
        closeModal();
        toast.success("Note updated");
      }
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
        onClick={() => {
          setcurrentNote(null);
          setModalOpen(true);
        }}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
          deleteNote={deleteNote}
        />
      )}
    </div>
  );
};

export default Home;
