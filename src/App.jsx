import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);

  // Array of brutalist colors to cycle through for the cards
  const brutalColors = ["bg-lime-300", "bg-pink-400", "bg-cyan-300", "bg-yellow-300", "bg-white"];

  const submitForm = (e) => {
    e.preventDefault();
    if (!title.trim() && !notes.trim()) return;

    const newTask = {
      id: Date.now(),
      heading: title,
      list: notes,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      // Assign a random color index when created to keep the grid punchy
      colorIndex: Math.floor(Math.random() * brutalColors.length)
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setNotes("");
  };

  return (
    // The background uses an inline SVG for a stark blueprint/drafting grid
    <main 
      className="min-h-screen bg-[#FDFBF7] text-black font-sans selection:bg-black selection:text-white flex flex-col lg:flex-row relative z-0"
      style={{
        backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
        backgroundSize: `30px 30px`
      }}
    >
      
      {/* Left Column: Input Panel */}
      <section className="lg:w-[500px] flex-shrink-0 z-10 p-6 lg:p-12 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center bg-[#FDFBF7] border-b-4 lg:border-b-0 lg:border-r-8 border-black">
        
        <div className="mb-10">
          {/* Decorative tag */}
          <div className="inline-block border-2 border-black bg-yellow-300 text-black text-xs font-black uppercase tracking-widest px-3 py-1 mb-4 shadow-[4px_4px_0_0_#000]">
            System v1.0
          </div>
          <h1 className="text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-4">
            Brain<br/>Dump.
          </h1>
          <p className="text-xl font-bold border-l-4 border-black pl-4">
            Raw thoughts. No filter.
          </p>
        </div>

        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-black uppercase tracking-widest mb-2">Target</label>
            <input
              type="text"
              placeholder="What needs doing?"
              className="w-full bg-white border-4 border-black p-4 text-xl font-bold placeholder-gray-400 focus:outline-none focus:bg-yellow-100 focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#000] transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-black uppercase tracking-widest mb-2">Intel</label>
            <textarea
              rows={5}
              placeholder="Spill the details..."
              className="w-full bg-white border-4 border-black p-4 text-lg font-medium resize-none focus:outline-none focus:bg-cyan-100 focus:-translate-y-1 focus:shadow-[6px_6px_0_0_#000] transition-all"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* Brutalist Button: The shadow compress effect is key here */}
          <button
            type="submit"
            className="group w-full flex items-center justify-center gap-3 px-8 py-5 mt-4 font-black text-xl uppercase tracking-widest text-black bg-lime-400 border-4 border-black shadow-[8px_8px_0_0_#000] hover:bg-lime-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all cursor-pointer"
          >
            <svg className="w-8 h-8 group-active:scale-75 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M12 4v16m8-8H4"></path></svg>
            Execute
          </button>
        </form>
      </section>

      {/* Right Column: Task Grid */}
      <section className="flex-1 p-6 lg:p-12 h-full lg:h-screen overflow-y-auto z-10 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
            <div className="bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-12 text-center rotate-[-2deg]">
              <h2 className="text-5xl font-black uppercase mb-4">Void.</h2>
              <p className="text-xl font-bold">Your queue is empty. Get to work.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 auto-rows-max">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`relative ${brutalColors[task.colorIndex]} border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[16px_16px_0_0_#000] transition-all duration-200 flex flex-col`}
              >
                {/* Harsh Tape/Sticker Graphic */}
                <div className="absolute -top-4 -right-4 bg-black text-white text-xs font-black uppercase px-3 py-2 rotate-12 shadow-[4px_4px_0_0_#fff] border-2 border-white z-10">
                  {task.date}
                </div>

                <div className="mb-4 pb-4 border-b-4 border-black">
                  <h2 className="text-3xl font-black tracking-tight leading-none uppercase break-words">
                    {task.heading || "UNTITLED"}
                  </h2>
                </div>
                
                <p className="text-black font-semibold text-lg leading-snug flex-1 whitespace-pre-wrap">
                  {task.list}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="bg-white border-2 border-black px-2 py-1 text-sm font-black uppercase tracking-widest shadow-[2px_2px_0_0_#000]">
                    ID:{task.id.toString().slice(-4)}
                  </span>
                  
                  {/* Decorative element */}
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 2h20v20H2V2zm2 2v16h16V4H4zm4 4h8v2H8V8zm0 4h8v2H8v-2z" />
                  </svg>
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