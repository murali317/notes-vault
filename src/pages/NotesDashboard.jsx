import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { addNote } from "../services/noteService";

function NotesDashboard() {
  console.log("✅ NotesDashboard rendered!");
  const { user, logout } = useAuth();
  console.log("👤 Current user:", user); // 🔍 log user object to debug

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [{ id: 1, title: "First Note", content: "This is the first note." }];
  });

  const [editNoteId, setEditNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNote = async (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newContent.trim()) {
      alert("Both title and content are required");
      return;
    }

    if (!user || !user.uid) {
      alert("You must be logged in to add notes.");
      console.error("❌ User missing or no UID:", user);
      return;
    }

    try {
      const newNote = await addNote(user.uid, newTitle, newContent);
      setNotes([newNote, ...notes]);
      setNewTitle("");
      setNewContent("");
      console.log("✅ Note saved with ID:", newNote.id);
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note, try again!");
    }
  };

  const handleEditClick = (note) => {
    setEditNoteId(note.id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const handleSaveEdit = () => {
    const updatedNotes = notes.map((note) =>
      editNoteId === note.id
        ? { ...note, title: editedTitle, content: editedContent }
        : note
    );
    setNotes(updatedNotes);
    setEditNoteId(null);
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h2>Welcome, {user?.email?.split("@")[0]}</h2>
      </div>

      <h1> 🗃️ Notes Dashboard</h1>

      <input
        type="text"
        placeholder="🔍 Search anything "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "300px",
          marginBottom: "1rem",
          display: "block",
        }}
      />

      <form onSubmit={handleAddNote} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Note title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
        />

        <input
          type="text"
          placeholder="Note content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
        />

        <button type="submit">Add Note</button>
        <button onClick={logout}>Logout</button>
      </form>

      <div>
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              {editNoteId === note.id ? (
                <>
                  <input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  ></textarea>
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={() => setEditNoteId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <button
                    style={{ marginRight: "0.5rem" }}
                    onClick={() => handleEditClick(note)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      marginRight: "0.5rem",
                    }}
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesDashboard;


// --------------- MESSY SAT EVENING ---------------------------


// import React, { useEffect, useState } from "react";
// import { addNote, getNotes } from "../services/noteService";
// import { useAuth } from "../context/AuthContext";

// const NotesDashboard = () => {
//   const { user } = useAuth();
//   const [noteText, setNoteText] = useState("");
//   const [notes, setNotes] = useState([]);

//   // 🟢 Load notes when dashboard mounts
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         if (user?.uid) {
//           const userNotes = await getNotes(user.uid);
//           setNotes(userNotes);
//         }
//       } catch (error) {
//         console.error("Failed to fetch notes:", error);
//         alert("Error loading notes");
//       }
//     };

//     fetchNotes();
//   }, [user]);

//   // 🟢 Handle adding a new note
//   const handleAddNote = async () => {
//     if (!noteText.trim()) {
//       alert("Note cannot be empty!");
//       return;
//     }

//     try {
//       if (!user?.uid) {
//         alert("You must be logged in to add notes.");
//         return;
//       }

//       const noteId = await addNote(user.uid, noteText);

//       // Update UI immediately
//       const newNote = {
//         id: noteId,
//         uid: user.uid,
//         text: noteText,
//         createdAt: new Date(),
//       };
//       setNotes([newNote, ...notes]); // prepend newest
//       setNoteText(""); // clear input
//     } catch (error) {
//       console.error("Failed to save note:", error);
//       alert("Failed to save note, try again!");
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Notes Dashboard</h2>

//       {/* Input + Button */}
//       <div className="flex mb-4">
//         <input
//           type="text"
//           value={noteText}
//           onChange={(e) => setNoteText(e.target.value)}
//           placeholder="Write a note..."
//           className="flex-grow border rounded p-2"
//         />
//         <button
//           onClick={handleAddNote}
//           className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* Notes List */}
//       <div className="space-y-3">
//         {notes.length === 0 ? (
//           <p className="text-gray-500">No notes yet. Add one above!</p>
//         ) : (
//           notes.map((note) => (
//             <div
//               key={note.id}
//               className="p-3 border rounded shadow-sm bg-gray-50"
//             >
//               {note.text}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotesDashboard;
