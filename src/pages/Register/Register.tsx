import { Grid, Box, TextField, Button, Typography } from '@material-ui/core';
import { ContainerRegister } from '../../context/container';
import { Link } from 'react-router-dom';
import './style.scss';

// Images
import logo from '../../images/GARNET.png';

const Resgister = () => {
	const { fields, Register, onChangeField } =
		ContainerRegister.useContainer();

	return (
		<Grid className='register-BoxMain'>
			<Box width='100%' sx={{ display: { xs: 'none', md: 'block' } }}>
				<Grid className='login-LeftPanel'></Grid>
			</Box>
			<Grid xs={12} lg={7} className='register-RightPanel'>
				<Typography className='register-Logo'>garnet</Typography>
				<TextField
					className='register-TextField'
					type='Username'
					size='small'
					placeholder='Username'
					onChange={onChangeField('name')}
					value={fields.name}
					InputProps={{
						disableUnderline: true,
					}}
				/>
				<TextField
					className='register-TextField'
					type='Username'
					placeholder='Email'
					size='small'
					onChange={onChangeField('email')}
					value={fields.email}
					InputProps={{
						disableUnderline: true,
					}}
				/>
				<TextField
					className='register-TextField'
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
						onClick={Register}
						variant='contained'
						color='primary'
						className='register-Button'
					>
						SIGN UP
					</Button>
				</Box>
				<Typography
					variant='subtitle2'
					className='register-SignUp'
					color='primary'
				>
					Already have an account?
					<Link
						to='/'
						style={{ color: '#fa541c', marginLeft: '4px' }}
					>
						Sign in
					</Link>
				</Typography>
			</Grid>
		</Grid>
	);
};
export default Resgister;
