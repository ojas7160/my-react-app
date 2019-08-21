import React, { Component } from 'react';

class ErrorBoundary extends Component{
	state = {
		hasError: false,
		errorMessage: ''
	}

	componentDidCatch = (error, info) => {
		this.setState({hasError: true, errorMessage: error});
	}

	render(){
		if(this.state.hasError){
			return <h1>Something went wrong</h1>;
		}else {
			return this.props.children; // this.props comes from Component class which is being inherited with ErrorBoundary class
		}
	}
}

export default ErrorBoundary;
// and now wrap it above your code which you know may be fail but dont use it in the whole app just in case where you know it may fail