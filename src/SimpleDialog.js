import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const styles = {

  };

class SimpleDialog extends React.Component {
    handleClose(){
        this.props.onClose();
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
        <Dialog onClose={() => this.handleClose()} aria-labelledby="simple-dialog-title" {...other}>
            This is the dialog
        </Dialog>
        );
    }
}



SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);