import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

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
			photos: []
        }
    }

    updateSearchCriteria(val){
        this.setState({ searchCriteria: val})
	}
	
	searchPictures(){
		axios(`/api/search/?text=${this.state.searchCriteria}`)
			.then( result => this.setState({photos: result.data.photos.photo}) )
	}

  render() {
    const { classes } = this.props;

    return (

        <div className="App">
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                id="search"
                label="Search field"
                type="search"
                className={classes.textField}
                margin="normal"
                value={this.state.searchField}
                onChange={ (e) => this.updateSearchCriteria(e.target.value)}
                />

				<Button variant="contained" color="primary" className={classes.button} onClick={() => {this.searchPictures()}}>
					Search
				</Button>

				<GridList cellHeight={180} className={classes.gridList}>
					{/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}> */}
					<GridListTile key="Subheader" style={{ height: '250px' }}> 
					<ListSubheader component="div">Photos from Flickr API. All photographs copyright by thier respective oweners.</ListSubheader>
					</GridListTile>
					{this.state.photos.map(photo => (
					<GridListTile key={photo.id}>
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
					))}
      			</GridList>
            </form>
        </div>
    );
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
