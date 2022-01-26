import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { API_URL } from '../../constants';
import { useSnackbar } from 'notistack';
import './style.scss';

// Components
import FormOverlay from '../FormOverlay/FormOverlay';

const PersonalInformation = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [NameFormOverlay, setNameFormOverlay] = useState(false);
	const [emailFormOverlay, setEmailFormOverlay] = useState(false);
	const [passwordFormOverlay, setPasswordFormOverlay] = useState(false);
	const [slackWebhookOverlay, setSlackWebhookOverlay] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [slackWebhook, setSlackWebhook] = useState('');
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		slackWebhook: '',
	});

	const updateEmail = () => {
		axios
			.patch(
				`${API_URL}/users/change-email`,
				{ email },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				setUser({ ...user, email });
				console.log(response.status);
				setEmailFormOverlay(false);
				enqueueSnackbar('Email successfully updated', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const updatePassword = () => {
		axios
			.patch(
				`${API_URL}/users/change-password`,
				{ password },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log(response.status);
				setUser({ ...user, password });
				setPasswordFormOverlay(false);
				enqueueSnackbar('Password successfully updated', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const updateSlackWebhook = () => {
		axios
			.patch(
				`${API_URL}/users/change-slack-webhook`,
				{ slackWebhook },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				setUser({ ...user, slackWebhook });
				console.log(response.status);
				setSlackWebhookOverlay(false);
				enqueueSnackbar('Slack Webhook successfully updated', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const updateName = () => {
		axios
			.patch(
				`${API_URL}/users/change-name`,
				{ name },
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				console.log(response.status);
				setNameFormOverlay(false);
				setUser({ ...user, name });
				enqueueSnackbar('Name successfully updated', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const getUser = () => {
		axios
			.get(API_URL + '/authentication', {
				withCredentials: true,
			})
			.then((response) => {
				const newUser = {
					email: response.data.email,
					name: response.data.name,
					password: response.data.password,
					slackWebhook: response.data.slackWebhook,
				};
				setUser(newUser);
			});
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			{NameFormOverlay === true ? (
				<FormOverlay
					onClose={() => setNameFormOverlay(false)}
					onSubmit={() => updateName()}
					disabled={!name}
				>
					<TextField
						onChange={(event) => {
							setName(event.target.value);
						}}
						className='Login-TextField'
						placeholder='Name'
						InputProps={{
							disableUnderline: true,
						}}
					/>
				</FormOverlay>
			) : (
				<></>
			)}
			{passwordFormOverlay === true ? (
				<FormOverlay
					onClose={() => setPasswordFormOverlay(false)}
					onSubmit={() => updatePassword()}
					disabled={!password}
				>
					<TextField
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						className='Login-TextField'
						placeholder='Password'
						InputProps={{
							disableUnderline: true,
						}}
					/>
				</FormOverlay>
			) : (
				<></>
			)}
			{slackWebhookOverlay && (
				<FormOverlay
					onClose={() => setSlackWebhookOverlay(false)}
					onSubmit={() => updateSlackWebhook()}
				>
					<TextField
						onChange={(event) => {
							setSlackWebhook(event.target.value);
						}}
						className='Login-TextField'
						placeholder='Webhook'
						InputProps={{
							disableUnderline: true,
						}}
					/>
				</FormOverlay>
			)}
			{emailFormOverlay === true ? (
				<FormOverlay
					onClose={() => setEmailFormOverlay(false)}
					onSubmit={() => updateEmail()}
					disabled={!email}
				>
					<TextField
						onChange={(event) => {
							setEmail(event.target.value);
						}}
						className='Login-TextField'
						placeholder='Email'
						InputProps={{
							disableUnderline: true,
						}}
					/>
				</FormOverlay>
			) : (
				<></>
			)}
			<Box className='personalInformation-mainBox'>
				<Typography variant='h5'>Account Information</Typography>
				<Box className='personalInformation-AccountInformation'>
					<Box className='personalInformation-AccountInformationName'>
						<Typography variant='h6'>Name:</Typography>
						<Typography
							variant='h6'
							className='personalInformation-Name'
						>
							{user.name}
						</Typography>
					</Box>
					<Button
						className='personalInformation-ChangeButton'
						variant='outlined'
						onClick={() => setNameFormOverlay(true)}
					>
						Change
					</Button>
				</Box>
				<Typography variant='h5'>Personal Information</Typography>
				<Box className='personalInformation-InformationBox' mb={2}>
					<Box className='personalInformation-tableRow'>
						<Box className='personalInformation-AccountInformationName'>
							<Typography
								variant='h6'
								className='personalInformation-leftSide'
							>
								Email:
							</Typography>
							<Typography
								variant='h6'
								className='personalInformation-middleSide'
							>
								{user.email}
							</Typography>
						</Box>
						<Box className='personalInformation-rightSide'>
							<Button
								className='personalInformation-ChangeButton'
								variant='outlined'
								onClick={() => setEmailFormOverlay(true)}
							>
								Change
							</Button>
						</Box>
					</Box>
					<Box className='personalInformation-tableRow'>
						<Box className='personalInformation-AccountInformationName'>
							<Typography
								variant='h6'
								className='personalInformation-leftSide'
							>
								Password:
							</Typography>
							<Typography
								variant='h6'
								className='personalInformation-middleSidePassword'
							>
								*********
							</Typography>
						</Box>
						<Box className='personalInformation-rightSide'>
							<Button
								className='personalInformation-ChangeButton'
								variant='outlined'
								onClick={() => setPasswordFormOverlay(true)}
							>
								Change
							</Button>
						</Box>
					</Box>
				</Box>
				<Typography variant='h5'>Slack Integration</Typography>
				<Box className='personalInformation-InformationBox'>
					<Box className='personalInformation-tableRow'>
						<Box className='personalInformation-AccountInformationName'>
							<Typography variant='h6'>Slack Webhook:</Typography>
							<Typography
								variant='h6'
								className='personalInformation-middleSide'
							>
								{user.slackWebhook}
							</Typography>
						</Box>
						<Box className='personalInformation-rightSide'>
							<Button
								className='personalInformation-ChangeButton'
								variant='outlined'
								onClick={() => setSlackWebhookOverlay(true)}
							>
								Change
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};
export default PersonalInformation;
