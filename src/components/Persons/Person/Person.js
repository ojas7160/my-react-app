import React, { PureComponent } from 'react'; // this PureComponent is same as Component but just in this shouldComponentUpdate() is build in so it auto detects if something update happens
import './Person.css';
import Radium from 'radium';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../container/App';

// converting stateless into stateful

class Person extends PureComponent {

	constructor(props){
		super(props) // must be there in constructor
		console.log('constructor')
	}
	// componentWillMount() -> is being deprecated
	UNSAFE_componentWillMount() {
		console.log('will mount')
	}

	// why did we not make these hooks as propery function because these hooks won't called from dom so we dont bother for this keyword in these hooks so we make them as normal functions
	componentDidMount() {
		console.log('did mount');
	}

	UNSAFE_componentWillReceiveProps(nextProps){
		console.log('will receive props')
	}

	// important method, commenting this because now we inherited PureComponent instead Component
	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log('should component update')
	// 	// return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
	// 	return true; // return false if you want to cancel whole process and it will stop updating the dom
	
	// }

	UNSAFE_componentWillUpdate(nextProps,nextState) {
		console.log('update component', nextProps)
	}

	componentDidUpdate(){
		console.log('did update')
		this.inputElement.focus()
		console.log(this.inputElement)
	}

	render () {
		console.log('render')
		const style = {
			'@media (min-width: 500px)': {
				width: '450px'
			}
		}
		return (
			<div className="Person" style={style}>
				{
					// auth is just a boolean which we have passed when we create context 
				} 
				<AuthContext.Consumer>
					{auth => auth ? <p>Im Authenticated</p> : null}
				</AuthContext.Consumer>
				<p onClick={this.props.click}>Hi I'm {this.props.name} and my age is {this.props.age} years</p>
				<p>{this.props.children}</p>
				<input type="text" ref={(inp) => {this.inputElement = inp}} onChange={this.props.changed} value={this.props.name} />
				{// ref is a special element attribute given by react and it can be used only in stateful components, it just mark a reference to this input element
				}
			</div>
		)
  	}
}	

// Person.PropTypes = { 
// 	// its just a JS object having key value pair for props which we are receiving and the rules for them just like blueprint/interface in angular
// 	click: PropTypes.func,
// 	name: PropTypes.string,
// 	age: PropTypes.number,
// 	changed: PropTypes.func
// }

export default Radium(Person);

// const person = (props) => {
//     // {props.children} -> can be used if something's written there in the element like <Person name='xyz' age='123'> pqr </Person> then pqr is children
//     // here we cant use state because here we uses function syntax
//     // we can also pass refernce from one component to another using props
// 		const style = {
// 			'@media (min-width: 500px)': {
// 				width: '450px'
// 			}
// 		}
// 		return (
//         <div className="Person" style={style}> 
//             <p onClick={props.click}>Hi I'm {props.name} and my age is {props.age} years</p>
//             <p>{props.children}</p>
//             <input type="text" onChange={props.changed} value={props.name} />
//         </div>
//     ) 
//     // this is two way binding in which we can change value with onChange and auto name filled with value attribute
//     // we can perform javascript dnamic code in html with single curly brace making it JSX.
// }

// export default Radium(person);