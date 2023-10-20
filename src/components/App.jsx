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
import PlanPage from '../pages/PlanPage';
import ViewPage from '../pages/ViewPage';

const App = () => {
    return (
      	<BrowserRouter>
			<Routes>
				<Route path='/' element={<MenuPage />} />
				<Route path='/plan' element={<PlanPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/internal' element={<InternalPage />} />
				<Route path='/edit/:value' element={<EditPage />} />
				<Route path='/minute/:value' element={<ViewPage />} />
				
			</Routes>
			
		</BrowserRouter>
    )
}

export default App;