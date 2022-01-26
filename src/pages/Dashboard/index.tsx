import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, InputAdornment } from '@material-ui/core';
import { API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { ContainerRegister } from '../../context/container';
import { useSnackbar } from 'notistack';
import './style.scss';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';

// Components
import ColoredCard from '../../components/ColoredCard/ColoredCard';
import Card from '../../components/Card/Card';
import DropDown from '../../components/DropDown/DropDown';
import SysCallsDropDown from '../../components/SysCallsDropDown/SysCalssDropDown';
import VulnerabilityDropDown from '../../components/VulnerabilityDropDown/VulnerabilityDropDown';
import InfoBox from '../../components/InfoBox/InfoBox';

interface Builds {
	id: number;
	name: string;
	email: string;
	prld: string;
	prCreation: string;
	commitCreation: string;
	commitAuthor: string;
	commitId: string;
	branch: string;
	success: boolean;
	pending: boolean;
	message: any;
	repoName: string;
	uuid: string;
}

const Dashboard = () => {
	const [open, setOpen] = useState(true);
	const [builds, setBuilds] = useState<Builds[]>([]);
	const [selected, setSelected] = useState<number>();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('');

	const getBuilds = (notify = false) => {
		axios
			.get(`${API_URL}/build`, {
				withCredentials: true,
			})
			.then((response) => {
				setBuilds(response.data);
				if (notify) {
					enqueueSnackbar(`Builds refreshed`, {
						variant: 'success',
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right',
						},
					});
				}
			})
			.catch(() => {
				if (notify) {
					enqueueSnackbar(`Builds cant be refreshed`, {
						variant: 'error',
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right',
						},
					});
				}
			});
	};

	const refreshBuild = () => getBuilds(true);

	const selectBuild = (id: number) => () => {
		setSelected(id);
		if (window.innerWidth <= 960) {
			setOpen(false);
		}
	};

	const syncBuilds = () => {
		getBuilds();
		setTimeout(() => syncBuilds(), 10000);
	};

	useEffect(() => {
		syncBuilds();
	}, []);

	const buildSelected = builds.find((build) => build.id === selected);

	console.log(buildSelected?.message.Audit);

	const buildsFiltered =
		statusFilter === ''
			? builds
			: statusFilter === 'success'
			? builds.filter((build) => build.success)
			: statusFilter === 'pending'
			? builds.filter((build) => build.pending)
			: statusFilter === 'error'
			? builds.filter((build) => !build.success && !build.pending)
			: builds;

	const buildsSorted = buildsFiltered.sort((a, b) => {
		const dateA = new Date(a.prCreation);
		const dateB = new Date(b.prCreation);
		return dateA > dateB ? -1 : 1;
	});

	return (
		<>
			<Box className='dashboard-wrapper' height='100vh'>
				{open && (
					<>
						<Box className='dashboard-middleSide'>
							<Box className='dashboard-topBuildBox'>
								<Typography className='dashboard-filterByStatus'>
									Filter by Status:
								</Typography>
								<RefreshIcon
									titleAccess='Refresh all Builds'
									onClick={() => refreshBuild()}
									className='dashboard-refreshBuildsIcon'
								/>
							</Box>
							<Box className='dashboard-iconFilter'>
								<Box
									onClick={() =>
										setStatusFilter(
											statusFilter !== 'success'
												? 'success'
												: ''
										)
									}
									className={
										statusFilter !== 'success'
											? 'dashboard-iconFilterBox'
											: 'dashboard-iconFilterBoxSelected'
									}
									display='flex'
								>
									<CheckCircleIcon
										titleAccess='Success'
										fontSize='medium'
										color='success'
										className='dashboard-iconsFilter'
									/>
									<Typography>Success</Typography>
								</Box>
								<Box
									onClick={() =>
										setStatusFilter(
											statusFilter !== 'pending'
												? 'pending'
												: ''
										)
									}
									display='flex'
									className={
										statusFilter !== 'pending'
											? 'dashboard-iconFilterBox'
											: 'dashboard-iconFilterBoxSelected'
									}
								>
									<AccessTimeIcon
										titleAccess='Compiling'
										fontSize='medium'
										color='warning'
										className='dashboard-iconsFilter'
									/>
									<Typography>Pending</Typography>
								</Box>
								<Box
									onClick={() =>
										setStatusFilter(
											statusFilter !== 'error'
												? 'error'
												: ''
										)
									}
									display='flex'
									className={
										statusFilter !== 'error'
											? 'dashboard-iconFilterBox'
											: 'dashboard-iconFilterBoxSelected'
									}
								>
									<CancelIcon
										titleAccess='Error'
										fontSize='medium'
										color='error'
										className='dashboard-iconsFilter'
									/>
									<Typography>Error</Typography>
								</Box>
							</Box>
							<TextField
								placeholder='Search By Commit #'
								className='dashboard-Input'
								value={search}
								onChange={(event) =>
									setSearch(event.target.value)
								}
								InputProps={{
									disableUnderline: true,
									startAdornment: (
										<InputAdornment position='start'>
											<SearchIcon fontSize='small' />
										</InputAdornment>
									),
								}}
							/>
							<Box className='dashboard-cardsBox'>
								{search === ''
									? buildsSorted.map((build) => (
											<Card
												pending={build.pending}
												success={build.success}
												title={build.repoName}
												test={build.commitId.slice(
													0,
													8
												)}
												pastTime={build.commitCreation}
												presentTime={build.prCreation}
												onClick={selectBuild(build.id)}
											/>
									  ))
									: buildsSorted
											.filter(
												(filter) =>
													filter.commitId.indexOf(
														search
													) !== -1
											)
											.map((build) => (
												<Card
													pending={build.pending}
													success={build.success}
													title={build.name}
													test={build.commitId.slice(
														0,
														8
													)}
													pastTime={
														build.commitCreation
													}
													presentTime={
														build.prCreation
													}
													onClick={selectBuild(
														build.id
													)}
												/>
											))}
							</Box>
						</Box>
					</>
				)}
				<Box className='dashboard-rightSide'>
					{buildSelected ? (
						<Fragment>
							<Box height={230}>
								<Box className='dashboard-titleBox'>
									<Box
										width={{ xs: '100%', md: '100%' }}
										className='dashboard-welcome'
									>
										<Typography variant='h6'>
											{buildSelected.repoName}
										</Typography>
									</Box>
								</Box>
								<Box mt={2} mb={2}>
									<ColoredCard
										branch={buildSelected.branch}
										commit={buildSelected.commitId}
										author={buildSelected.commitAuthor}
										pr={buildSelected.prCreation}
										pastTime={buildSelected.commitCreation}
										presentTime={buildSelected.prCreation}
										id={buildSelected.uuid}
										status={
											buildSelected.success
												? 'success'
												: buildSelected.pending
												? 'warning'
												: 'error'
										}
									/>
								</Box>
							</Box>
							<Box className='dashboard-infoBoxContainer'>
								<InfoBox
									title='Vulnerabilities'
									content={
										buildSelected.message &&
										buildSelected.message.Audit &&
										buildSelected.message.Audit.metadata &&
										buildSelected.message.Audit.metadata
											.vulnerabilities
											? buildSelected.message.Audit
													.metadata.vulnerabilities
													.info +
											  buildSelected.message.Audit
													.metadata.vulnerabilities
													.low +
											  buildSelected.message.Audit
													.metadata.vulnerabilities
													.moderate +
											  buildSelected.message.Audit
													.metadata.vulnerabilities
													.high +
											  buildSelected.message.Audit
													.metadata.vulnerabilities
													.critical
											: '0'
									}
								/>
								<InfoBox
									title='System Calls'
									content={
										buildSelected.message &&
										buildSelected.message.SysCalls &&
										buildSelected.message.SysCalls.length
											? buildSelected.message.SysCalls
													.length
											: '0'
									}
								/>
								<InfoBox title='Custom Keywords' content='0' />
							</Box>
							<Box className='dashboard-errors'>
								{buildSelected.message &&
									buildSelected.message.SysCalls &&
									buildSelected.message.SysCalls.length && (
										<SysCallsDropDown
											content={
												buildSelected.message.SysCalls
											}
											quantity={
												buildSelected.message.SysCalls
													.length
											}
										/>
									)}
								{buildSelected.message &&
									buildSelected.message.Audit &&
									buildSelected.message.Audit.metadata && (
										<VulnerabilityDropDown
											title='Vulnerabilities'
											dependencies={
												buildSelected.message.Audit
													.metadata.dependencies
											}
											devDependencies={
												buildSelected.message.Audit
													.metadata.devDependencies
											}
											optionalDependencies={
												buildSelected.message.Audit
													.metadata
													.optionalDependencies
											}
											totalDependencies={
												buildSelected.message.Audit
													.metadata.totalDependencies
											}
											info={
												buildSelected.message.Audit
													.metadata.vulnerabilities
													.info
											}
											low={
												buildSelected.message.Audit
													.metadata.vulnerabilities
													.low
											}
											moderate={
												buildSelected.message.Audit
													.metadata.vulnerabilities
													.moderate
											}
											high={
												buildSelected.message.Audit
													.metadata.vulnerabilities
													.high
											}
											critical={
												buildSelected.message.Audit
													.metadata.vulnerabilities
													.critical
											}
										>
											<Box className='dashboard-dropDownContainer'>
												{buildSelected.message &&
													buildSelected.message
														.Audit &&
													buildSelected.message.Audit
														.advisories &&
													Object.keys(
														buildSelected.message
															.Audit.advisories
													).map((adviseKey) => {
														const advise =
															buildSelected
																.message.Audit
																.advisories[
																adviseKey
															];
														return (
															<DropDown
																severity={
																	advise.severity
																}
																severityInfo={
																	advise.title
																}
																title={
																	advise.title
																}
																module={
																	advise.module_name
																}
																path={
																	advise
																		.findings[0]
																		.paths[0]
																}
																info={
																	advise.url
																}
															/>
														);
													})}
											</Box>
										</VulnerabilityDropDown>
									)}
							</Box>
						</Fragment>
					) : (
						<Box className='dashboard-emptyRightSide'>
							<Typography className='dashboard-SelectBuild'>
								Please, Select a build
							</Typography>
							<BuildCircleIcon className='dashboard-buildIcon' />
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Dashboard;
