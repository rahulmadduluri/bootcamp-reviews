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
    marginLeft: 5,
  },
  formControl: {
    width: 140,
    maxHeight: 45,
    borderRadius: 5,
    padding: 5,
  },
  inputLabel: {
    textAlign: 'center',
    width: 120,
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
    let value = null;
    if (event.target.value !== '') {
      value = event.target.value;
    }
    this.setState({ "selectedOption": value });
    if (this.props.filterType === "Track") {
      this.props.onSelect({ "trackUUID": value });
    } else if (this.props.filterType === "Campus Location") {
      this.props.onSelect({ "campusLocationUUID": value });
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

    let currentOption = this.state.selectedOption;
    if (!currentOption) {
      currentOption = '';
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
            value={currentOption}
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
              {
                if (this.props.filterType === "Track") {
                  return <MenuItem key={filter.uuid} value={filter.uuid}>{filter.name}</MenuItem>;
                } else if (this.props.filterType === "Campus Location") {
                  return <MenuItem key={filter.uuid} value={filter.uuid}>{filter.city}</MenuItem>;
                } else {
                  return <div key={""}></div>;
                }
              }
            )}
          </Select>
        </FormControl>
      </form>
      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(FilterSearchButton);
