import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default class InputAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    

render() {
    return (
    <div>
        <Autocomplete className="test"
        onChange={this.props.onAutoCompleteItemSelected}
            options={this.props.autoCompleteWords}
            getOptionLabel={option => option.word}
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
