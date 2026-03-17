import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!title.trim() && !notes.trim()) return; // Prevent empty submissions

    const newTask = {
      id: Date.now(), // Better practice than using array index
      heading: title,
      list: notes,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };

    setTasks([newTask, ...tasks]); // Add to top of list
    setTitle("");
    setNotes("");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden flex flex-col lg:flex-row">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Left Column: Input Panel (Sticky on Desktop) */}
      <section className="lg:w-[400px] xl:w-[450px] flex-shrink-0 z-10 p-6 lg:p-12 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 bg-neutral-950/50 backdrop-blur-3xl">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500 mb-2">
            Capture.
          </h1>
          <p className="text-neutral-400 font-light tracking-wide">
            Record your thoughts in the void.
          </p>
        </div>

        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Give it a title..."
              className="w-full bg-transparent border-b border-neutral-800 py-3 text-xl font-medium text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="relative group">
            <textarea
              rows={5}
              placeholder="What's on your mind?"
              className="w-full bg-neutral-900/50 rounded-2xl p-4 text-neutral-300 border border-neutral-800 resize-none focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="group relative w-full inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-orange-500 rounded-full overflow-hidden transition-transform active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-rose-600 group-hover:scale-110 transition-transform duration-500 ease-out"></div>
            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Ignite Task
            </span>
          </button>
        </form>
      </section>

      {/* Right Column: Task Grid (Scrollable) */}
      <section className="flex-1 p-6 lg:p-12 h-full lg:h-screen overflow-y-auto z-10 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center text-neutral-600 opacity-50">
            <svg className="w-24 h-24 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <p className="text-xl font-light tracking-widest uppercase">The void is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group relative bg-neutral-900/40 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 hover:-translate-y-2 hover:bg-neutral-800/50 hover:border-orange-500/30 transition-all duration-300 shadow-2xl hover:shadow-orange-500/10 flex flex-col"
              >
                {/* Decorative Pin/Icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-neutral-950 border border-neutral-800 rounded-full flex items-center justify-center text-orange-500 shadow-lg group-hover:scale-110 group-hover:text-rose-500 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight leading-tight line-clamp-2">
                    {task.heading || "Untitled Thought"}
                  </h2>
                </div>
                
                <p className="text-neutral-400 font-medium leading-relaxed flex-1 whitespace-pre-wrap line-clamp-6">
                  {task.list}
                </p>

                <div className="mt-6 pt-4 border-t border-neutral-800/50 flex items-center justify-between text-xs font-bold text-neutral-600 tracking-wider uppercase">
                  <span>Task #{task.id.toString().slice(-4)}</span>
                  <span className="text-orange-500/70">{task.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default App;