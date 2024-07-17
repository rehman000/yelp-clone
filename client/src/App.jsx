import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdateRestaurant from './routes/UpdateRestaurant';
import RestaurantDetailsPage from './routes/RestaurantDetailsPage';


const App = () =>  {
    return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={Home}></Route>
                <Route path="/restaurants/:id/update" element={UpdateRestaurant}></Route>
                <Route path="/restaurants/:id" element={RestaurantDetailsPage}></Route>
            </Routes>
        </Router>
    </div>
    );
};

export default App;