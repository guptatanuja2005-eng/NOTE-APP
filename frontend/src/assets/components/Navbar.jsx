import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>

      <input
        type="text"
        placeholder="Search notes...."
        className="bg-gray-600 px-4 py-2 rounded"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
              Login
            </Link>

            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span>{user.name}</span>

            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
