import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../../styled';
import { RowContainer } from '../../../../commonStyled';
import TouchReflexIndicator from './touchReflexIndicator';
import * as FINGERS from '../../../../../constants/fingers';
import * as HANDS from '../../../../../constants/hands';
import { FINGERS_NAMES_INDEXES, FINGERS_INDEXES_NAMES } from '../../../../../constants/fingersOnHand';

const fingerTimes = {
    [FINGERS.THUMB]: null,
    [FINGERS.INDEX]: null,
    [FINGERS.MIDDLE]: null,
    [FINGERS.RING]: null,
    [FINGERS.LITTLE]: null
};

class TouchingBlock extends Component {
    thumbRef = React.createRef();
    indexRef = React.createRef();
    middleRef = React.createRef();
    ringRef = React.createRef();
    littleRef = React.createRef();

    runned = false;
    touchTimes = { ...fingerTimes };
    finishTime = null;
    selected = [];
    validTouches = 0;
    unvalidTouches = 0;

    clear = () => {
        this.runned = false;
        this.touchTimes = { ...fingerTimes };
        this.finishTime = null;
        this.selected = [];
        this.validTouches = 0;
        this.unvalidTouches = 0;
    }

    shouldComponentUpdate(nextProps) {
        if (!this.runned)
            this.runIndicators();

        const { deviceData, hand } = nextProps;
        const indexNames = FINGERS_INDEXES_NAMES[hand];
        const time = new Date().getTime();
        console.log(deviceData.f[0])
        Object.keys(indexNames).forEach(k => {
            if (deviceData.f[k] > 5 && this.touchTimes[indexNames[k]] === null) {
                this.touchTimes[indexNames[k]] = time;

                if (this.selected.includes(parseInt(k)))
                    this.validTouches++;
                else
                    this.unvalidTouches++;
            }
        });

        this.tryFinish(deviceData.f);

        return false;
    }

    tryFinish = (f) => {
        if (this.validTouches === this.selected.length) {
            //TODO change this later moron :)
            //THIS IS PROPER SOLUTION !!!
            //if (f.filter(x => x > 5).length === 0) {
            //THIS IS TEMPORARY (UNTIL ALL FORCEMETERS WILL BE WORKING RIGHT WAY)
            if (f[0] < 5) {
                this.clear();
                this.props.onStepDone();
            }
        }
    }

    runIndicators = () => {
        this.runned = true;
        const { hand } = this.props;
        const { options } = this.props.model;
        const nameIndexes = FINGERS_NAMES_INDEXES[hand];
        this.selected = [];

        if (options.random) {
            //TODO Random selection
        }
        else {
            if (options.thumb) {
                this.thumbRef.current.run();
                this.selected.push(nameIndexes[FINGERS.THUMB]);
            }
            if (options.index) {
                this.indexRef.current.run();
                this.selected.push(nameIndexes[FINGERS.INDEX]);
            }
            if (options.middle) {
                this.middleRef.current.run();
                this.selected.push(nameIndexes[FINGERS.MIDDLE]);
            }
            if (options.ring) {
                this.ringRef.current.run();
                this.selected.push(nameIndexes[FINGERS.RING]);
            }
            if (options.little) {
                this.littleRef.current.run();
                this.selected.push(nameIndexes[FINGERS.LITTLE]);
            }
        }
    }

    onIndicatorEnd = () => {
        if (this.finishTime === null)
            this.finishTime = new Date().getTime();
    }

    render() {
        const { hand } = this.props;
        return (
            <ExerciseBlockWrapper>
                <RowContainer noBorder height="100%">
                    {hand === HANDS.RIGHT && <TouchReflexIndicator ref={this.thumbRef} onEnd={this.onIndicatorEnd} />}
                    <TouchReflexIndicator ref={this.indexRef} onEnd={this.onIndicatorEnd} />
                    <TouchReflexIndicator ref={this.middleRef} onEnd={this.onIndicatorEnd} />
                    <TouchReflexIndicator ref={this.ringRef} onEnd={this.onIndicatorEnd} />
                    <TouchReflexIndicator ref={this.littleRef} onEnd={this.onIndicatorEnd} />
                    {hand === HANDS.LEFT && <TouchReflexIndicator ref={this.thumbRef} onEnd={this.onIndicatorEnd} />}
                </RowContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default TouchingBlock;