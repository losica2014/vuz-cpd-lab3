// src/pages/DndPage.jsx
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function DndPage() {
    const [columns, setColumns] = useState({
        todo: {
            name: 'To Do',
            items: [
                { id: '1', content: 'First task' },
                { id: '2', content: 'Second task' },
                { id: '3', content: 'Third task' },
            ],
        },
        inProgress: {
            name: 'In Progress',
            items: [
                { id: '4', content: 'Fourth task' },
                { id: '5', content: 'Fifth task' },
                { id: '6', content: 'Sixth task' },
            ],
        },
        done: {
            name: 'Done',
            items: []
        },
        blocked: {
            name: 'Blocked',
            items: []
        }
    });
    const onDragEnd = (result, columns, setColumns) => {
        const { source, destination } = result;
        if (!destination) return;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            sourceItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
            });
        } else {
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        }
    };

    const removeCard = (columns, setColumns, columnId, cardId) => {
        setColumns({
            ...columns,
            [columnId]: {
                ...columns[columnId],
                items: columns[columnId].items.filter((v) => v.id != cardId)
            }
        })
    }
    return (
        <div className="container max-w-min mx-auto flex flex-col gap-2">
            <div>
                <h1 className="text-3xl font-bold my-5">Drag and Drop</h1>
                <a href="/" className="text-blue-500 hover:text-blue-700">Перейти к списку задач</a>
            </div>
            <div className="flex gap-4 justify-center h-full">
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <div
                                className="flex flex-col items-center"
                                key={columnId}
                            >
                                <h2>{column.name}</h2>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={['p-2 w-56 min-h-72', snapshot.isDraggingOver ? 'bg-slate-400' : 'bg-slate-300'].join(' ')}
                                            >
                                                {column.items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                        disableInteractiveElementBlocking={true}
                                                    >
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className={['min-h-8 select-none p-4 mb-2 text-black', snapshot.isDragging ? 'bg-primary-500' : 'bg-primary-200'].join(' ')}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.
                                                                            style,
                                                                    }}
                                                                >
                                                                    <span className="mr-2">{item.content}</span>
                                                                    <button className="" onClick={() => removeCard(columns, setColumns, columnId, item.id)}>Remove</button>
                                                                    {/* <a onClick={removeCard(columns, setColumns, columnId, item.id)}>Remove</a> */}
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}
export default DndPage;