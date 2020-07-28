import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    constructor(props) {
        console.log('1.(mount) constructor')
        // called first, only once
        // setup intial values and variables and component state
        // only place where this.state should be used
        // everywhere else use setState()
        // dont use setState here
        // not needed if state is not initialized and methods are not bind
        super(props); // skipping this will lead to undefined props
        this.state = {
           mounted: true
        }
    }

    static getDerivedStateFromProps(props, state){
        // used when the state is dependent on props
        // must returns and object to update state of component
        // if null is returned no state is changed
        // it is static and hence no access to this
        // it is a pure function and no side effects should happen here
        console.log('2.(mount)(update) get derived state from props', props, state);

        if(state.value !== props.value) {
            return {
                derivedValue: 'new value',
                mirrorredProp: 'prop.value'
            }
        }
        return null; //means no change to state

    }

    render() {
        // this is a pure method
        // mandatory to be present in a component
        // can return 
        // 1. react elements - typically JSX elements
        // 2. array and fragments, - multiple elements
        // 3. portals, - lets you render children into a different DOM tree
        // 4. string and numbers - rendered as text nodes 
        // 5. booleans and nulls - renders nothing 
        // not invoked if shouldComponentUpdate() returns false

        console.log('3.(mount) render');
        let newCmp = '<p>this is before mount</p>';
        if(this.state.mounted) {
            newCmp = (<p>
                this is when mounted
            </p>)
        }
        return (
            <div>
            <div>
            {newCmp}
            </div>
            <div>
                <button onClick={this.onChangeHomeMounted.bind(this)} className="btn btn-primary">(Un)Mount home</button>
            </div>
            </div>
        );
    }
    componentDidMount() {
        // all interactions with the browser DOM and third party integrations
        // like d3 
        // all api calls should happen here
        console.log('4.(mount) component did mount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('2.a(update) should component update', nextProps, nextState);
        return true;
        //returning false here makes no chnages to the view [render() and componentDidUpdate() are not called]
        // called before rendering
        // exists as performance optimization
        // default is true
        // try to use a pure component instead of avoiding rerendering
        // pure component performs shallow compoarison of state and porops and reduces a chance to skip necessary update

    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        // called after render creates the elemets
        // and before updating the virtual DOM to actual DOM
        // like if you want to capture the scroll potision before it potentially changes
        // also know as pre-commit-phase
        // both current and previous stat and props are available
        console.log('3.a(udpate) get snapshot before update', prevProps, prevState);
        return null;
        // it is mandatory to retun a value or null

        // if it returns a vluae, it is available as third parameter in component did update
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // snapshot is the value returned from getSnapShotBeforeUpdate()
        // called when the DOM is updated
        // not called in initial render
        // not invoked if shouldComponentUpdate() returns false
        console.log('3.b(update) component did update', prevProps, prevState, snapshot)
    }

    componentWillUnmount(){
        // last method in lifecycle
        // all cleanups related to component happen here
        // dont call setState here
        console.log('5 (unmount) component will unmount');
    }


   
    static getDerivedStateFromError() {
        console.log('ERROR : get derived state from error')
    }

    componentDidCatch() {
        console.log('ERROR: component did catch');
    }

    onChangeHomeMounted() {
        console.log('on change home mounted')
        this.setState({
            mounted: !this.state.mounted
        })
    }

}

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);