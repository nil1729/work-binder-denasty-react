import React, { useState } from 'react';
// import styles from "./index.module.scss";
// import { draggableItem, numberColumn, idColumn } from "./styledComponent";
import {
	DraggableItem,
	NumberColumn,
	IdColumn,
	ThreeDots,
	Icons,
	BodyText,
} from './styledComponent.js';
function ListItem(props) {
	const [id, setId] = useState(props.data.id);

	const counting = (e) => {
		if (!props.data.id) {
			// setId(props.count);

			props.incr();
			props.data.id = props.count;
			if (props.count == 6) {
				props.counts(1);
			}
		} else if (props.data.id + 1 === props.count) {
			// setId("");
			props.data.id = '';
			props.decre();
		} else if (props.data.id == 6) {
			props.counts(props.data.id);
			props.data.id = '';
		}
	};
	return (
		<>
			<DraggableItem value={props.data.player_id} onClick={() => counting()}>
				<NumberColumn>
					<IdColumn>{props.data.id}</IdColumn>
				</NumberColumn>

				<ThreeDots>
					<Icons></Icons>
					<Icons></Icons>
					<Icons></Icons>
				</ThreeDots>
				<BodyText>{props.data.name}</BodyText>
			</DraggableItem>
		</>
	);
}

export default ListItem;
