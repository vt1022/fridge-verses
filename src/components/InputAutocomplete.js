import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default class InputAutocomplete extends React.Component {
    constructor(props) {
        super(props);
    }

    

render() {
    return (
    <div>
        <Autocomplete
        value={this.props.userInput}
        onChange={this.props.onAutoCompleteItemSelected}
            options={this.props.autoCompleteWords}
            // Choosing the randomize option gives us a string instead of an object with word and score
            //When there is no word property, just use the option itself (null coalescing)
            getOptionLabel={option => option.word ?? option}
            renderInput={params => (
                <TextField
                {...params}
                
                onChange={this.props.onTextChange}
                variant="outlined"
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
