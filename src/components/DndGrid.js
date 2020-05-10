import React, { Component } from 'react';
import { ListManager } from "react-beautiful-dnd-grid";
import '../styles/gameBoard.scss'

const sortList = (list) => {
    return list.slice().sort((first, second) => first.order - second.order);
}

const ListElement = ({ item: { content } }) => <div className="generated__item">{content}</div>

class DndGrid extends Component {
    constructor() {
        super();
        this.state = {
            sortedList: [],
            wordOrder: 0
        }
    }
    
    sortList = () => this.setState({sortedList: sortList(this.state.sortedList)})
    
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
    
    generatedWordClick = (e, wordObject) => {
        const { id, content } = wordObject
        const newList = [...this.state.sortedList]
        // if statement to filter out words already used
        newList.push({id: id, order: this.state.wordOrder, content: content});
        this.setState({
            sortedList: sortList(newList),
            wordOrder: this.state.wordOrder + 1
        })
    }

    render() {
        return(
            <div className="container__game-board">
                <div className="game-board__generated">
                    {
                        this.props.generatedWords.map((word) => {
                            return(
                                <div key={word.id}
                                    className="generated__item"
                                    onClick={(e) => this.generatedWordClick(e, word)}
                                >
                                    {word.content}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="sandbox__droppable">
                    <ListManager
                        items={this.state.sortedList}
                        direction="horizontal"
                        maxItems={6}
                        render={item => <ListElement item={item} />}
                        onDragEnd={this.reorderList}
                    />
                    <button>Clear</button>
                    <button>Save</button>
                </div>
            </div>
        )
    }
}

export default DndGrid