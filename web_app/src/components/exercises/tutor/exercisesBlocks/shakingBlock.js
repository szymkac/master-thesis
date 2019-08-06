import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { AnimMoveCircle } from '../../styled/exerciseAnimationItems'
import { filterAcceleration } from '../../../../utilities/mpu9250Filter';
import TimerBlock from './timerBlock';

const queueLength = 5;

class ShakingBlock extends Component {
    queue = [];
    circleRef = React.createRef();
    timerRef = React.createRef();
    shakingStarted = false;

    componentDidUpdate() {
        const { deviceData } = this.props;
        const { threshold } = this.props.model.options;
        const a = filterAcceleration(deviceData);
        const acceleration2d = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));

        this.queue.unshift(acceleration2d);
        if (this.queue.length === queueLength) {
            const averageAcceleration = this.queue.reduce((a, b) => (a + b)) / this.queue.length;
            if (averageAcceleration >= threshold) {
                this.circleRef.current.style.background = `green`;
                if (!this.shakingStarted) {
                    this.shakingStarted = true;
                    this.timerRef.current.start();
                }
            }
            else {
                this.shakingStarted = false;
                this.timerRef.current.reset();
                this.circleRef.current.style.background = `red`;
            }
            this.queue.pop();
        }
    }

    render() {
        const { onStepDone, model } = this.props;
        return (
            <ExerciseBlockWrapper>
                <AnimMoveCircle ref={this.circleRef} exercise="SHAKING">
                    <TimerBlock ref={this.timerRef}
                        secondsLimit={model.options.time}
                        onTimerDone={onStepDone} />
                </AnimMoveCircle>
            </ExerciseBlockWrapper>
        );
    }
}

export default ShakingBlock;