import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default class InputAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    

render() {
    return (
    <div style={{ width: 500 }}>
        <Autocomplete
        onChange={this.props.onAutoCompleteItemSelected}
            options={this.props.words}
            getOptionLabel={option => option.word}
            // defaultValue={{word:"", score:-1}}
            renderInput={params => (
                <TextField
                {...params}
                onChange={this.props.onTextChange}
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
