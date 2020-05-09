import React, { Component } from 'react';
// import { Draggable } from '@shopify/draggable';

// const words = [
//     {id: '123', content: 'a'},
//     {id: '124', content: 'an'},
//     {id: '125', content: 'the'},
//     {id: '126', content: 'that'},
//     {id: '127', content: 'this'},
//     {id: '128', content: 'those'},
//     {id: '129', content: 'these'},
//     {id: '120', content: 'my'},
//     {id: '131', content: 'your'},
//     {id: '132', content: 'their'},
//     {id: '133', content: 'our'},
//     {id: '134', content: 'ours'},
//     {id: '135', content: 'whose'},
//     {id: '136', content: 'his'},
//     {id: '137', content: 'hers'},
//     {id: '138', content: 'its'},
//     {id: '139', content: 'which'},
//     {id: '130', content: 'some'},
//     {id: '141', content: 'both'},
//     {id: '142', content: 'most'},
//     {id: '143', content: 'many'},
//     {id: '144', content: 'a few'},
//     {id: '145', content: 'a lot of'},
//     {id: '146', content: 'any'},
//     {id: '147', content: 'much'},
//     {id: '148', content: 'a little'},
//     {id: '149', content: 'enough'},
//     {id: '140', content: 'several'},
//     {id: '151', content: 'none'},
//     {id: '152', content: 'all'},
// ]
// const sortable = new Draggable.Sortable(
//     document.querySelector('#xxx'), {
//         draggable: 'span',
//     }
// )
// sortable.on('sortable:start', () => {
//     console.log('sortable:start')
// })
// sortable.on('sortable:sort', () => {
//     console.log('sortable:sort')
// })
// sortable.on('sortable:sorted', () => {
//     console.log('sortable:sorted')
// })
// sortable.on('sortable:stop', () => {
//     console.log('sortable:stop')
// })

// class DraggableBoard extends Component {
//     render() {
//         return(
//             <div className="app__container__gameBoard test">
//                 <span style="background-color: red;">1</span>
//                 <span style="background-color: orange;">2</span>
//                 <span style="background-color: gold;">3</span>
//                 <span style="background-color: green;">4</span>
//                 <span style="background-color: blue;">5</span>
//                 <span style="background-color: indigo;">6</span>
//                 <span style="background-color: violet;">7</span>
//                 <span style="background-color: brown;">8</span>
//                 <span style="background-color: cyan;">9</span>
//                 <span style="background-color: magenta;">10</span>
//                 <span style="background-color: navy;">11</span>
//                 <span style="background-color: maroon;">12</span>
//                 <span style="background-color: purple;">13</span>
//                 <span style="background-color: pink;">14</span>
//                 <span style="background-color: lime;">15</span>
//                 <span style="background-color: lightblue;">16</span>
//                 <span style="background-color: black;">17</span>
//                 <span style="background-color: gray;">18</span>
//                 <span style="background-color: tan;">19</span>
//                 <span style="background-color: yellowgreen;">20</span>
//             </div>
//         )
//     }
// }

// export default DraggableBoard