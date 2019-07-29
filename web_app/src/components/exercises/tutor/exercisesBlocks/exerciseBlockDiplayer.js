import React, { Component } from 'react';
import { RowContainer } from '../../../commonStyled';
import LiftingBlock from './liftingBlock';
import PuttingBlock from './puttingBlock';
import ShakingBlock from './shakingBlock';
import ShiftingBlock from './shiftingBlock';
import RotationBlock from './rotationBlock';
import TouchingBlock from './touchingBlock';
import PressureBlock from './pressureBlock';
import DelayBlock from './delayBlock';
import TextBlock from './textBlock';
import SuccessBlock from './successBlock';

class ExerciseBlockDiplayer extends Component {
    //componentDidUpdate minimalize rerenders
    render() {
        let exerciseBlock = null;
        const { model, onStepDone } = this.props;

        switch (model.customType) {
            case "LIFTING":
                exerciseBlock = <LiftingBlock {...this.props} />;
                break;
            case "PUTTING":
                exerciseBlock = <PuttingBlock {...this.props} />;
                break;
            case "SHIFTING":
                exerciseBlock = <ShiftingBlock {...this.props} />;
                break;
            case "ROTATION":
                exerciseBlock = <RotationBlock {...this.props} />;
                break;
            case "SHAKING":
                exerciseBlock = <ShakingBlock {...this.props} />;
                break;
            case "TOUCHING":
                exerciseBlock = <TouchingBlock {...this.props} />;
                break;
            case "PRESSURE":
                exerciseBlock = <PressureBlock {...this.props} onStepDone={onStepDone} />;
                break;
            case "START":
                exerciseBlock = <DelayBlock text="Start in: " onStepDone={onStepDone} />;
                break;
            case "FINISH":
                exerciseBlock = <TextBlock text="FINISH!!!!!! HURRAY :)" />;
                break;
            case "DELAY":
                exerciseBlock = <DelayBlock text="Wait: " model={model} onStepDone={onStepDone} />;
                break;
            case "SUCCESS":
                exerciseBlock = <SuccessBlock onStepDone={onStepDone}/>
                break;
            default:
                exerciseBlock = null;
                break;
        }

        return (
            <RowContainer center>
                {exerciseBlock}
            </RowContainer>
        );
    }
}

export default ExerciseBlockDiplayer;

export {
    LiftingBlock,
    PuttingBlock,
    ShakingBlock,
    ShiftingBlock,
    RotationBlock,
    TouchingBlock,
    PressureBlock,
    DelayBlock,
    TextBlock
};