import React, { Component } from 'react';
import { FancyTextBox, FancyLabel, Row } from '../commonStyled';

class TextBox extends Component {
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
            this.inputRef.current.value = this.props.value || "";
    }

    onControledChange = event => {
        this.setState({ value: event.target.value });
    }

    onUncontroledChange = event => {
        const { onChange, propertyName } = this.props;

        if (typeof onChange === "function")
            onChange(event.target.value, propertyName);
    }

    render() {
        const { labelText, propertyName, value, smallLabel, placeholder, name, type } = this.props;
        const inputType = type || "text";


        const input = !!propertyName ?
            <FancyTextBox type={inputType} name={name} ref={this.inputRef} placeholder={placeholder} defaultValue={value} onChange={this.onUncontroledChange} />
            : <FancyTextBox type={inputType} name={name} value={this.state.value} placeholder={placeholder} onChange={this.onControledChange} />;

        if (!!labelText)
            return (
                <FancyLabel smallLabel={smallLabel}>
                    <Row>
                        {labelText}
                    </Row>
                    <Row>
                        {input}
                    </Row>
                </FancyLabel>
            );
        else
            return input;
    }
}

export default TextBox;