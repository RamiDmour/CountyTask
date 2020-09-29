import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	InputAdornment,
	TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';

// Эмуляция поискового запроса к серверу
import search from '../api/search';
import useInput from '../hooks/useInput';
import SelectableList from './SelectableList';

const useStyles = makeStyles((theme) => ({
	root: {}
}));

function RegionsDialog({ onAdd, onClose, ...props }) {
	const { className, ...other } = props;

	const searchInput = useInput('');

	const classes = useStyles(props);

	const [ regions, setRegions ] = useState([]);
	const [ selectedRegions, setSelectedRegions ] = useState([]);

	const disabled = !selectedRegions.length;

	useEffect(
		() => {
			const searchRegions = async () => {
				let result = await search(searchInput.value);
				result = await result.map((region) => ({ ...region, title: `${region.county} | ${region.state}` }));

				setRegions(result);
			};

			const delaySearchRequest = setTimeout(() => {
				if (!searchInput.value) setRegions([]);
				else searchRegions();
			}, 250);
			return () => clearTimeout(delaySearchRequest);
		},
		[ searchInput.value ]
	);

	return (
		<Dialog className={clsx(classes.root, className)} {...other}>
			<DialogTitle>Add a County</DialogTitle>
			<DialogContent>
				<TextField
					placeholder="Search for a country"
					InputProps={{
						startAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						)
					}}
					{...searchInput.bind}
				/>
				<SelectableList onSelect={(data) => setSelectedRegions(data)} items={regions} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onAdd(selectedRegions)} disabled={disabled}>
					ADD
				</Button>
				<Button onClick={onClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
}

export default RegionsDialog;
