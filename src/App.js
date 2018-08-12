import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  search: {
    display: 'flex',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  gridList: {
    justifyContent: 'center'
  }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class App extends Component {

    constructor() {
      super()
        this.state = {
          searchCriteria: '',
          photos: [],
          open: false,
          image: '',
          title: ''
        }
    }

    handleClickOpen (image, title){
      this.setState({
        open: true,
        image,
        title
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
          <div class={classes.search}>
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
          </div>

          <GridList cellHeight={180} className={classes.gridList}>
            {this.state.photos.map(photo => (
                
                  <GridListTile style={{ height: '200px',  width: '200px'}} onClick={() => this.handleClickOpen(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,photo.title)} key={photo.id}>
                      <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} alt={photo.title} />
                    <GridListTileBar
                      title={photo.title}
                    />
                  </GridListTile>
            ))}
          </GridList>

          <Dialog
            open={this.state.open}
            onClose={() => this.handleClose()}
            TransitionComponent={Transition}
          >
          <Card className={classes.card}>
            <CardContent>
              <img src={this.state.image} alt={this.state.title}/>
            </CardContent>
          </Card>
        </Dialog>
        </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
