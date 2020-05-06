import React from 'react'
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
const MagnetBoard = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.MAGNET,
    drop: () => ({ name: 'MagnetBoard' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Drag a magnet here'}
    </div>
  )
}
export default MagnetBoard;














// class MagnetBoard extends Component {
//   render() {
//     return(
//     <main className="flexbox">
//     {/* here will be our boards */}
//       <Board id="board-1" className="board">
//         <Magnet id="magnet-1" className="magnet" draggable="true">
//           <p>Cat</p>
//         </Magnet>
//         <Magnet id="magnet-2" className="magnet" draggable="true">
//           <p>Dog</p>
//         </Magnet>
//         <Magnet id="magnet-3" className="magnet" draggable="true">
//           <p>Bird</p>
//         </Magnet>
//       </Board>

//       <Board id="board2" className="board">
//         {/* empty board to drag shit into */}
//       </Board>
//     </main>
//     )
//   }
// }

// export default MagnetBoard