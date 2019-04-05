import React from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit*2,
  },
  input: {
    display: 'none',
  },
});

function GoButton(props) {

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3F44B5' },
    },
    typography: {
      fontFamily: "\"Rubik\"",
      fontSize: '16',
      useNextVariants: true
    }
  });

  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    ...rest
  } = props;

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button 
        {...rest}
        variant="contained" 
        color="primary" 
        style={{ width: '200px', height:'60px', textTransform: 'none' }} 
        onClick={(event) => {
          onClick && onClick(event)
          history.push(to)
        }}>
          Find Schools
        </Button>
      </MuiThemeProvider>
    </div>
  );
}

export default withRouter(withStyles(styles)(GoButton));
