import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default class InputAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: "",
            words: []
        };

        this.onTextChange = this.onTextChange.bind(this);
    }

onTextChange = (event) => {
    this.setState({
        userInput: event.target.value
    });

    if (this.state.userInput.trim() !== "") {
        axios("https://api.datamuse.com/sug?s=" + this.state.userInput)
        .then(result => {
            this.setState({
                words: result.data
            })
        });
    }
    else {
        this.setState({
            words: []
        })
    }
}

render() {
    return (
    <div style={{ width: 500 }}>
        <Autocomplete
            options={this.state.words}
            getOptionLabel={option => option.word}
            defaultValue={""}
            renderInput={params => (
                <TextField
                {...params}
                onChange={this.onTextChange}
                variant="standard"
                label="Type in a word"
                placeholder=""
                margin="normal"
                fullWidth
            />
        )}
        />
    </div>
    );
}
}
