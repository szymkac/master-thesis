import React, { Component } from 'react';
import { ToutchColumn, TouchCircle } from '../../../styled/exerciseAnimationItems'
import './touchingBlock.scss';


class TouchReflexIndicator extends Component {
    animRef = React.createRef()

    run = () => {
        const el = this.animRef.current;
        el.classList.add('on');
    }

    onTransitionEnd = () => {
        const el = this.animRef.current;
        el.classList.remove('on');

        const { onEnd, name } = this.props;
        onEnd(name);
    }

    render() {
        return (
            <ToutchColumn>
                <TouchCircle className="movable"
                    ref={this.animRef}
                    onTransitionEnd={this.onTransitionEnd}>
                </TouchCircle>
                <TouchCircle bottom></TouchCircle>
            </ToutchColumn>
        );
    }
}

export default TouchReflexIndicator;