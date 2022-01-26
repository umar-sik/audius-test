import { Box, Typography } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './style.scss';
import { useState } from 'react';

interface DropDownProps {
	title?: string;
	severity?: string;
	module?: string;
	info?: string;
	severityInfo?: string;
	path?: string;
}

const DropDown: React.FC<DropDownProps> = (props) => {
	const { title, severity, module, path, info, severityInfo } = props;

	return (
		<Box className='DropDown-MainBox'>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					className='DropDown-Accordion'
				>
					<Typography className='DropDown-Title'>{title}</Typography>
				</AccordionSummary>
				<AccordionDetails className='DropDown-AccordionDetails'>
					<Box className='DropDown-tableBox'>
						<Box className='DropDown-tableBoxHead'>
							<Box className='DropDown-leftTable'>
								<Typography
									className={
										severity === 'high'
											? 'DropDown-highSeverity'
											: severity === 'moderate'
											? 'DropDown-moderateSeverity'
											: 'DropDown-lowSeverity'
									}
								>
									{severity}
								</Typography>
							</Box>
							<Box className='DropDown-rightTable'>
								<Typography>{severityInfo}</Typography>
							</Box>
						</Box>
						<Box className='DropDown-tableBoxHead'>
							<Box className='DropDown-leftTable'>
								<Typography>Package</Typography>
							</Box>
							<Box className='DropDown-rightTable'>
								<Typography>{module}</Typography>
							</Box>
						</Box>
						<Box className='DropDown-tableBoxHead'>
							<Box className='DropDown-leftTable'>
								<Typography>Path</Typography>
							</Box>
							<Box className='DropDown-rightTable'>
								<Typography>{path}</Typography>
							</Box>
						</Box>
						<Box className='DropDown-tableBoxHead'>
							<Box className='DropDown-leftTable'>
								<Typography>More Info</Typography>
							</Box>
							<Box className='DropDown-rightTable'>
								<Typography>{info}</Typography>
							</Box>
						</Box>
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default DropDown;
