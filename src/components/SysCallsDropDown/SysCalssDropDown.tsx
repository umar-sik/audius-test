import { Box, Typography } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './style.scss';
import { useState } from 'react';

interface SysCallsDropDownProps {
	content: string[];
	quantity: string;
}

const SysCallsDropDown: React.FC<SysCallsDropDownProps> = (props) => {
	const { content, quantity } = props;

	return (
		<Box className='SysCallsDropDown-MainBox'>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					className='SysCallsDropDown-Accordion'
				>
					<Box className='SysCalls-syscallsBox'>
						<Typography className='dashboard-messageTextVulnerabilities'>
							System Calls
						</Typography>
					</Box>
				</AccordionSummary>
				{content.map((item) => (
					<AccordionDetails className='SysCallsDropDown-AccordionDetails'>
						<Typography>{item}</Typography>
					</AccordionDetails>
				))}
			</Accordion>
		</Box>
	);
};

export default SysCallsDropDown;
