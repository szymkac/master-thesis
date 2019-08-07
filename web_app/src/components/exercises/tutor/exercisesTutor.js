import React, { Component } from 'react';
import { withFirebase } from '../../../pages/Firebase/index';
import ExerciseModel from '../../../models/exerciseModel';
import ExerciseQueueDispayer from './exerciseQueueDispayer'
import DeviceConnector from '../device/deviceConnector';

class ExercisesTutor extends Component {
    state = {
        loading: false,
        exercise: null,
        deviceConnection: false,
        deviceData: null,
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchData();
        }
    }

    fetchData = () => {
        if (!this.state.loading)
            this.setState({ loading: true });

        this.props.firebase.exercise(this.props.match.params.id).once('value', snapshot => {
            const exerciseDiagram = snapshot.val();
            this.setState({
                exercise: new ExerciseModel(this.props.match.params.id, exerciseDiagram),
                loading: false,
            });
        });
    }

    onDeviceConnectionChange = connection => {
        if (connection !== this.state.deviceConnection)
            this.setState({ deviceConnection: connection });
    }

    onDeviceData = e => {
        const data = JSON.parse(e.data);
        this.setState({ deviceData: data })
    }

    render() {
        const { location } = this.props;
        const { exercise, loading, deviceConnection, deviceData } = this.state;
        return (
            <div>
                <DeviceConnector authUser={location.state.authUser}
                    onDeviceConnectionChange={this.onDeviceConnectionChange}
                    onMessage={this.onDeviceData} />

                {loading && <div>Loading...</div>}
                <h1>{(!!exercise && exercise.name) || "Default exercise name"}</h1>
                <h4>{(!!exercise && exercise.description) || "Default exercise description"}</h4>
                {
                    (exercise && deviceConnection) &&
                    <ExerciseQueueDispayer key={exercise.uid}
                        exerciseModel={exercise}
                        hand={location.state.hand}
                        deviceData={deviceData} />
                }
            </div>
        );
    }
}

export default withFirebase(ExercisesTutor);