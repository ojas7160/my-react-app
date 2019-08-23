import React, { Component } from 'react';
import './Person.css';
import Radium from 'radium';

// converting stateless into stateful

class Person extends Component {
	constructor(props){
		super(props) // must be there in constructor
		console.log('constructor')
	}
	// componentWillMount() -> is being deprecated
	UNSAFE_componentWillMount() {
		console.log('will mount')
	}

	componentDidMount() {
		console.log('did mount');
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
				<p onClick={this.props.click}>Hi I'm {this.props.name} and my age is {this.props.age} years</p>
				<p>{this.props.children}</p>
				<input type="text" onChange={this.props.changed} value={this.props.name} />
			</div>
		)
  }
}

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