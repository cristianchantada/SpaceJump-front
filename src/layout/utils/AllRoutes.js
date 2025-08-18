import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteUserPage from '../auth/deleteUser/DeleteUserPage.jsx';
import PurchasedTravel from '../../components/PurchasedTravel.jsx';
import RememberPassword from '../auth/login/RememberPassword.js';
import EditTravelPage from '../../components/EditTravelPage.jsx';
import TravelDescription from '../travels/TravelDescription.js';
import NewTravelPage from '../../components/NewTravelPage.jsx';
import UpdatePassword from '../auth/login/UpdatePassword.js';
import UpdateUser from '../auth/updateUser/updateUser.js';
import TravelFavorite from '../travels/TravelFavorite.js';
import NewUserPage from '../auth/Signup/NewUserPage.jsx';
import TravelBuyNow from '../travels/TravelBuyNow.js';
import LoginPage from '../auth/login/loginPage.jsx';
import TravelUser from '../travels/TravelUser.js';
import TravelBuy from '../travels/TravelBuy.js';
import TravelChat from '../chat/TravelChat.js';
import Travels from '../travels/Travels.js';
import RequireAuth from '../RequireAuth.js';
import Error404 from './error-404.js';
import Home from '../home/Home.jsx';
import React from 'react';

function AllRoutes() {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/travels"
					element={<Travels />}
				/>
				<Route
					path="/travel/:topic/:id"
					element={<TravelDescription />}
				/>
				<Route
					path="/signup"
					element={<NewUserPage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/newtravel"
					element={
						<RequireAuth>
							<NewTravelPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/password"
					element={<RememberPassword />}
				/>
				<Route
					path="/deleteUser"
					element={
						<RequireAuth>
							<DeleteUserPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/updateUser"
					element={
						<RequireAuth>
							<UpdateUser />
						</RequireAuth>
					}
				/>
				<Route
					path="/travel-edit/:topic/:id"
					element={<EditTravelPage />}
				/>
				<Route
					path="/congratulations"
					element={<PurchasedTravel />}
				/>
				<Route
					path="/travel-user/:user"
					element={<TravelUser />}
				/>
				<Route
					path="/travel-favorite"
					element={
						<RequireAuth>
							<TravelFavorite />
						</RequireAuth>
					}
				/>
				<Route
					path="/travel-buy"
					element={
						<RequireAuth>
							<TravelBuy />
						</RequireAuth>
					}
				/>
				<Route
					path="/recorderPassword/:token"
					element={<UpdatePassword />}
				/>
				<Route
					path="*"
					element={<Error404 />}
				/>
				<Route
					path="/travelBuy/:id"
					element={
						<RequireAuth>
							<TravelBuyNow />
						</RequireAuth>
					}
				/>
				<Route
					path="/travelChat/:id"
					element={
						<RequireAuth>
							<TravelChat />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
}

export default AllRoutes;
