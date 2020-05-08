import React, { Component } from 'react';
import { ListManager } from "react-beautiful-dnd-grid";

const list2 = [
    {
        id: "0",
        order: 0
    },
    {
        id: "1",
        order: 1
    },
    {
        id: "2",
        order: 2
    },
    {
        id: "3",
        order: 3
    },
    {
        id: "4",
        order: 4
    }
];

const list = [
    {id: '123', order: 0, content: 'a'},
    {id: '124', order: 1, content: 'an'},
    {id: '125', order: 2, content: 'the'},
    {id: '126', order: 3, content: 'that'},
    {id: '127', order: 4, content: 'this'},
    {id: '128', order: 5, content: 'those'},
    {id: '129', order: 6, content: 'these'},
    {id: '120', order: 7, content: 'my'},
    {id: '131', order: 8, content: 'your'},
    {id: '132', order: 9, content: 'their'},
    {id: '133', order: 10, content: 'our'},
    {id: '134', order: 11, content: 'ours'},
    {id: '135', order: 12, content: 'whose'},
    {id: '136', order: 13, content: 'his'},
    {id: '137', order: 14, content: 'hers'},
    {id: '138', order: 15, content: 'its'},
    {id: '139', order: 16, content: 'which'},
    {id: '130', order: 17, content: 'some'},
    {id: '141', order: 18, content: 'both'},
    {id: '142', order: 19, content: 'most'},
    {id: '143', order: 20, content: 'many'},
    {id: '144', order: 21, content: 'a few'},
    {id: '145', order: 22, content: 'a lot of'},
    {id: '146', order: 23, content: 'any'},
    {id: '147', order: 24, content: 'much'},
    {id: '148', order: 25, content: 'a little'},
    {id: '149', order: 26, content: 'enough'},
    {id: '140', order: 27, content: 'several'},
    {id: '151', order: 28, content: 'none'},
    {id: '152', order: 29, content: 'all'},
]

// const ListElement = props => <div className="draggables">{props.item.content}</div>;

const sortList = (list) => {
    return list.slice().sort((first, second) => first.order - second.order);
}

const ListElement = ({ item: { content } }) => {
    return <div className="app__container__gameBoard__column__dropArea__item"><div>{content}</div></div>;
}

class DndGrid extends Component {
    constructor() {
        super();
        this.state = {
            sortedList: sortList(list)
        }
    }
    
    sortList = () => {
        this.setState({
            ...this.state,
            sortedList: sortList(this.state.sortedList)
        })
    }
    
    reorderList = (sourceIndex, destinationIndex) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const list = this.state.sortedList;
        if (destinationIndex === 0) {
            list[sourceIndex].order = list[0].order - 1;
            this.sortList();
            return;
        }
        if (destinationIndex === list.length - 1) {
            list[sourceIndex].order = list[list.length - 1].order + 1;
            this.sortList();
            return;
        }
        if (destinationIndex < sourceIndex) {
            list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
            this.sortList();
            return;
        }
        list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
        this.sortList();
    }
    
    render() {
        return(
            <div className="app__container__gameBoard test">
                {/* <ListManager
                    items={itemsFromBackend}
                    direction="horizontal"
                    maxItems={4}
                    render={item => <ListElement item={item} />}
                    onDragEnd={noop}
                /> */}
                <ListManager
                    items={this.state.sortedList}
                    direction="horizontal"
                    maxItems={5}
                    render={item => <ListElement item={item} />}
                    onDragEnd={this.reorderList}
                />
            </div>
        )
    }
}

export default DndGrid