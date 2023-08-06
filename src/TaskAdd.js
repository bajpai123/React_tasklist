import { useRef, useReducer, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export function TaskAdd() {
	const navigate = useNavigate();

	const [tasks, setTasks] = useState([]);

	const taskList = JSON.parse(localStorage.getItem("Tasks")) || [];
	console.log(taskList);

	function handleTaskAdd(taskObj) {
		setTasks((elem) => [...elem, taskObj]);
	}

	function handleBackButton() {
		localStorage.setItem("Tasks", JSON.stringify([...tasks, ...taskList]));
		navigate("/");
	}

	return (
		<div>
			<span className="grid grid-cols-12 bg-purple-400">
				<button
					className="col-span-1 text-center shadow-lg text-4xl p-1 bg-purple-200"
					onClick={handleBackButton}
				>
					🔙
				</button>
				<h2 className="col-span-11 text-center p-1 text-3xl">Add New Task</h2>
			</span>
			<AddTask onTaskAdd={handleTaskAdd} id={taskList.length + 1} />
			<ShowTasks tasks={tasks} />
		</div>
	);
}

function AddTask({ onTaskAdd, id }) {
	const [taskState, dispatcher] = useReducer(formActions, formStates);
	let taskId = useRef(id);

	function handleFormSubmission(e) {
		e.preventDefault();
		if (!taskState.Name || !taskState.Description) return;
		onTaskAdd({
			...taskState,
			startDate: moment().format("DD MMM"),
			Completed: false,
			TaskId: taskId.current,
		});
		taskId.current += 1;
		dispatcher({ type: "name", value: "" });
		dispatcher({ type: "details", value: "" });
	}

	return (
		<>
			<div className="grid grid-cols-3">
				<span className="w-0 h-0 col-span-1"></span>
				<form className="col-span-1 bg-purple-100 p-4 m-4 text-xl" onSubmit={(e) => handleFormSubmission(e)}>
					<span className="grid grid-cols-3 p-2 ">
						<label className="col-span-1">Name:</label>
						<input
							className="col-span-2"
							type="text"
							value={taskState.Name}
							onChange={(e) => dispatcher({ type: "name", value: e.target.value })}
						/>
					</span>
					<span className="grid grid-cols-3 p-2">
						<label className="col-span-1">Details:</label>
						<input
							className="col-span-2"
							type="text"
							value={taskState.Description}
							onChange={(e) => dispatcher({ type: "details", value: e.target.value })}
						/>
					</span>

					<span className="grid grid-cols-3 p-2 ">
						<label className="col-span-1">Added On:</label>
						<label className="col-span-2 text-center">{moment().format("DD MMM yyyy")}</label>
					</span>
					<span className=" grid grid-cols-1 p-3 m-2">
						<button className="bg-purple-500 text-2xl shadow-lg z-10">Add</button>
					</span>
				</form>
			</div>
			<div></div>
		</>
	);
}

const formStates = {
	Name: "",
	Description: "",
};

const formActions = function (state, action) {
	switch (action.type) {
		case "name":
			return { ...state, Name: action.value };
		case "details":
			return { ...state, Description: action.value };
		default:
			return state;
	}
};

function ShowTasks({ tasks }) {
	return (
		<ul className="text-center py-11 flex">
			{tasks.map((elem) => (
				<Task elem={elem} />
			))}
		</ul>
	);
}

function Task({ elem }) {
	return (
		<li className="box-content h-40 w-40 border-4 m-4 p-1 shadow-md bg-purple-300">
			<p className="text-center py-2 text-xl font-bold md:italic">{elem.Name}</p>
			<p className="text-right py-1">{elem.startDate}</p>
			<p className="text-justify text-sm py-1 h-16">{elem.Description}</p>
		</li>
	);
}
