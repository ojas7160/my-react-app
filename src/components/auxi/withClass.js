import React, { Component } from 'react';

// stateless component
// const withClass = (WrappedComponent, classhh) => {
//     console.log(classhh)
//     return (props) => (
//         <div className={classhh}>
//             <WrappedComponent {...props}/>
//         </div>
//     )
// }

// stateful component
const withClass = (WrappedComponent, classhh) => {
    console.log(classhh)
    return class extends Component {
        render() {
            return (
                <div className={classhh}>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}
export default withClass;