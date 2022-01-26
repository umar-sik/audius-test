import { Box, Typography } from '@material-ui/core';
import './style.scss';

// Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GitHubIcon from '@mui/icons-material/GitHub';
import TagIcon from '@mui/icons-material/Tag';
import CancelIcon from '@mui/icons-material/Cancel';

interface CardProps {
	title: string;
	pastTime: string;
	presentTime: string;
	test: string;
	success: boolean;
	pending: boolean;
	onClick: () => void;
}

const Card: React.FC<CardProps> = (props) => {
	const { pastTime, pending, success, test, title, onClick } = props;
	const pastTimeFormatted = new Date(pastTime).toLocaleString();

	return (
		<>
			<Box className='Card-BoxMain' onClick={onClick}>
				<Box className='Card-TitleBox'>
					<Box display='flex' flexDirection='row' alignItems='center'>
						<Box mr={1}>
							<GitHubIcon />
						</Box>
						<Typography variant='h6'>{title}</Typography>
					</Box>
					{pending ? (
						<AccessTimeIcon
							titleAccess='Compiling'
							fontSize='medium'
							color='warning'
						/>
					) : success ? (
						<CheckCircleIcon
							titleAccess='Success'
							fontSize='medium'
							color='success'
						/>
					) : (
						<CancelIcon
							titleAccess='Error'
							fontSize='medium'
							color='error'
						/>
					)}
				</Box>
				<Box>
					<Box title='Commit ID' className='Card-TimeBox'>
						<TagIcon color='action' fontSize='small' />
						<Typography
							variant='subtitle1'
							className='Card-timeText'
						>
							{test}
						</Typography>
					</Box>
					<Box title='Commit Time' className='Card-TimeBox'>
						<AccessTimeIcon color='action' fontSize='small' />
						<Typography
							variant='subtitle1'
							className='Card-timeText'
						>
							{pastTimeFormatted}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Card;
