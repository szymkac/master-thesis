import React, { Component } from 'react';
import { getOptionsConfig } from './exercisesDiagramUtility/exercisesOptionsFactory';

class ExerciseStepOptions extends Component {
    constructor(props) {
        super(props);
        this.state = this.getState(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.node.id !== this.props.node.id) {
            this.setState(this.getState(this.props));
        }
    }

    getState = props => {
        const { optionsValues, node } = props;
        return {
            config: getOptionsConfig(node.customType),
            edited: false,
            ...optionsValues
        };
    }

    onOptionChange = (value, propertyName) => {
        this.setState({ [propertyName]: value, edited: true });
    }

    getOptions = () => {
        const { config } = this.state;
        let options = {};
        const keys = !!config ? Object.keys(config) : [];
        keys.forEach(key => options[key] = this.state[key]);
        return options;
    }

    wasOptionsEdited = () => this.state.edited;

    render() {
        const { node } = this.props;
        const { config } = this.state;
        const keys = !!config ? Object.keys(config) : [];

        return (
            <div>
                <h3>Options:</h3>
                <h4>Node: {node.name}</h4>
                {
                    keys.map(key => {
                        const keyConfig = config[key];
                        return <keyConfig.component
                            key={key}
                            propertyName={key}
                            labelText={keyConfig.labelText}
                            value={this.state[key]}
                            onChange={this.onOptionChange}
                            smallLabel={true} />
                    })
                }
            </div>
        );
    }
}

export default ExerciseStepOptions;