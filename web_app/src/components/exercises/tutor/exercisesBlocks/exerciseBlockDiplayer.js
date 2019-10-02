import React, { Component } from 'react';
import { RowContainer, H2 } from '../../../commonStyled';
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
import * as EXERCISES from '../../../../constants/exercises';
import { SUCCESS } from '../../../../constants/other';

class ExerciseBlockDiplayer extends Component {
    render() {
        let exerciseBlock = null;
        const { model, onStepDone } = this.props;

        switch (model.customType) {
            case EXERCISES.LIFTING.type:
                exerciseBlock = <LiftingBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.PUTTING.type:
                exerciseBlock = <PuttingBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.SHIFTING.type:
                exerciseBlock = <ShiftingBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.ROTATION.type:
                exerciseBlock = <RotationBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.SHAKING.type:
                exerciseBlock = <ShakingBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.TOUCHING.type:
                exerciseBlock = <TouchingBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.PRESSURE.type:
                exerciseBlock = <PressureBlock {...this.props} key={model.id} />;
                break;
            case EXERCISES.START.type:
                exerciseBlock = <DelayBlock text="Start in: " onStepDone={onStepDone} />;
                break;
            case EXERCISES.FINISH.type:
                exerciseBlock = <TextBlock text="FINISH!!!!!! HURRAY :)" />;
                break;
            case EXERCISES.DELAY.type:
                exerciseBlock = <DelayBlock text="Wait: " model={model} onStepDone={onStepDone} key={model.id} />;
                break;
            case SUCCESS:
                exerciseBlock = <SuccessBlock onStepDone={onStepDone} />
                break;
            default:
                exerciseBlock = null;
                break;
        }

        const description = EXERCISES[model.customType].description;

        return (
            <>
                <RowContainer center noBorder height="95px" padding="30px">
                    {description && <H2 margin>{description}</H2>}
                </RowContainer>
                <RowContainer noBorder center padding="20px">
                    {exerciseBlock}
                </RowContainer>
            </>
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