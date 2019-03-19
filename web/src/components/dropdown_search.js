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
    minWidth: 200,
      borderRadius: 5

  },
});

class DropdownSearch extends React.Component {
  state = {
    track: '',
    name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    const theme = createMuiTheme({
      typography: {
        fontFamily: "\"Rubik\"",
        fontSize: '14',
        useNextVariants: true
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
      <form className={classes.root} autoComplete="off">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-track-simple"
          >
            Career Track
          </InputLabel>
          <Select
            className={classes.select}
            value={this.state.track}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="track"
                id="outlined-track-simple"
              />
            }
           >
            <MenuItem value="">
              All Tracks (Default)
            </MenuItem>
            <MenuItem value={"uuid-1"}>Web</MenuItem>
            <MenuItem value={"uuid-2"}>iOS</MenuItem>
            <MenuItem value={"uuid-3"}>Android</MenuItem>
          </Select>
        </FormControl>
      </form>
      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(DropdownSearch);
