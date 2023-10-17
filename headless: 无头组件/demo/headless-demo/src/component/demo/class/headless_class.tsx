import React from 'react';
import UIComponent from './ui'

interface CounterProps {
    initialCount?: number;
    onRef?:Function
}
interface CounterState {
    count: number;
}
class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = {
            count: props.initialCount || 0
        };
    }

    componentDidMount(): void {
        this.props.onRef && this.props.onRef(this);
    }

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    }
    decrement = () => {
        this.setState({ count: this.state.count - 1 });
    }
    reset =()  => {
        this.setState({ count: 0 });
    }
    render() {
        return <UIComponent
            count={this.state.count}
            increment={this.increment}
            decrement={this.decrement}
            reset={this.reset} />;
    }
}
export default Counter;
