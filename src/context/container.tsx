import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useSnackbar } from 'notistack';
import { createContainer } from 'unstated-next';
import { API_URL, FRONT_URL } from '../constants';

interface Token {
	id: number;
	name: string;
	key: string;
}

const useForm = () => {
	const [userTokens, setUserTokens] = useState<Token[]>([]);
	const [fields, setFields] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const onChangeField =
		(field: string) =>
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setFields({ ...fields, [field]: event.target.value });

	const Register = (response: any) => {
		axios
			.post(`${API_URL}/authentication/register`, fields)
			.then((response) => {
				console.log(response.status);
				enqueueSnackbar('Create Account Success', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
				window.location.href = `${FRONT_URL}/login`;
			})
			.catch((error) => {
				enqueueSnackbar(`${error.status}`, {
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const Login = (response: any) => {
		axios
			.post(`${API_URL}/authentication/log-in`, fields, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.status);
				enqueueSnackbar('Login Success', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
				window.location.href = `${FRONT_URL}`;
			})
			.catch((error) => {
				console.log(error);
				enqueueSnackbar(`Wrong Credentials`, {
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const getToken = () => {
		axios
			.get(`${API_URL}/token`, {
				withCredentials: true,
			})
			.then((response) => {
				setUserTokens(response.data);
			})
			.catch((error) => {
				window.location.href = `${FRONT_URL}/login`;
			});
	};

	const logOut = async () => {
		try {
			await axios.post(
				API_URL + '/authentication/log-out',
				{},
				{
					withCredentials: true,
				}
			);
		} finally {
			window.location.href = `${FRONT_URL}/login`;
		}
	};

	return {
		fields,
		userTokens,
		Register,
		Login,
		onChangeField,
		getToken,
		logOut,
	};
};

export const ContainerRegister = createContainer(useForm);
