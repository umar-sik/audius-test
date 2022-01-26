import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './style.scss';

// Icons
import KeyIcon from '@mui/icons-material/Key';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';

// Images
import logo from '../../images/GARNET.png';

// Components
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';
import TokenManagement from '../../components/TokenManagement/TokenManagement';
import MobileMenu from '../../components/MobileMenu/MobileMenu';
import Dashboard from '../Dashboard';
import { ContainerRegister } from '../../context/container';

const Account = () => {
	const [tab, setTab] = useState(1);
	const { logOut } = ContainerRegister.useContainer();

	console.log(tab);

	return (
		<Box display='flex' height='100vh'>
			<Box
				display={{ xs: 'none', md: 'flex' }}
				className='account-LeftSide'
			>
				<Box height={1}>
					<Box className='account-logoBox'>
						<Typography className='account-logoTitle'>
							garnet
						</Typography>
					</Box>
					<Box
						onClick={() => setTab(1)}
						className={
							tab === 1
								? 'account-adjustOptionMarked'
								: 'account-adjustOption'
						}
					>
						<BuildIcon
							sx={{
								color: 'white',
								fontSize: 20,
								marginRight: '10px',
							}}
						/>
						<Typography className='account-optionText' variant='h6'>
							Builds
						</Typography>
					</Box>
					<Box
						onClick={() => setTab(2)}
						className={
							tab === 2
								? 'account-adjustOptionMarked'
								: 'account-adjustOption'
						}
					>
						<PersonOutlineIcon
							sx={{
								color: 'white',
								fontSize: 20,
								marginRight: '10px',
							}}
						/>
						<Typography className='account-optionText' variant='h6'>
							Settings
						</Typography>
					</Box>
					<Box
						onClick={() => setTab(3)}
						className={
							tab === 3
								? 'account-adjustOptionMarked'
								: 'account-adjustOption'
						}
					>
						<KeyIcon
							sx={{
								color: 'white',
								fontSize: 20,
								marginRight: '10px',
							}}
						/>
						<Typography className='account-optionText' variant='h6'>
							Token Management
						</Typography>
					</Box>
				</Box>
				<Box className='account-menu'>
					<Link to='/' className='account-logOutLink'>
						<LogoutIcon
							titleAccess='Log Out'
							onClick={logOut}
							fontSize='large'
							className='account-logOutIcon'
						/>
					</Link>
				</Box>
			</Box>
			{tab === 1 && (
				<>
					<Dashboard />
				</>
			)}
			{tab === 2 && (
				<>
					<PersonalInformation />
				</>
			)}
			{tab === 3 && (
				<>
					<TokenManagement />
				</>
			)}

			<Box className='tokenManagement-menuButton'>
				<MobileMenu changeTab={setTab} changeTab2={setTab} />
			</Box>
		</Box>
	);
};
export default Account;
