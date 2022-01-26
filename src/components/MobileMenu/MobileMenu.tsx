import { Box, Typography, Popper } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

// Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import KeyIcon from '@mui/icons-material/Key';
import BuildIcon from '@mui/icons-material/Build';

interface MobileMenuProps {
	changeTab: Dispatch<SetStateAction<number>>;
	changeTab2: Dispatch<SetStateAction<number>>;
}

const MobileMenu: React.FC<MobileMenuProps> = (props) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;
	return (
		<>
			<Box
				aria-describedby={id}
				onClick={handleClick}
				className='mobileMenu-mobileMenuBox'
			>
				<MenuIcon />
				<Popper anchorEl={anchorEl} open={open} transition>
					<Box
						display='flex'
						flexDirection='column'
						boxShadow='2px 1px 5px 1px rgba(0, 0, 0, 0.38)'
						mr={2}
						mb={1}
					>
						<Box
							onClick={() => props.changeTab(2)}
							className='mobileMenu-adjustOption'
						>
							<PersonOutlineIcon
								sx={{ fontSize: 25, marginRight: '10px' }}
							/>
							<Typography variant='h6'>Settings</Typography>
						</Box>
						<Box
							onClick={() => props.changeTab2(3)}
							className='mobileMenu-adjustOption'
						>
							<KeyIcon
								sx={{ fontSize: 25, marginRight: '10px' }}
							/>
							<Typography variant='h6'>
								Token Management
							</Typography>
						</Box>

						<Box
							onClick={() => props.changeTab2(1)}
							className='mobileMenu-adjustOption'
						>
							<BuildIcon
								sx={{ fontSize: 25, marginRight: '10px' }}
							/>
							<Typography variant='h6'>Builds</Typography>
						</Box>
					</Box>
				</Popper>
			</Box>
		</>
	);
};

export default MobileMenu;
