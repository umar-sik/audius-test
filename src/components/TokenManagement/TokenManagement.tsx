import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Box,
	Typography,
	InputAdornment,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@material-ui/core';
import TextField from '@mui/material/TextField';

import { useSnackbar } from 'notistack';
import DatePicker from '@mui/lab/DatePicker';

import './style.scss';

// Icons
import ClearIcon from '@mui/icons-material/Clear';

// Components
import { ContainerRegister } from '../../context/container';
import TokenBox from '../../components/TokenBox/TokenBox';
import { API_URL } from '../../constants';

const TokenManagement = () => {
	const { userTokens, getToken } = ContainerRegister.useContainer();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [name, setName] = useState('');
	const [expireDate, setExpireDate] = useState<any>(new Date());

	const generateToken = () => {
		console.log(expireDate);
		if (expireDate && expireDate.invalid) {
			return enqueueSnackbar('Invalid expiration Date!', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		}
		const payload: any = { name };
		if (expireDate) {
			if (day !== 0) {
				expireDate.setDate(expireDate.getDate() + day);
				payload.expiration = expireDate.toISOString();
			} else {
				payload.expiration = expireDate.toISO();
			}
		}
		axios
			.post(`${API_URL}/token/create`, payload, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.status);
				getToken();
				setName('');
				setExpireDate(null);
				enqueueSnackbar('Token generated', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	useEffect(() => {
		getToken();
	}, []);

	const deleteToken = (id: number) => () => {
		axios
			.delete(`${API_URL}/token/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				console.log(response.status);
				getToken();
				enqueueSnackbar('Token deleted', {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'right',
					},
				});
			});
	};

	const [day, setDay] = useState<any>(null);

	const handleChange = (event) => {
		setDay(event.target.value);
	};

	return (
		<>
			<Box className='tokenManagement-mainBox'>
				<Typography variant='h5'>GENERATE TOKEN</Typography>
				<Box className='tokenManagement-generateBox'>
					<Box className='tokenManagement-generateToken'>
						<Box display='flex'>
							<Box width='100%'>
								<Typography variant='subtitle1'>
									Token Name:
								</Typography>
								<TextField
									placeholder='Write Here'
									className='tokenManagement-Input'
									onChange={(event) => {
										setName(event.target.value);
									}}
									value={name}
									InputProps={{
										disableUnderline: true,
										endAdornment: (
											<InputAdornment position='start'>
												<ClearIcon
													onClick={() => setName('')}
													cursor='pointer'
													fontSize='small'
												/>
											</InputAdornment>
										),
									}}
								/>
							</Box>
							<Box
								className='tokenManagement-expirationContainer'
								ml={2}
							>
								<Typography variant='subtitle1'>
									Expiration:
								</Typography>

								<FormControl className='tokenManagement-SelectDate'>
									<Select
										value={day}
										onChange={handleChange}
										displayEmpty
										inputProps={{
											'aria-label': 'Without label',
										}}
										disableUnderline
										aria-disabled
										className='tokenManagement-select'
									>
										<MenuItem value={1}>1 day</MenuItem>
										<MenuItem value={7}>7 days</MenuItem>
										<MenuItem value={15}>15 days</MenuItem>
										<MenuItem value={30}>30 days</MenuItem>
										<MenuItem value={0}>Custom</MenuItem>
									</Select>
								</FormControl>
								{day === 0 ? (
									<DatePicker
										className='tokenManagement-datePicker'
										value={expireDate}
										mask='__/__/____'
										onChange={(newValue) => {
											setExpireDate(newValue);
										}}
										renderInput={(params) => (
											<TextField
												placeholder='__/__/____'
												InputLabelProps={{
													shrink: true,
												}}
												className='tokenManagement-InputDate'
												{...params}
											/>
										)}
									/>
								) : null}
							</Box>
						</Box>
					</Box>
					<Box className='tokenManagement-generateButtonBox'>
						<Button
							disabled={name.length === 0}
							className='tokenManagement-generateButton'
							variant='outlined'
							onClick={generateToken}
						>
							GENERATE
						</Button>
					</Box>
				</Box>
				<Typography variant='h5'>MY TOKENS</Typography>
				<Box className='tokenManagement-myTokensBox'>
					{userTokens.map((item) => (
						<TokenBox
							name={item.name}
							token={item.key}
							deleteToken={deleteToken(item.id)}
						/>
					))}
				</Box>
			</Box>
		</>
	);
};
export default TokenManagement;
