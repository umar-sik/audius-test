import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import './style.scss';

interface InfoBoxProps {
	title?: string;
	content?: string;
}

const InfoBox: React.FC<InfoBoxProps> = (props) => {
	const { title, content } = props;
	return (
		<Box className='infoBox-container'>
			<Typography className='infoBox-text'>{title}</Typography>
			<Typography className='infoBox-text'>{content}</Typography>
		</Box>
	);
};

export default InfoBox;
