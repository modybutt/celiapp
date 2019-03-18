import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import { Page, Toolbar, Button, AlertDialog } from 'react-onsenui';

class OnsenUI extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			isOpen: false
		};
	}
	
	renderToolbar() {
		return (
          <Toolbar renderToolbar={this.renderToolbar}>
            <div className='center'>Onsen UI</div>
          </Toolbar>
        );
	}
	
	render() {
		return (
          <Page renderToolbar={this.renderToolbar}>
			<div>open: {this.state.isOpen.toString()}</div>
            <Button onClick={() => this.setState({isOpen: true})}>This is Onsen UI!</Button>
			<AlertDialog isOpen={this.state.isOpen} isCancelable={false} >
			 <div className="alert-dialog-content">
			   Hello World!
			 </div>
			 <div className="alert-dialog-footer">
			   <Button className="alert-dialog-button" onClick={() => this.setState({isOpen: false})}>
				 Ok
			   </Button>
			 </div>
		   </AlertDialog>
          </Page>
        );
  }
}

export default OnsenUI;
