import React, {PureComponent} from 'react'; // this React is responsible for render all the code to HTML through render method
import './App.css'; // we can import css file in js file with the help of webpack
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Radium, { StyleRoot } from 'radium'; // to use media queries with raidum elemet should be wrapped with styleroot element given by radium 

export const AuthContext = React.createContext(false); // its given by react to create a context with default boolean value false.
// npm start, starts th react server and it runs the react-script start behind the scenes which are written in package.json for all commands
class App extends PureComponent { // this component responsible that some html code to be rendered to the dom and to create a component
  
  constructor(props){
		super(props) // must be there in constructor
    console.log('constructor')
    this.state = {
      persons: [
        {id: 1, name: 'ojas', age: 28},
        {id: 2, name: 'wadhwa', age: 27},
        {id: 3, name: 'ojaswi', age: 26}
      ],
      showPersons: false,
      toggler: 0,
      authenticated: false
    }
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

	// important method
	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log('should component update')
	// 	return nextState.persons !== this.state.persons || nextState.showPersons !== this.state.showPersons;
	// 	// return true; // return false if you want to cancel whole process and it will stop updating the dom
	
	// }

	UNSAFE_componentWillUpdate(nextProps,nextState) {
		console.log('update component', nextProps)
	}

	componentDidUpdate(){
		console.log('did update')
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
    // this.setState({showPersons: !doesShow, toggler: this.state.toggler + 1});

    // use this below code to update state correctly instead of above code line because using this.state in this.setState is harmful it may point to any different state in the file/app and may lead to inappropriate behaviour so use this below syntax to make sure it only update the prev state
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggler: prevState.toggler + 1
      }
    })
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons;
    const persons = [...this.state.persons]; // this is he efficient way that spread operator makes another copy
    persons.splice(index, 1); // splice can mutate the original array
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }
  // state is managed inside the component whereas props managed from outside the component like we define name and age in this component and use in another component using props and also state can only be defined in those component which extends Component.  
  render() { 
    // const style = {
    //   backgroundColor: 'green',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // }

    //this is the another way of clean show or hide.
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {
            // for dynamic iteration on array in react unlike we do in ng-repeat/*ngFor in angular and there should be key attribute when we iterate via map function in react, its very important because react make a virtual dom(the previous dom) and compare between both w.r.t key that which element change and which didn't and key must be unique and key has to be on the outer element or parent element.
          }
          <Persons 
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler}
            persons={this.state.persons}
          />
          {/* {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                key={index} // or key={person.id} unique key
                changed={(event) => this.nameChangeHandler(event, person.id)}
              />
            )
          })} */}
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'ojas!')}/>
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} changed={this.nameChangeHandler}>Hobbies: Swimming</Person> */}
        </div>
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }
    }

    // let classes = ['red', 'bold'].join(' ')

    // let classesNew = []
    // if(this.state.persons.length <= 2){
    //   classesNew.push('red');
    // }

    // if(this.state.persons.length <= 1){
    //   classesNew.push('bold');
    // }
    return ( // this whole code looks like js but it is jsx
      // we are not using div element as real html tags React is converting them behind the scenes
      // this below code looks like html but it really is jsx that's why it is bind in parenthesis of return statement
      
      // we have to write all code in one root element i.e., <div className="App"></div>, it doesn't any code outside the root parent element and gives us error, its a restriction of jsx
      // in JSX we use click listener with capital c in onClick whereas in normal JS we use small c in onclick  
      <StyleRoot>
        <div className="App"> 
          <Cockpit login={this.loginHandler} appTitle={this.props.title} clicked={this.togglePersonHandler} switch={this.switchNameHandler} persons={this.state.persons} showPersons={this.state.showPersons}/>
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
            // or AuthContext.Provider being a context component and provider means we are providing something from this component to another(all person child component) and in other component we use consumer
          }
          <AuthContext.Provider value={this.state.authenticated}> 
            {persons}
          </AuthContext.Provider>
        </div>
      </StyleRoot>
      // this click is just a click named property passing the switchNameHandler to person component dynamically like name and age
      // this is a standard convention of using capitalize form in react beacuse react treats capitalized form elements as custom elements like <Person /> or <Div> and won't interfere in it and normal <div> starts with small letter are being treated as native html elements in react jsx syntax
    )

    // this below code if the final result after compilation of above code, end result after compilation
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m react')) // this method requires arguments atleast three
    // React.createElement(element, className(optional), text inside the element) and if you want nested element inside any element then create another rect element inside it like above
  }
}
// Radium is for styles and with radium we can simply use psuedo selector or any selector in jsx for styling and also helps using media queries
export default Radium(App);
// export default App;


// how react updates the dom - 
// shouldComponentUpdate() passed -> render()
// old virtual dom(faster than real dom) -> re-rendered virtual dom // as we know react make a virtual dom to display the contents
// render() -> doesn't immediately updates the real dom 
// react compares both the dom and checks if there's any difference in it and if there is then how much difference is there, react will touch only particularly that content not the whole dom or in other words it wont re-render whole dom but only specific things 
// example if there's differnce in text change in a button then react only updates the text of that button and wont even touch the button