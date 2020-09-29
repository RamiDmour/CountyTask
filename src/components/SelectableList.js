import React, { useState } from 'react';
import { List, ListItem, Checkbox, ListItemText } from '@material-ui/core';

const SelectableList = ({ items, onSelect }) => {
	const [ checked, setChecked ] = useState([]);

	if (!items) return null;

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [ ...checked ];

		if (currentIndex === -1) newChecked.push(value);
		else newChecked.splice(currentIndex, 1);

		onSelect && onSelect(newChecked);
		setChecked(newChecked);
	};

	const listItems = items.map((value) => {
		const labelId = `checkbox-list-label-${value}`;

		return (
			<ListItem key={value.title} dense button onClick={handleToggle(value)}>
				<ListItemText id={labelId} primary={value.title} />
				<Checkbox
					edge="end"
					checked={checked.indexOf(value) !== -1}
					tabIndex={-1}
					disableRipple
					inputProps={{ 'aria-labelledby': labelId }}
				/>
			</ListItem>
		);
	});

	return <List>{listItems}</List>;
};

export default SelectableList;
