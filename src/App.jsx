import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!title.trim() && !notes.trim()) return;

    const newTask = {
      id: Date.now(),
      heading: title,
      list: notes,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setNotes("");
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col lg:flex-row">
      
      {/* Subtle Pastel Ambient Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Column: Input Panel */}
      <section className="lg:w-[450px] flex-shrink-0 z-10 p-8 lg:p-14 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center bg-white/60 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 mb-3 drop-shadow-sm">
            Focus.
          </h1>
          <p className="text-slate-500 font-medium tracking-wide">
            Clear your mind. Add your tasks.
          </p>
        </div>

        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <div className="relative group">
            <input
              type="text"
              placeholder="Task Title"
              className="w-full bg-transparent border-b-2 border-slate-200 py-3 text-2xl font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="relative group">
            <textarea
              rows={5}
              placeholder="Task details or notes..."
              className="w-full bg-slate-100/50 rounded-2xl p-5 text-slate-700 font-medium border border-slate-200 resize-none focus:outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-inner"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="group relative w-full inline-flex items-center justify-center px-8 py-4 mt-2 font-bold text-white bg-slate-900 rounded-full overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-900 to-slate-800 group-hover:to-indigo-900 transition-colors duration-500 ease-out"></div>
            <span className="relative flex items-center gap-2 tracking-wide">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
              Create Task
            </span>
          </button>
        </form>
      </section>

      {/* Right Column: Task Grid */}
      <section className="flex-1 p-6 lg:p-12 h-full lg:h-screen overflow-y-auto z-10 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center text-slate-400">
            <div className="w-24 h-24 mb-6 bg-slate-100 rounded-full flex items-center justify-center shadow-inner">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            </div>
            <p className="text-lg font-semibold tracking-wider uppercase text-slate-400">No active tasks</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-max">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group relative bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col"
              >
                {/* Minimalist Pin Icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
                </div>

                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight line-clamp-2">
                    {task.heading || "Untitled Task"}
                  </h2>
                </div>
                
                <p className="text-slate-500 font-medium leading-relaxed flex-1 whitespace-pre-wrap line-clamp-6">
                  {task.list}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 uppercase tracking-wider">
                    ID: {task.id.toString().slice(-4)}
                  </span>
                  <span className="text-sm font-semibold text-indigo-400">
                    {task.date}
                  </span>
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