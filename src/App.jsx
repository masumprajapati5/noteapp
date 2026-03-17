import { useState } from "react"


const App = () => {
  const [Title, setTitle] = useState("")
  const [Notes, setNotes] = useState("")
  const [Tasks, setTasks] = useState([])

  function submitForm() {
    console.log("Task Added :", { Heading: Title, List: Notes })

    let newTasks = [...Tasks];
    newTasks.push({ Heading: Title, List: Notes })
    setTasks(newTasks)
    console.log(Tasks)

    setTitle("")
    setNotes("")
  }

  return (
    <>
      {/* 1024(lg / max-lg) thi small screen mate => flex lagu padtu nathi*/}

      {/* 1024(lg) thi big screen mate => flex lagu pade che */}

      <section className='lg:flex items-center justify-center'>
        {/* form for add new task */}
        <div className='lg:w-1/2 w-full h-screen flex items-center justify-center p-6'>

          <div className="bg-orange-200 max-w-sm w-full p-2 rounded-3xl shadow-2xl">

            <form className="bg-orange-300 text-white w-full rounded-2xl p-6"
              onSubmit={(e) => {
                e.preventDefault();
                submitForm()
              }} >

              <h1 className="font-bold text-center text-4xl my-1 text-orange-800">Add Your Task</h1>

              <input type="text" placeholder="Heading" className="w-full px-4 py-2 bg-orange-500/30 rounded-md my-2 text-orange-900 font-semibold outline-none focus-ring-2 focus-ring-orange"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }} />

              <textarea rows={8} placeholder="Notes..." className="w-full px-4 py-2 bg-orange-500/30 rounded-md my-2 text-orange-900  font-semibold resize-none outline-none focus-ring-2 focus-ring-orange"
                value={Notes}
                onChange={(e) => {
                  setNotes(e.target.value)
                }}></textarea>

              <input type="submit" value="Add Task" className="w-full bg-orange-800 text-white rounded-md font-semibold px-4 py-2 my-2 active:scale-95 active:bg-orange/50  cursor-pointer transition ease-in-out" />

            </form>

          </div>

        </div>

        {/* div for show all task */}
        <div className='lg:w-1/2 w-full h-screen lg:border-l-2 max-lg:border-t-2 border-dashed bg-orange-50 flex flex-wrap items-center justify-center p-6 gap-6 overflow-auto'>

          {Tasks.map((task, id) => {
            return (
              <div className="relative w-full max-w-78 h-78 bg-white rounded-4xl shadow-2xl flex items-end justify-center p-3 "
                key={id}>

                <img src="image.png" alt="pin" className="w-15 h-15 absolute z-10 top-2 left-28" />

                <div className="w-full h-58 bg-orange-200 rounded-3xl p-4">
                  <h1 className="text-3xl font-bold text-orange-800">{id + 1}</h1>
                  <h1 className="text-2xl font-semibold text-center my-1 text-orange-900">{task.Heading}</h1>
                  <p className="text-orange-500 font-medium text-xl">{task.List}</p>
                </div>

              </div>
            )
          })}

        </div>

      </section>
    </>
  )
}

export default App