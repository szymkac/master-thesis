import React, { Component } from 'react';
import { FancyCheckBox, FancyLabel, FancyCheckBoxLabel } from '../commonStyled';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialValue || ''
        }
        this.inputRef = !!props.propertyName && React.createRef();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value !== this.props.value || this.state.value !== nextState.value
    }

    componentDidUpdate(prevProps) {
        if (!!this.inputRef && prevProps.value !== this.props.value)
            this.inputRef.current.checked = this.props.value || false;
    }

    onControledChange = event => {
        this.setState({ value: event.target.checked });
    }

    onUncontroledChange = event => {
        const { onChange, propertyName } = this.props;

        if (typeof onChange === "function")
            onChange(event.target.checked, propertyName);
    }

    render() {
        const { labelText, propertyName, value, smallLabel } = this.props;
        const input = !!propertyName ?
            <FancyCheckBox ref={this.inputRef} defaultChecked={value} onChange={this.onUncontroledChange} />
            : <FancyCheckBox checked={this.state.value} onChange={this.onControledChange} />;

        if (!!labelText)
            return (
                <FancyLabel row smallLabel={smallLabel}>
                    {input}
                    <FancyCheckBoxLabel>
                        {labelText}
                    </FancyCheckBoxLabel>
                </FancyLabel>
            );
        else
            return input;
    }
}

export default CheckBox;