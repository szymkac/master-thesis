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

        Object.keys(indexNames).forEach(k => {
            if (deviceData.f[k] > 5 && this.touchTimes[indexNames[k]] === null) {
                this.touchTimes[indexNames[k]] = time;

                if (this.selected.includes(parseInt(k)))
                    this.setValidTouch(indexNames[k]);
                else
                    this.setUnvalidTouch(indexNames[k]);
            }
        });

        this.tryFinish(deviceData.f);

        return false;
    }

    setValidTouch(finger) {
        this.validTouches++;
        this[`${finger}Ref`].current.setValidColor(true);
    }

    setUnvalidTouch(finger) {
        this.unvalidTouches++;
        this[`${finger}Ref`].current.setValidColor(false);
    }

    tryFinish = (f) => {
        if (this.validTouches === this.selected.length) {
            if (f.filter(x => x > 5).length === 0) {
                this.clear();
                this.props.onStepDone();
            }
        }
    }

    runIndicators = () => {
        this.clearAllIndicators();
        this.runned = true;
        const { hand } = this.props;
        const { options } = this.props.model;
        this.selected = [];

        const indexNames = FINGERS_INDEXES_NAMES[hand];

        if (options.random) {
            const randomAmount = Math.floor(Math.random() * options.randomMax) + 1;
            const fingerIndexes = Object.keys(indexNames);
            for (let i = 0; i < randomAmount; i++) {
                const randomKey = parseInt(fingerIndexes[Math.floor(Math.random() * fingerIndexes.length)]);
                if (!this.selected.includes(randomKey))
                    this.selected.push(randomKey);
                else
                    i--;
            }
        }
        else {
            const nameIndexes = FINGERS_NAMES_INDEXES[hand];
            if (options.thumb)
                this.selected.push(nameIndexes[FINGERS.THUMB]);
            if (options.index)
                this.selected.push(nameIndexes[FINGERS.INDEX]);
            if (options.middle)
                this.selected.push(nameIndexes[FINGERS.MIDDLE]);
            if (options.ring)
                this.selected.push(nameIndexes[FINGERS.RING]);
            if (options.little)
                this.selected.push(nameIndexes[FINGERS.LITTLE]);
        }

        setTimeout(this.runSelected, 50);
    }

    clearAllIndicators = () => {
        const nameIndexes = FINGERS_NAMES_INDEXES[this.props.hand];
        Object.keys(nameIndexes).forEach(x => 
            this[`${x}Ref`].current.clearValidColor());
    }

    runSelected = () => {
        const indexNames = FINGERS_INDEXES_NAMES[this.props.hand];
        this.selected.forEach(s =>
            this[`${indexNames[s]}Ref`].current.run());
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