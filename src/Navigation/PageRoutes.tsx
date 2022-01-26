import React, {
	Fragment,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import { API_URL, FRONT_URL } from '../constants';

/// Pages
import Login from '../pages/Login/Login';
import Resgister from '../pages/Register/Register';
import Account from '../pages/Account';

interface PrivateRouteProps {
	Component: any;
}

const getAuthentication = async (
	setIsAuth: Dispatch<SetStateAction<boolean>>
) => {
	try {
		const isAuth = await axios.get(API_URL + '/authentication', {
			withCredentials: true,
		});
		return setIsAuth(isAuth?.status === 200);
	} catch {
		window.location.href = `${FRONT_URL}/login`;
	}
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	Component,
	...rest
}) => {
	const [isAuth, setIsAuth] = useState(false);
	useEffect(() => {
		getAuthentication(setIsAuth);
	}, []);

	if (!isAuth) return <Fragment />;

	return <Component />;
};

export default function PageRoutes() {
	return (
		<Box>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Resgister />} />
				<Route
					path='/'
					element={<PrivateRoute Component={Account} />}
				/>
			</Routes>
		</Box>
	);
}
