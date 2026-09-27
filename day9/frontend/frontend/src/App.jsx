import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setnotes] = useState([]);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  // GET NOTES
  const getData = async () => {
    const response = await axios.get("/api/notes");

    setnotes(response.data.notes);
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    const response = await axios.delete(`/api/notes/${id}`);

    console.log(response.data);

    setnotes(
      notes.filter((note) => {
        return note._id !== id;
      }),
    );
  };

  // UPDATE DESCRIPTION
  const updateDescription = async (id) => {
    const response = await axios.patch(`/api/notes/${id}`, {
      description,
    });

    console.log(response.data);

    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          description: description,
        };
      } else {
        return note;
      }
    });

    setnotes(updatedNotes);

    setdescription("");
  };

  // CREATE NOTE
  const createNote = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/notes", {
      title: title,
      description: description,
    });

    console.log(response.data.note);

    setnotes([...notes, response.data.note]);

    settitle("");
    setdescription("");
  };

  // GET DATA WHEN PAGE LOADS
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-10">
      {/* CREATE NOTE */}

      <div className="flex justify-center">
        <form
          onSubmit={(e) => {
            createNote(e);
          }}
          className="w-full max-w-md rounded-3xl border border-white/20 bg-white/[0.08] p-8 shadow-xl backdrop-blur-md"
        >
          <h2 className="mb-6 text-center text-3xl font-semibold text-white">
            Create Note
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              required
              onChange={(e) => {
                settitle(e.target.value);
              }}
              className="w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-white placeholder-white/40 outline-none transition-colors duration-200 focus:border-white/40 focus:bg-white/[0.12]"
            />

            <textarea
              placeholder="Description"
              value={description}
              required
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              rows="4"
              className="w-full resize-none rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3 text-white placeholder-white/40 outline-none transition-colors duration-200 focus:border-white/40 focus:bg-white/[0.12]"
            />

            <button
              type="submit"
              className="w-full rounded-xl border border-white/20 bg-white/[0.12] py-3 font-medium text-white transition-colors duration-200 hover:bg-white/[0.20] active:scale-[0.98]"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>

      {/* NOTES */}

      <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => {
          return (
            <div
              key={note._id}
              className="w-full max-w-sm rounded-3xl border border-white/20 bg-white/[0.08] p-6 shadow-lg backdrop-blur-md transition-transform duration-200 hover:-translate-y-1"
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Title : {note.title}
              </h2>

              <p className="mb-5 text-base leading-7 text-white/70">
                Description : {note.description}
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    updateDescription(note._id);
                  }}
                  className="flex-1 rounded-xl border border-blue-400/30 bg-blue-500/[0.12] px-4 py-2.5 text-sm font-medium text-blue-200 transition-colors duration-200 hover:bg-blue-500/[0.25] hover:text-white active:scale-95"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                  className="flex-1 rounded-xl border border-red-400/30 bg-red-500/[0.12] px-4 py-2.5 text-sm font-medium text-red-200 transition-colors duration-200 hover:bg-red-500/[0.25] hover:text-white active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
