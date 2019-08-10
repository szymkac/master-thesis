import React, { Component } from 'react';
import { ToutchColumn, TouchCircle } from '../../../styled/exerciseAnimationItems'
import './touchingBlock.scss';


class TouchReflexIndicator extends Component {
    animRef = React.createRef();
    staticRef = React.createRef();

    run = () => {
        this.staticRef.current.style.background = 'white';
        this.staticRef.current.style.border = "5px solid yellow";
        const el = this.animRef.current;
        el.classList.add('on');
    }

    onTransitionEnd = () => {
        const el = this.animRef.current;
        el.classList.remove('on');

        const { onEnd } = this.props;
        onEnd();
    }

    setValidColor(valid) {
        this.staticRef.current.style.background = valid ? 'green' : 'red';
        this.staticRef.current.style.border = "2px solid black";
    }

    render() {
        return (
            <ToutchColumn>
                <TouchCircle className="movable"
                    ref={this.animRef}
                    onTransitionEnd={this.onTransitionEnd}>
                </TouchCircle>
                <TouchCircle
                    bottom
                    ref={this.staticRef}>
                </TouchCircle>
            </ToutchColumn>
        );
    }
}

export default TouchReflexIndicator;