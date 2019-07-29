import React, { Component } from 'react';

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
            this.inputRef.current.checked = this.props.value || "";
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
        const { labelText, propertyName, value } = this.props;
        const input = !!propertyName ?
            <input type="checkbox" ref={this.inputRef} defaultChecked={value} onChange={this.onUncontroledChange} />
            : <input type="checkbox" checked={this.state.value} onChange={this.onControledChange} />;

        if (!!labelText)
            return (
                <label>
                    {labelText}
                    {input}
                </label>
            );
        else
            return input;
    }
}

export default CheckBox;