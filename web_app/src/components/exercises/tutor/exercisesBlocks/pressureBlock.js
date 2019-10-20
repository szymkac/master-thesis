import React, { Component } from 'react';
import { ExerciseBlockWrapper } from '../../styled'
import { RowContainer } from '../../../commonStyled';
import { ToutchColumn, PresureCircle } from '../../styled/exerciseAnimationItems'
import TimerBlock from './timerBlock';
import * as HANDS from '../../../../constants/hands';
import { PRESSURE_VALUS } from '../../../../constants/pressureThresholdsOptions';

const maxForce = 120; //temporary

class PressureBlock extends Component {
    presure0Ref = React.createRef();
    presure1Ref = React.createRef();
    presure2Ref = React.createRef();
    presure3Ref = React.createRef();
    presure4Ref = React.createRef();
    timerRef = React.createRef();

    valid = false;

    shouldComponentUpdate(nextProps) {
        const { deviceData, hand } = nextProps;
        // if (!!deviceData) {
        //     this.setColor(this.presure0Ref, hand === HANDS.RIGHT ? deviceData.f[0] : deviceData.f[5]);
        //     this.setColor(this.presure1Ref, deviceData.f[1]);
        //     this.setColor(this.presure2Ref, deviceData.f[2]);
        //     this.setColor(this.presure3Ref, deviceData.f[3]);
        //     this.setColor(this.presure4Ref, deviceData.f[4]);
        // }

        if (!!deviceData) {
            this.setColor(this.presure0Ref, deviceData.f[0]);
            this.setColor(this.presure1Ref, deviceData.f[1]);
            this.setColor(this.presure2Ref, deviceData.f[2]);
            this.setColor(this.presure3Ref, deviceData.f[4]);
            this.setColor(this.presure4Ref, deviceData.f[5]);
        }

        // const valid = hand === HANDS.RIGHT ? this.validateForce(deviceData.f.slice(0, 5)) :
        //     this.validateForce(deviceData.f.slice(1, 6));

        const { f } = deviceData;
        const valid = this.validateForce([f[0], f[1], f[2], f[4], f[5]]);

        if (!this.valid && valid)
            this.timerRef.current.start();
        else if (this.valid && !valid)
            this.timerRef.current.reset();

        // TODO Data collection
        this.valid = valid;

        return false;
    }

    setColor = (ref, force) => {
        const hue = ((1 - (force / maxForce)) * 120).toString(10);
        ref.current.style.background = `hsl(${hue},100%,50%)`;
    }

    validateForce = force => {
        const { options } = this.props.model;
        const thresholds = PRESSURE_VALUS[options.threshold];
        const validated = force.map(x => x >= thresholds.min).filter(x => x);
        return options.rigor ? validated.length === 5 : validated.length > 0;
    }

    render() {
        const { hand, onStepDone, model } = this.props;

        return (
            <ExerciseBlockWrapper>
                <RowContainer noBorder height="20%">
                    <TimerBlock ref={this.timerRef}
                        secondsLimit={model.options.time}
                        beforeStartText="Pressure the device!!"
                        onTimerDone={onStepDone} />
                </RowContainer>
                <RowContainer noBorder height="80%">

                    {hand === HANDS.RIGHT &&
                        <ToutchColumn>
                            <PresureCircle ref={this.presure0Ref}>
                            </PresureCircle>
                        </ToutchColumn>
                    }

                    <ToutchColumn>
                        <PresureCircle ref={this.presure1Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure2Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure3Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    <ToutchColumn>
                        <PresureCircle ref={this.presure4Ref}>
                        </PresureCircle>
                    </ToutchColumn>

                    {hand === HANDS.LEFT &&
                        <ToutchColumn>
                            <PresureCircle ref={this.presure0Ref}>
                            </PresureCircle>
                        </ToutchColumn>
                    }

                </RowContainer>
            </ExerciseBlockWrapper>
        );
    }
}

export default PressureBlock;