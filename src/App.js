import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SimpleDialog from './SimpleDialog';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class App extends Component {

    constructor() {
    super()
        
        this.state = {
          searchCriteria: '',
          photos: [],
          open: false
        }
    }

    handleClickOpen (){
      this.setState({
        open: true,
      });
    };

    handleClose = value => {
      this.setState({ open: false });
    };

  updateSearchCriteria(val){
        this.setState({ searchCriteria: val})
	}
	
	searchPictures(){
		axios(`/api/search/?text=${this.state.searchCriteria}`)
			.then( result => this.setState({photos: result.data.photos.photo}) )
  }
  
  _onKeyPress(e){
    if (e.charCode === 13) { // enter key pressed
      e.preventDefault();
      this.searchPictures();
    }
  }

  render() {
    const { classes } = this.props;

    return (

        <div className="App">
            {/* <form className={classes.container} noValidate autoComplete="off"> */}

              <TextField
                id="search"
                label="Search field"
                type="search"
                className={classes.textField}
                margin="normal"
                value={this.state.searchField}
                onChange={ (e) => this.updateSearchCriteria(e.target.value)}
                onKeyPress={(e) => this._onKeyPress(e)}
              />

              <Button variant="contained" color="primary" className={classes.button} onClick={() => {this.searchPictures()}}>
                Search
              </Button>

				{/* TODO: Finish Styling
					TODO: Click on a picture and have it open to a model or light box
				*/}

              <GridList cellHeight={180} className={classes.gridList}>
                {this.state.photos.map(photo => (
                  <div>
                    <Button onClick={() => this.handleClickOpen()}>
                      <GridListTile cols={3} style={{ height: '250px',  width: '250px'}} key={photo.id}>
                        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
                        <GridListTileBar
                        title={photo.title}
                        // subtitle={<span>by: {tile.author}</span>}
                        // actionIcon={
                        // 	<IconButton className={classes.icon}>
                        // 	<InfoIcon />
                        // 	</IconButton>
                        // }
                        />
                      </GridListTile>
                    </Button>
                    <SimpleDialog
                      selectedValue={this.state.selectedValue}
                      open={this.state.open}
                      onClose={this.handleClose}
                    />
                  </div>
                ))}
              </GridList>
            {/* </form> */}
        </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
