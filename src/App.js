import React from "react";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import "./App.css";

// Redux setup
const initialState = {
  0: {
    name: "Example Task 1",
    status: "complete",
  },
  1: {
    name: "Example Task 2",
    status: "",
  },
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      const newIndex = Object.keys(state).length;
      return {
        ...state,
        [newIndex]: {
          name: action.payload,
          status: "",
        },
      };

    case "DELETE_TASK":
      const newStateArr = Object.values(state);
      newStateArr.splice(action.payload, 1);
      const newState = Object.assign({}, newStateArr);
      return newState;

    case "TOGGLE_TASK_STATUS":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          status: state[action.payload].status === "complete" ? "" : "complete",
        },
      };

    default:
      return state;
  }
};

// Salva no localStorage
const loadInternalStorage = () => {
  const saved = localStorage.getItem("reduxState");
  return saved ? JSON.parse(saved) : initialState;
};

const store = createStore(todoReducer, loadInternalStorage());

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

// Componente ToDoList
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
  }

  addTask() {
    const taskName = prompt("Digite o nome da tarefa", "");
    if (taskName) {
      this.props.addTask(taskName);
    }
  }

  deleteTask(index) {
    const confirm = window.confirm("Tem certeza que quer deletar a tarefa?");
    if (confirm) {
      this.props.deleteTask(index);
    }
  }

  changeTaskStatus(index) {
    this.props.toggleStatus(index);
    console.log("toggling....");
  }

  render() {
    return (
      <div className="w-screen h-dvh overflow-hidden dark:bg-black p-6 flex justify-center items-center">
        <div className="container shadow-lg bg-white dark:bg-zinc-900 rounded-2xl w-full h-fit shadow-zinc-500 dark:shadow-zinc-800 p-5">
          <h1 className="block text-6xl font-black text-black dark:text-white text-center my-2">
            Tarefas
          </h1>
          <div
            className="w-full md:h-[65dvh] h-[70dvh] mb-6"
            id="tasks-container"
          >
            {Object.values(store.getState()).map((item, index) => (
              <div className="flex items-center text-3xl w-full" key={index}>
                <label className="flex group items-center w-full m-1 justify-between">
                  <p className="task-name w-full text-black dark:text-white">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="size-0 float-right checked:bg-red-900 p-2"
                      checked={item.status === "complete"}
                      onChange={() => this.changeTaskStatus(index)}
                    />
                    <span className="size-8 flex items-center justify-center rounded-lg bg-gray-400 hover:bg-gray-500 group-has-[:checked]:bg-blue-900 text-xl transition ease-in-out duration-300">
                      <i className="fa fa-check group-has-[:checked]:text-white text-transparent"></i>
                    </span>
                    <button
                      className="text-3xl text-black dark:text-white"
                      onClick={() => this.deleteTask(index)}
                    >
                      <i className="fa fa-close"></i>
                    </button>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <button
            className="w-full block p-1 text-3xl text-white bg-blue-700 hover:bg-blue-600 rounded-lg shadow-md hover:shadow-lg shadow-zinc-500 hover:shadow-zinc-700 dark:shadow-blue-800 dark:hover:shadow-blue-700 transition ease-in-out duration-200"
            onClick={() => this.addTask()}
          >
            <i className="fa fa-plus mx-1"></i>
            Adicionar Tarefa
          </button>
        </div>
      </div>
    );
  }
}

//cria as props e conecta o componente com a store
const mapStateToProps = (state) => ({
  tasks: state,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (name) => dispatch({ type: "ADD_TASK", payload: name }),
  deleteTask: (index) => dispatch({ type: "DELETE_TASK", payload: index }),
  toggleStatus: (index) =>
    dispatch({ type: "TOGGLE_TASK_STATUS", payload: index }),
});
const ConnectedToDoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);

//componente App
const App = () => (
  <Provider store={store}>
    <ConnectedToDoList />
  </Provider>
);
console.log(store.getState());
export default App;
