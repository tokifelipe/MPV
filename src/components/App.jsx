import React from 'react';
import {
	Routes,
	Route,
	BrowserRouter
} from 'react-router-dom';

import HomePage from '../pages/HomePage';
import InternalPage from '../pages/InternalPage';
import MenuPage from '../pages/MenuPage';
import EditPage from '../pages/EditPage';

const App = () => {
    return (
      	<BrowserRouter>
			<Routes>
				<Route path='/' element={<MenuPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/internal' element={<InternalPage />} />
				<Route path='/edit' element={<EditPage />} />
			</Routes>
			
		</BrowserRouter>
    )
}

export default App;