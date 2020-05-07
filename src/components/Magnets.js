import React from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from './ItemTypes'

const style = {
    border: '1px solid gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

const Magnets = ({ name }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { name, type: ItemTypes.MAGNET },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} style={{ ...style, opacity }}>
            {name}
        </div>
    )
}

export default Magnets

// notes: Both useDrag and useDrop return arrays, where the second element is a function that will hook up our ref with react - dnd internals.These functions are called connector functions.


// export default function WordsMagnets(props) {
//     const words = props.words;
//     const magneticWords = numbers.map((words) =>
//         <li key={}>
//             {words}
//         </li>
//     );
//     return (
//         <ul>{magneticWords}</ul>
//     );
// }

// export default WordsMagnets;









// import React from 'react'

// function Magnets(props) {

//     const onDragStart = e => {
//         const target = e.target;

//         e.dataTransfer.setData('magnetID', target.id)

//         // this allows a little bit of a delay so card does not disappear immediately when picked up
//         setTimeout(() => {
//             target.style.display = "none"
//         }, 0)
//     }

//     // this prevents other events being fired when dragging
//     const dragOver = e => {
//         e.stopPropagation();
//     }

//     return (
//         <div
//             id={props.id}
//             className={props.className}
//             draggable="true"
//             onDragStart={onDragStart}
//             onDragOver={dragOver}
//         >
//             { props.children }
//         </div>
//     )
// }

// export default Magnets
