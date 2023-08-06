import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const tasks = [
	{
		TaskId: 0,
		Name: "New Event 1",
		Description: "This is a new event.",
		StartDate: "2023-08-05T23:27:28-07:00",
		Completed: false,
	},
	{
		TaskId: 1,
		Name: "New Event 2",
		Description: "This is a new event.",
		StartDate: "2023-08-05T23:27:28-07:00",
		Completed: false,
	},
	{
		TaskId: 2,
		Name: "New Event 10",
		Description: "This is a new event.",
		StartDate: "2023-08-05T23:27:28-07:00",
		Completed: false,
	},
	{
		TaskId: 3,
		Name: "New Event 11",
		Description: "This is a new event.",
		StartDate: "2023-08-18T23:27:28-07:00",
		Completed: false,
	},
	{
		TaskId: 4,
		Name: "New Event 12",
		Description: "This is a new event.",
		StartDate: "2023-08-21T23:27:28-07:00",
		Completed: false,
	},
	{
		TaskId: 5,
		Name: "New Event 17",
		Description: "This is a new event.",
		StartDate: "2023-08-31T23:27:28-07:00",
		Completed: false,
	},
];

export function TaskApp() {
	const navigate = useNavigate();
	const [taskList, setTaskList] = useState(function () {
		const response = localStorage.getItem("Tasks");
		return response ? JSON.parse(response) : tasks;
	});

	function handleRemoveTask(taskId) {
		setTaskList(taskList.filter((elem) => elem.TaskId !== taskId));
	}

	function handleMarkComplete(taskId) {
		const task = taskList.filter((elem) => elem.TaskId === taskId)[0];
		if (task.Completed) return;
		const newTaskObj = { ...task, Completed: true };
		setTaskList([...taskList.filter((elem) => elem.TaskId !== taskId), newTaskObj]);
	}

	function handleNavigation(path) {
		localStorage.setItem("Tasks", JSON.stringify([...taskList]));
		navigate(path);
	}

	return (
		<div>
			<span className="bg-purple-400 grid grid-cols-12">
				<h2 className="font-bold text-4xl md:italic text-center col-span-11 p-4"> TASKS</h2>
				<button
					className="col-span-1 text-right text-xl p-4 z-10 shadow-lg bg-purple-200"
					onClick={() => handleNavigation("/task-add")}
				>
					➕Task
				</button>
			</span>

			<ul className="text-center py-11 flex flex-wrap">
				{taskList.map((elem) => (
					<Task
						elem={elem}
						key={elem.TaskId}
						onRemoveTask={handleRemoveTask}
						onCompletion={handleMarkComplete}
					/>
				))}
			</ul>
		</div>
	);
}

function Task({ elem, onRemoveTask, onCompletion }) {
	return (
		<li
			className={`${"box-content h-40 w-96 border-4 m-4 p-1 shadow-md"} ${
				elem.Completed ? "bg-green-300" : "bg-purple-300"
			} `}
		>
			<p className="text-center py-2 text-xl font-bold md:italic">{elem.Name}</p>
			<p className="text-right py-1">{moment(elem.StartDate).format("DD MMM")}</p>
			<p className="text-justify text-sm py-1 h-16">{elem.Description}</p>
			<span className="grid grid-cols-2 gap-4 ">
				<button className="col-span-1 text-left" onClick={() => onRemoveTask(elem.TaskId)}>
					❌
				</button>
				<span className="col-span-1 text-right">
					{/* <button className="m-1">📝</button> */}
					<button onClick={() => onCompletion(elem.TaskId)}>✅</button>
				</span>
			</span>
		</li>
	);
}
