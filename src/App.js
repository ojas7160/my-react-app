import React, {Component} from 'react'; // this React is responsible for render all the code to HTML through render method
import './App.css'; // we can import css file in js file with the help of webpack
import Person from './Person/Person';

// npm start, starts th react server and it runs the react-script start behind the scenes which are written in package.json for all commands
class App extends Component { // this component responsible that some html code to be rendered to the dom and to create a component
  state = {
    persons: [
      {id: 1, name: 'ojas', age: 28},
      {id: 2, name: 'wadhwa', age: 27},
      {id: 3, name: 'ojaswi', age: 26}
    ] 

  }
  
  // this below property function syntax is important because we should make this as a property rather a function that it can be use in single brace as a property in button click and secondly if we make this as a normal function then 'this' will refer to the itself function and not to the app component which will be beneficial later.
  switchNameHandler = (newName) => { // this Handler as suffix is a react standard that this is not a normal function but is assigned as event handler.
    console.log('hi im ojas');
    // this can only refer to the state only because of this property function syntax
    
    // Do Not do this => this.state.persons[0].name = 'ojaswi wadhwa'
    this.setState({ // it takes object as a argument and use to update the state and it only update that state which we pass into it and won't even touch anyother state in it.
      persons: [
        {id: 1, name: newName, age: 28},
        {id: 2, name: 'wadhwa', age: 29},
        {id: 3, name: 'ojaswi', age: 26}
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => person.id === id) // it gives the index
    const person = {...this.state.persons[personIndex]} // spread operator because we dont want to mutate directly the original array
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
    // this.setState({ 
    //   persons: [
    //     {id: 1, name: 'ojas', age: 28},
    //     {id: 2, name: event.target.value, age: 29},
    //     {id: 3, name: 'ojaswi', age: 26}
    //   ],
    //   showPersons: false
    // })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons]; // this is he efficient way that spread operator makes another copy
    persons.splice(index, 1); // splice can mutate the original array
    this.setState({persons: persons});
  }
  // state is managed inside the component whereas props managed from outside the component like we define name and age in this component and use in another component using props and also state can only be defined in those component which extends Component.  
  render() { 
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    //this is the another way of clean show or hide.
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {
            // for dynamic iteration on array in react unlike we do in ng-repeat/*ngFor in angular and there should be key attribute when we iterate via map function in react, its very important because react make a virtual dom(the previous dom) and compare between both w.r.t key that which element change and which didn't and key must be unique.
          }
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                key={index} // or key={person.id} unique key
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            )
          })}
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'ojas!')}/>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} changed={this.nameChangeHandler}>Hobbies: Swimming</Person> */}
        </div>
      );
    }
    return ( // this whole code looks like js but it is jsx
      // we are not using div element as real html tags React is converting them behind the scenes
      // this below code looks like html but it really is jsx that's why it is bind in parenthesis of return statement
      
      // we have to write all code in one root element i.e., <div className="App"></div>, it doesn't any code outside the root parent element and gives us error, its a restriction of jsx
      // in JSX we use click listener with capital c in onClick whereas in normal JS we use small c in onclick  
      <div className="App"> 
        <h1>Hi, Im react</h1>
        <button style={style} onClick={this.togglePersonHandler}>toogle person</button>
        <button style={style} onClick={() => this.switchNameHandler('ojaswi wadhwa')}>Switch state</button>
        {/* {
          this.state.showPersons ? 
          <div>
            <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
            <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'ojas!')}/>
            <Person name={this.state.persons[2].name} age={this.state.persons[2].age} changed={this.nameChangeHandler}>Hobbies: Swimming</Person>
          </div> 
          : null
        } */}
        {
          // this ternary operator helps in show or hide any element in react and is covered in single brace for dynamic show hide
        }

        {
          // or
        }
        {persons}
      </div>
      
      // this click is just a click named property passing the switchNameHandler to person component dynamically like name and age
      // this is a standard convention of using capitalize form in react beacuse react treats capitalized form elements as custom elements like <Person /> or <Div> and won't interfere in it and normal <div> starts with small letter are being treated as native html elements in react jsx syntax
    )

    // this below code if the final result after compilation of above code, end result after compilation
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m react')) // this method requires arguments atleast three
    // React.createElement(element, className(optional), text inside the element) and if you want nested element inside any element then create another rect element inside it like above
  }
}

export default App;
