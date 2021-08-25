import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './index.module.scss';

const getItemStyle = (isDragging, draggableStyle) => ({
	transform: isDragging ? 'scale(2)' : 'scale(1)',
	...draggableStyle,
});

function QuoteApp() {
	const [myList, setMyList] = useState([
		{
			id: '1',
			name: 'Aaron Jones',
		},
		{
			id: '2',
			name: 'David Moore',
		},
		{
			id: '3',
			name: 'Allen Lazard',
		},
		{
			id: '4',
			name: 'Kawaan Baker',
		},
		{
			id: '5',
			name: 'Kenneth Gainwell',
		},
		{
			id: '6',
			name: 'Logan Thomas',
		},
	]);

	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}

		const dupArray = Array.from(myList);
		const [removed] = dupArray.splice(source.index, 1);
		dupArray.splice(destination.index, 0, removed);
		setMyList(dupArray);
	}

	return (
		<div className={styles.sortable_container}>
			<div className={styles.number_column}>
				{[1, 2, 3, 4, 5, 6].map((num, index) => (
					<h2 key={index}>{num}</h2>
				))}
			</div>
			<div className={styles.draggable_container}>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='1'>
						{(provided, snapshot) => (
							<>
								<div
									ref={provided.innerRef}
									className={styles.draggable__items__container}
									{...provided.droppableProps}
								>
									{myList.map((item, index) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => (
												<>
													<div className={styles.draggable__item__absolute}></div>
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={styles.draggable__item}
														// style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
													>
														<div className={styles.three__dot}>
															<div></div>
															<div></div>
															<div></div>
														</div>
														<div className={styles.body__text}>{item.name}</div>
													</div>
												</>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
								{/* <div className='draggable__items__container__absolute'></div> */}
							</>
						)}
					</Droppable>
				</DragDropContext>
			</div>
		</div>
	);
}

export default QuoteApp;
