import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: 125,
    maxHeight: 45,
    borderRadius: 5,
    padding: 5,
  },
  inputLabel: {
    textAlign: 'center',
    width: 105,
  },
  select: {
    textAlign: 'center',
    height: 40,
  },
  outlinedInput: {
    height: 40,
  },
  icon: {
    fill: '#FFF',
  }
});

class FilterSearchButton extends React.Component {
  state = {
    selectedOption: this.props.currentOption,
    labelWidth: 0
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ "selectedOption": event.target.value });
    if (event.target.value !== null && event.target.value !== '') {
      this.props.onSelect({ "trackUUID": event.target.value });
    }
  };

  render() {

    const { classes } = this.props;
    const theme = createMuiTheme({
      typography: {
        fontFamily: "\"Rubik\"",
        fontColor: '#00000',
        fontSize: '12',
        useNextVariants: true,
      },
    });

    let value = '';
    if (this.state.selectedOption != null) {
      value = this.state.selectedOption;
    }

    return (
      <MuiThemeProvider theme={theme}>
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            className={classes.inputLabel}
            htmlFor="outlined-track-simple"
          >
            {this.props.filterType}
          </InputLabel>
          <Select
            className={classes.select}
            value={value}
            onChange={this.handleChange}
            IconComponent={() => (<div></div>)}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name=""
                className={classes.outlinedInput}
                id="outlined-filter-simple"
              />
            }
           >
            <MenuItem value="">
              None
            </MenuItem>
            { this.props.allOptions.map(filter => 
              <FilterMenuItem key={filter.uuid} filter={filter} filterType={this.props.filterType}/>
            )}
          </Select>
        </FormControl>
      </form>
      </MuiThemeProvider>

    );
  }
}

function FilterMenuItem(props) {
  if (props.filterType === "Track") {
    return <MenuItem key={props.filter.uuid} value={props.filter.uuid}>{props.filter.name}</MenuItem>
  } else {
    return <MenuItem key={props.filter.name} value={props.filter.name}>{props.filter.name}</MenuItem>
  }
}



export default withStyles(styles)(FilterSearchButton);
