import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { compose } from 'recompose';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 5,
  },
  formControl: {
    width: 140,
    borderRadius: 5,
    padding: 5,
  },
  inputLabel: {
    textAlign: 'center',
    width: 120

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

  handleChange = async (event) => {
    let value = null;
    if (event.target.value !== '') {
      value = event.target.value;
    }

    let field = null;
    switch (this.props.filterType) {
      case "Location":
        field = "locationUUID";
        break;
      case "Payment Type":
        field = "paymentType";
        break;
      case "Minimum Length":
        field = "minLength";
        break;
      case "Max Price":
        field = "maxPrice";
        break;
      default:
        break;
    }

    if (field) {
      const updateSchoolSearchParamsMutation = gql`
        mutation UpdateSchoolSearchParams($params:SchoolSearchParams!) {
          updateSchoolSearchParams(params: $params) @client
        }
      `;

      let params = {};
      params[field] = value;
      const { data } = await this.props.client.mutate({
        mutation: updateSchoolSearchParamsMutation,
        variables: { params: params }
      });
    }

    this.setState({ "selectedOption": value });
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
            htmlFor="outlined-filter-simple"
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
              Any
            </MenuItem>
            { this.props.allOptions.map(filter => 
              {
                if (this.props.filterType === "Location") {
                  return <MenuItem key={"Location_"+filter.uuid} value={filter.uuid}>{filter.city}</MenuItem>;
                } else if (this.props.filterType === "Payment Type") {
                  return <MenuItem key={"Payment_Type_"+filter} value={filter}>{filter}</MenuItem>;
                } else if (this.props.filterType === "Minimum Length") {
                  return <MenuItem key={"Minimum_Length_"+filter} value={filter}>{filter}</MenuItem>;
                } else if (this.props.filterType === "Max Price") {
                  return <MenuItem key={"Max_Price_"+filter} value={filter}>{filter}</MenuItem>;
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

export default compose(withStyles(styles), withApollo)(FilterSearchButton);
