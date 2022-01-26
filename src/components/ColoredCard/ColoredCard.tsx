import { Box, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import './style.scss';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface CardProps {
	title?: string;
	pastTime: string;
	presentTime: string;
	branch?: string;
	commit: string;
	author?: string;
	pr: string;
	status?: string;
	id?: string;
}

const ColoredCard: React.FC<CardProps> = (props) => {
	const { pastTime, pr, branch, commit, author, status, id } = props;
	const pastTimeFormatted = new Date(pastTime).toLocaleString();
	const prTimeFormatted = new Date(pr).toLocaleString();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const handleClick = () => {
		enqueueSnackbar('Token copied', {
			variant: 'success',
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
		navigator.clipboard.writeText(commit);
	};

	return (
		<>
			<Box
				className={
					status === 'success'
						? 'ColoredCard-BoxMainSuccess'
						: status === 'error'
						? 'ColoredCard-BoxMainError'
						: 'ColoredCard-BoxMainWarning'
				}
			>
				<Box className='ColoredCard-TitleBox'>
					<Box
						title='Branch Name'
						display='flex'
						flexDirection='row'
						alignItems='center'
					>
						<Typography variant='subtitle1'>
							Branch: {branch}
						</Typography>
					</Box>
					<Box
						title='Commit Creation'
						className='ColoredCard-TimeBox'
					>
						<AccessTimeIcon fontSize='small' />
						<Typography
							variant='subtitle1'
							className='ColoredCard-timeText'
						>
							{pastTimeFormatted}
						</Typography>
					</Box>
				</Box>
				<Box className='ColoredCard-TitleBox'>
					<Box
						title='Commit ID'
						display='flex'
						flexDirection='row'
						alignItems='center'
					>
						<Typography variant='subtitle1'>
							Commit: {commit}
						</Typography>
						<Box ml={1}>
							<ContentCopyIcon
								cursor='pointer'
								onClick={handleClick}
							/>
						</Box>
					</Box>
				</Box>
				<Typography
					title='Pull Request Author'
					className='ColoredCard-timeText'
				>
					Author: {author}
				</Typography>
				<Typography title='Build Id' className='ColoredCard-timeText'>
					Id: {id}
				</Typography>
				<Typography
					title='Pull Request'
					className='ColoredCard-timeText'
				>
					Merge pull request: {prTimeFormatted}
				</Typography>
			</Box>
		</>
	);
};

export default ColoredCard;
