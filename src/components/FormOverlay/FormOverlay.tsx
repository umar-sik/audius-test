import { Box, Button } from '@material-ui/core';
import './style.scss';

// Icons
import ClearIcon from '@mui/icons-material/Clear';

interface FormOverlayProps {
	onClose: () => void;
	onSubmit: () => void;
	disabled?: boolean;
}

const FormOverlay: React.FC<FormOverlayProps> = (props) => {
	const { children, disabled, onSubmit } = props;
	return (
		<>
			<Box className='formOverlay-boxMain'></Box>
			<Box className='formOverlay-card'>
				<Box className='formOverlay-clearIconBox'>
					<ClearIcon
						onClick={() => props.onClose()}
						className='formOverlay-Clear'
						cursor='pointer'
						fontSize='small'
					/>
				</Box>

				<Box>{children}</Box>
				<Box className='formOverlay-ChangeEmail'>
					<Button
						disabled={disabled}
						onClick={() => onSubmit()}
						className='formOverlay-Button'
					>
						Change
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default FormOverlay;
