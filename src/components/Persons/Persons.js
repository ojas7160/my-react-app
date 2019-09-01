import React from 'react';
import Person from './Person/Person';

// often try to create functional components more and more because have a narrow focus and they are about to presenting something and rendering jsx and the only thing they dont/cant do is to maintain state

const persons = (props) => props.persons.map((person, index) => {
    return <Person 
        name={person.name}
        click={() => props.clicked(index)}
        age={person.age}
        key={person.id}
        changed={(event) => props.changed(event, person.id)}
    />
});
export default persons;

// differnce between stateful(containers) and stateless components

/* class XY extends ReactComponent             const xyz = (props) => {}
* access to state                             no access to state
* lifecycle hooks                             no lifecycle hooks
* access state and props via 'this'           access props via 'props'
*/

// Component lifecycle - creation

/*
 - constructor() first to gets executed 
    super() method needs to be called when the constructor is created so that the Component class methods are available
    and use to set up/initialize state
    dont cause side effects means dont update or hit request which updates dom or state

 - componentWillMount() - after constructor this methos gets executed
    update state
    last minute optimizations
    dont cause side effects means dont update or hit request which updates dom or state

 - render() - after willMount
    prepare and structure JSX code or will contents should be rendered for this component
    * and after render() it render all the child components
    when the state changes it will re-render()
    dont cause side effects means dont update or hit request which updates dom or state

 - componentDidMount() - after render()
    can cause side effects 
*/

// Component lifecycle - updation
  
/*
 - componentWillReceiveProps(nextProps) - first to gets executed
    sync state to props
    dont cause side effects means dont update or hit request which updates dom or state

 - shouldComponentUpdate(nextProps, nextState) - after componentWillReceiveProps
    decide whether to continue or not
    returns boolean
    dont cause side effects means dont update or hit request which updates dom or state

 - componentWillUpdate() - after shouldComponentUpdate()
    sync state to props
    can cause side effects

 -render() - after  componentWillUpdate()
    prepare and structure JSX code
    *update all child components props

 - getSnapShotBeforeUpdate() - juts before something's updated in the Dom

 - componentDidUpdate()
    dont update state here
    can cause side effects
*/
