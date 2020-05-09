import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const itemsFromBackend = [
    {id: '123', content: 'a'},
    {id: '124', content: 'an'},
    {id: '125', content: 'the'},
    {id: '126', content: 'that'},
    {id: '127', content: 'this'},
    {id: '128', content: 'those'},
    {id: '129', content: 'these'},
    {id: '120', content: 'my'},
    {id: '131', content: 'your'},
    {id: '132', content: 'their'},
    {id: '133', content: 'our'},
    {id: '134', content: 'ours'},
    {id: '135', content: 'whose'},
    {id: '136', content: 'his'},
    {id: '137', content: 'hers'},
    {id: '138', content: 'its'},
    {id: '139', content: 'which'},
    {id: '130', content: 'some'},
    {id: '141', content: 'both'},
    {id: '142', content: 'most'},
    {id: '143', content: 'many'},
    {id: '144', content: 'a few'},
    {id: '145', content: 'a lot of'},
    {id: '146', content: 'any'},
    {id: '147', content: 'much'},
    {id: '148', content: 'a little'},
    {id: '149', content: 'enough'},
    {id: '140', content: 'several'},
    {id: '151', content: 'none'},
    {id: '152', content: 'all'},
]

const columnsFromBackend = 
    {
        '202': {
            name: 'generated words',
            items: itemsFromBackend,
        },
        '203': {
            name: 'sandbox',
            items: [],
        },
    };

const onDragEnd = (result, columns, setColumns) => {
    if(!result.destination) return;
    const { source, destination } = result;
    if(source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items]; 
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            }
        })
    }
}

function GameBoard() {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <div className="app__container__gameBoard">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div className="app__container__gameBoard__column">
                            <h2>{column.name}</h2>
                            {/* <div style={{margin: 8}}> */}
                            <Droppable droppableId={id} key={id} direction="horizontal">
                                {(provided, snapshot) => {
                                    return (
                                        <div className="app__container__gameBoard__column__dropArea"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: snapshot.isDraggingOver ? '#FFFEB9' : '#E6E7E9',
                                            }}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div className="app__container__gameBoard__column__dropArea__item"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    backgroundColor: snapshot.isDragging ? '#E4FFE3' : '#85FB83',
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                                {item.content}
                                                            </div>
                                                        )
                                                    }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                            {/* </div> */}
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    );
}

export default GameBoard;