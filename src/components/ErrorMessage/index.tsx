import { Box, Typography } from '@material-ui/core';
import './style.scss';

interface ErrorMessageProps {
	description?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
	const { description } = props;
	return (
		<Box className='ErrorMessage-MainBox'>
			<Typography variant='subtitle2'>{description}</Typography>
		</Box>
	);
};

export default ErrorMessage;
