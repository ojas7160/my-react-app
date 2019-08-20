import React from 'react';
import styles from './Person.css';
// import Radium from 'radium';

const person = (props) => {
    // {props.children} -> can be used if something's written there in the element like <Person name='xyz' age='123'> pqr </Person> then pqr is children
    // here we cant use state because here we uses function syntax
    // we can also pass refernce from one component to another using props
		// const style = {
		// 	'@media (min-width: 500px)': {
		// 		width: '450px'
		// 	}
		// }
		return (
        <div className={styles.Person}> {
					// style={style}
				}
            <p onClick={props.click}>Hi I'm {props.name} and my age is {props.age} years</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    ) 
    // this is two way binding in which we can change value with onChange and auto name filled with value attribute
    // we can perform javascript dnamic code in html with single curly brace making it JSX.
}

// export default Radium(person);
export default person;