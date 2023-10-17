import React from 'react';
interface CounterProps {
    increment: Function;
    decrement: Function;
    reset: Function;
    count: number;
}

class MyComponent extends React.Component<CounterProps> {
    handleIncrement = () => {
        const { increment } = this.props
        increment();
    };
    handleDecrement = () => {
        const { decrement } = this.props
        decrement();
    };
    handleReset = () => {
        const { reset } = this.props
        reset();
    };
    render (){
        const { count } = this.props
        return (
            <div>
                {count}
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
                <button onClick={this.handleReset}>重置</button>
            </div>
        );
    }
}
export default MyComponent;