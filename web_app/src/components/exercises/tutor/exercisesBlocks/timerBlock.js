import React, { Component } from 'react';
import Timer from '../../../../utilities/timer';

class TimerBlock extends Component {
    constructor(props) {
        super(props);
        this.timer = new Timer(props.onTimerDone, this.onTimerUpdate);
        this.state = {
            conter: props.secondsLimit,
            started: false
        };
    }

    componentDidMount() {
        if (this.props.startAtMount)
            this.start();
    }

    componentWillUnmount() {
        this.timer.clear();
    }

    start = () => {
        this.setState({
            conter: this.props.secondsLimit,
            started: true
        }, this.timer.startTimer(this.props.secondsLimit));
    }

    reset = () => {
        this.timer.clear();
        this.setState({
            conter: this.props.secondsLimit,
            started: false
        });
    }

    onTimerUpdate = (second) => {
        this.setState({ conter: this.props.secondsLimit - second + 1 });
    }

    render() {
        const { beforeStartText } = this.props;
        const { conter, started } = this.state;

        return (
            <h2>{!!beforeStartText && !started ? beforeStartText : conter}</h2>
        )
    }
}

TimerBlock.defaultProps = {
    secondsLimit: 3,
    beforeStartText: null
}

export default TimerBlock;