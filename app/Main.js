import * as React from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('app')
const root = createRoot(container)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// My Components
import Header from './components/Header'
import Footer from './components/Footer'
import HomeGuest from './components/HomeGuest'
import About from './components/About'
import Terms from './components/Terms'

function Main() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<HomeGuest />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/terms' element={<Terms />} />
			</Routes>
			<Footer />
		</Router>
	)
}

root.render(<Main tab='home' />)

if (module.hot) {
	module.hot.accept()
}
