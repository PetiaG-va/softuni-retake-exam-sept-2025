import { Route, Routes } from "react-router"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Plants from "./components/plants/Plants.jsx"

function App() {
	return (
		<>
		<div className="app-wrapper">
			<Header />
			<main>
				<div className="container">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/plants" element={<Plants />} />
			</Routes>

				</div>
			</main>

		</div>

			
		</>
	)
}

export default App
