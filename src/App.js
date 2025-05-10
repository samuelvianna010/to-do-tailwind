import logo from "./logo.svg";
import "./App.css";
import React from "react";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem("state"));
    this.state = !localStorage.getItem("state")
      ? {
          0: {
            name: "pneumoultramicropicosilicovulcanoconiose",
            status: "complete",
          },
          1: {
            name: "pneumoultramicropicosilicovulcanoconiose",
            status: "complete",
          },
        }
      : JSON.parse(localStorage.getItem("state"));
    console.log(this.state);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
  }
  changeTaskStatus(index) {
    this.setState((oldState) => {
      return {
        ...oldState,
        [index]: {
          name: oldState[index].name,
          status: oldState[index].status == "complete" ? "" : "complete",
        },
      };
    });
    setTimeout(() => {
      console.log(this.state);
      localStorage.setItem("state", JSON.stringify(this.state));
    }, 100);
  }
  addTask() {
    console.log("teste");
    const taskName = prompt("Digite o nome da tarefa", "");
    if (taskName) {
      this.setState((oldState) => {
        const newTaskIndex = Object.keys(oldState).length;
        return {
          ...oldState,
          [newTaskIndex]: {
            name: taskName,
            status: "",
          },
        };
      });
      setTimeout(() => {
        console.log(this.state);
        localStorage.setItem("state", JSON.stringify(this.state));
      }, 100);
    }
  }
  render() {
    return (
      <div className="w-screen h-screen dark:bg-black p-6 flex justify-center items-center">
        <div className="container shadow-lg bg-white dark:bg-zinc-950 rounded-2xl w-full h-fit shadow-black p-5">
          <h1 className="block text-6xl font-black text-black dark:text-white text-center my-2">
            Tasks
          </h1>
          <div
            className="w-full md:h-[65dvh] h-[70dvh] mb-6"
            id="tasks-container"
          >
            {Object.values(this.state).map((item, index) => (
              <div
                className="flex items-center text-3xl w-full"
                key={index}
                id={index}
              >
                <label className="flex group items-center w-full m-1 justify-between">
                  <p className="task-name w-[80%] text-black dark:text-white">
                    {item.name}
                  </p>
                  <input
                    type="checkbox"
                    className="size-0 float-right checked:bg-red-900 p-2"
                    checked={item.status == "complete" ? "checked" : ""}
                    onChange={() => this.changeTaskStatus(index)}
                  />
                  <span className="size-8 flex items-center justify-center rounded-lg bg-gray-400 hover:bg-gray-500 group-has-[:checked]:bg-blue-900 text-xl transition ease-in-out">
                    <i className="fa fa-check group-has-[:checked]:text-white text-transparent :"></i>
                  </span>
                </label>
              </div>
            ))}
          </div>
          <button
            className="w-full block p-1 text-3xl text-white bg-blue-700 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg hover:shadow-black shadow-black transition ease-in-out duration-200"
            onClick={() => this.addTask()}
          >
            Add Task
          </button>
        </div>
      </div>
    );
  }
}

function App() {
  return <ToDoList />;
}

export default App;
