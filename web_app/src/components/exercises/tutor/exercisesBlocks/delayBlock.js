import React, { Component } from 'react';
import TimerBlock from './timerBlock';
import { ExerciseBlockWrapper } from '../../styled';
import { TextContainer } from '../../../commonStyled';

class DelayBlock extends Component {

    onTimerDone = () => {
        if (typeof this.props.onStepDone === "function")
            this.props.onStepDone();
    }

    render() {
        const { text, model } = this.props;
        const secondsLimit = !!model && model.customType === "DELAY" ? model.delayTime : 3;
        return (
            <ExerciseBlockWrapper>
                <TextContainer center>
                    <h1>{text}</h1>
                    <TimerBlock startAtMount={true} onTimerDone={this.onTimerDone} secondsLimit={secondsLimit} />
                </TextContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default DelayBlock;