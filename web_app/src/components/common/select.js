import React, { Component } from 'react';
import { FancySelect, FancyLabel, Row } from '../commonStyled';

class Select extends Component {
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
        const { labelText, propertyName, value, smallLabel, options, placeholder } = this.props;
        const selectProps = !!propertyName ?
            { ref: this.inputRef, defaultValue: value, onChange: this.onUncontroledChange, placeholder: placeholder }
            : { value: this.state.value, onChange: this.onControledChange, placeholder: placeholder };

        const select = <FancySelect {...selectProps}>
            {options.map(x => <option key={x.value} value={x.value}>{x.description}</option>)}
        </FancySelect>;

        if (!!labelText)
            return (
                <FancyLabel smallLabel={smallLabel}>
                    <Row>
                        {labelText}
                    </Row>
                    <Row>
                        {select}
                    </Row>
                </FancyLabel>
            );
        else
            return select;
    }
}

export default Select;