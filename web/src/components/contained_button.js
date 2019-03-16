import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButton(props) {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={props.onClick}>
        Primary
      </Button>
    </div>
  );
}

export default withStyles(styles)(ContainedButton);
