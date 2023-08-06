import { Route, Routes } from "react-router-dom";

import { TaskApp } from "./Taskapp";
import { TaskAdd } from "./TaskAdd";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<TaskApp />}></Route>
			<Route path="/task-add" element={<TaskAdd />}></Route>
			<Route path="/task-add" element={<TaskAdd />}></Route>
		</Routes>
	);
}
