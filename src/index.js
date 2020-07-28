import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD

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
=======
import './index.css';

// Fucntion components :
//  simpler way to write components that only contain a render method
// and no state of their own
// this is a function component for the class compoennt Square
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// class Square extends React.Component {

//   render() {
//     return (
//       <button 
//       className="square" 
//       onClick={() => this.props.onClick() }>
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {

    renderSquare(i) {
        return (<Square value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                }
            ],
            stepNumber: 0,
            xIsNext: true
        }
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext:(step%2) === 0,
        })
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

    render() {

        const history = this.state.history ;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step,move) => {
            const desc = move ? 
            'Go to move #' + move : 
            'Go to game start';

            return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )

        })

        let status;
        if(winner) { 
            status = 'Winner: ' + winner;

        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O')
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status }</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
>>>>>>> master
