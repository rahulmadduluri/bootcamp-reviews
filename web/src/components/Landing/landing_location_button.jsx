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

class LandingLocationButton extends React.Component {
  state = {
    locationUUID: '',
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    this.setState({ "locationUUID": event.target.value });
    if (event.target.value && event.target.value !== '') {
      this.props.onSelect({ "locationUUID": event.target.value });
    }
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
            htmlFor="outlined-location-simple"
          >
            Location
          </InputLabel>
          <Select
            className={classes.select}
            value={this.state.locationUUID}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="location"
                id="outlined-location-simple"
              />
            }
           >
            <MenuItem value="">
              Any
            </MenuItem>
            { this.props.searchOptions.locations.map(location => 
              <MenuItem key={location.uuid} value={location.uuid}>{location.city}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
      </MuiThemeProvider>

    );
  }
}

export default withStyles(styles)(LandingLocationButton);
