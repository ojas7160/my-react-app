import React from 'react';
import './Cockpit.css';
import Aux from '../hoc/Aux'; // hoc - higher order component just to wrap the content or components
import Radium from 'radium';
import withClass from '../hoc/withClass';

const cockpit = (props) => {
    const style = {
        backgroundColor: 'green',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'lightgreen',
          color: 'black'
        }
    }

    let classes = ['red', 'bold'].join(' ');
    let classesNew = []
    if(props.persons.length <= 2){
      classesNew.push('red');
    }

    if(props.persons.length <= 1){
      classesNew.push('bold');
    }

    if(props.showPersons){
        style.backgroundColor = 'red';
        style[':hover'] = {
          backgroundColor: 'salmon',
          color: 'black'
        }
    }
    return (
        <Aux>
          <p>{props.appTitle}</p>
          <h1 className={classes}>Hi, Im react</h1>
          <button style={style} onClick={props.clicked}>toogle person</button>
          <button className={classesNew.join(' ')} onClick={() => props.switch('ojaswi wadhwa')}>Switch state</button>
          <button onClick={props.login}>Login</button>
        </Aux>
    );
}

export default Radium(withClass(cockpit, 'Red'));