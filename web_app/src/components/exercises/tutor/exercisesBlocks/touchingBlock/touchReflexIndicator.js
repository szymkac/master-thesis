import React, { Component } from 'react';
import { ToutchColumn, AnimMoveCircle } from '../../../styled/exerciseAnimationItems'

class TouchReflexIndicator extends Component {
    animRef = React.createRef()

    onAnimationStart = () => {
        const { onAnimationStart, key } = this.props;
        if (typeof onAnimationStart === "function")
            onAnimationStart(key);
    }

    onAnimationEnd = () => {
        const { onAnimationEnd, key } = this.props;
        if (typeof onAnimationEnd === "function")
            onAnimationEnd(key);
    }

    restartAnimation = () => {
        console.log("im trying")
        let el = this.animRef.current;
        el.style.animationIterationCount = 1;
        el.style.animation = 'none';
        el.getClientRects();
        el.style.animation = null;
    }

    render() {
        return (
            <ToutchColumn>
                <AnimMoveCircle center
                    size="50px"
                    exercise="TOUCHING"
                    ref={this.animRef}
                    onAnimationStart={this.onAnimationStart}
                    onAnimationEnd={this.onAnimationEnd}>
                </AnimMoveCircle>
                <AnimMoveCircle center bottom
                    size="50px">
                </AnimMoveCircle>
                <button onClick={this.restartAnimation}></button>
            </ToutchColumn>
        );
    }
}

export default TouchReflexIndicator;