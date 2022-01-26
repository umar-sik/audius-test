import { Grid, Box, TextField, Button, Typography } from '@material-ui/core';
import { ContainerRegister } from '../../context/container';
import { Link } from 'react-router-dom';
import './style.scss';

// Images
import logo from '../../images/GARNET.png';

const Login = () => {
	const { fields, Login, onChangeField } = ContainerRegister.useContainer();

	return (
		<Grid className='login-BoxMain'>
			<Box width='100%' sx={{ display: { xs: 'none', lg: 'block' } }}>
				<Grid className='login-LeftPanel'></Grid>
			</Box>
			<Grid xs={12} md={7} className='login-RightPanel'>
				<Typography className='login-Logo'>garnet</Typography>
				<TextField
					placeholder='Email'
					size='small'
					className='Login-TextField'
					onChange={onChangeField('email')}
					value={fields.email}
					InputProps={{
						disableUnderline: true,
					}}
				/>

				<TextField
					className='Login-TextField'
					placeholder='Password'
					type='password'
					size='small'
					onChange={onChangeField('password')}
					value={fields.password}
					InputProps={{
						disableUnderline: true,
					}}
				/>
				<Box my={4} width='100%' display='flex' justifyContent='center'>
					<Button
						onClick={Login}
						variant='contained'
						color='primary'
						className='login-Button'
					>
						SIGN IN
					</Button>
				</Box>
				<Link to='/Register' style={{ color: '#fa541c' }}>
					<Typography
						variant='subtitle2'
						className='login-SignUp'
						color='primary'
					>
						Dont have account? Sign Up
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
};
export default Login;
