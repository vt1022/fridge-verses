import React, { Component } from 'react';
import { ListManager } from "react-beautiful-dnd-grid";

const sortList = (list) => {
    return list.slice().sort((first, second) => first.order - second.order);
}

const ListElement = ({ item: { content } }) => {
    return (
        <div className="app__container__gameBoard__dragbox__item">
            <div>{content}</div>
        </div>
    )
}

class DndGrid extends Component {
    constructor(props) {
        super();
        this.state = {
            sortedList: sortList(props.generatedWordsTest)
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
            <div className="app__container__gameBoard">
                <div className="app__container__gameBoard__generated">
                    {
                        this.props.generatedWordsTest.map((word) => {
                            return(
                                <div key={word.id}
                                    className="app__container__gameBoard__generated__item"
                                >
                                    <div>{word.content}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="app__container__gameBoard__dragbox">
                    <ListManager
                        items={this.state.sortedList}
                        direction="horizontal"
                        maxItems={6}
                        render={item => <ListElement item={item} />}
                        onDragEnd={this.reorderList}
                    />
                </div>
            </div>
        )
    }
}

export default DndGrid