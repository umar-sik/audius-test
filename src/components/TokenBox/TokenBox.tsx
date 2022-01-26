import { Box, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import './style.scss';

// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface TokenBoxProps {
	name: string;
	token: string;
	deleteToken: () => void;
}

const TokenBox: React.FC<TokenBoxProps> = (props) => {
	const { token, name, deleteToken } = props;
	const [reveal, setReveal] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleClick = () => {
		enqueueSnackbar('Token copied', {
			variant: 'success',
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
		navigator.clipboard.writeText(token);
	};

	return (
		<>
			<Box className='tokenBox-TokenBox'>
				<Box className='tokenBox-leftSide'>
					<Typography variant='h6'>{name}</Typography>
				</Box>
				<Box className='tokenBox-middleSide'>
					{reveal === false ? (
						<Typography noWrap>**********************</Typography>
					) : (
						<Typography noWrap>{token}</Typography>
					)}
				</Box>
				<Box className='tokenBox-rightSide'>
					<ContentCopyIcon
						onClick={handleClick}
						cursor='pointer'
						fontSize='medium'
					/>
					{reveal === false ? (
						<VisibilityOffIcon
							cursor='pointer'
							fontSize='medium'
							onClick={() => setReveal(true)}
						/>
					) : (
						<RemoveRedEyeIcon
							cursor='pointer'
							fontSize='medium'
							onClick={() => setReveal(false)}
						/>
					)}
					<DeleteOutlineIcon
						onClick={() => deleteToken()}
						cursor='pointer'
						fontSize='medium'
						color='error'
					/>
				</Box>
			</Box>
		</>
	);
};

export default TokenBox;
