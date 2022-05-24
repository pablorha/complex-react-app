import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')
const root = createRoot(container)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios'
Axios.defaults.baseURL = 'http://localhost:8080'

// My Components
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import HomeGuest from './components/HomeGuest'
import About from './components/About'
import Terms from './components/Terms'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')))
	return (
		<Router>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
			<Routes>
				<Route path='/' element={loggedIn ? <Home /> : <HomeGuest />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/terms' element={<Terms />} />
				<Route path='/create-post' element={<CreatePost />} />
				<Route path='/post/:id' element={<ViewSinglePost />} />
			</Routes>
			<Footer />
		</Router>
	)
}

root.render(<Main tab='home' />)

if (module.hot) {
	module.hot.accept()
}
