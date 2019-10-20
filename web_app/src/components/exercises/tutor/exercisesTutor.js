import React, { Component } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../../../services/firebase/index';
import ExerciseModel from '../../../models/exerciseModel';
import ExerciseQueueDispayer from './exerciseQueueDispayer'
import DeviceConnector from '../device/deviceConnector';
import DeviceData from '../../../models/deviceData';
import { ROLES } from '../../../constants/roles';
import { RowContainer, ColumnContainer } from '../../commonStyled';

class ExercisesTutor extends Component {
    state = {
        loading: false,
        exercise: null,
        deviceConnection: false,
        deviceData: null
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
        //console.log(e.data);
        const data = new DeviceData(e.data);
        if (data.valid)
            this.setState({ deviceData: data })
    }

    onFinish = time => {
        const { firebase, location, match } = this.props;

        const result = {
            userUid: location.state.authUser.uid,
            exerciseUid: match.params.id,
            time: time
        }

        firebase.results().push(result);
    }

    render() {
        const { location } = this.props;
        const { exercise, loading, deviceConnection, deviceData } = this.state;
        const userRoles = location.state.authUser.roles;
        const showHidden = userRoles.includes(ROLES.ADMIN);

        return (
            <>
                <RowContainer noBorder>
                    <ColumnContainer width="70%" noBorder>
                        {loading && <div>Loading...</div>}
                        <h1>{(!!exercise && exercise.name) || "Default exercise name"}</h1>
                        <h4>{(!!exercise && exercise.description) || "Default exercise description"}</h4>
                    </ColumnContainer>
                    <ColumnContainer width="30%" padding="10px">
                        <DeviceConnector authUser={location.state.authUser}
                            onDeviceConnectionChange={this.onDeviceConnectionChange}
                            onMessage={this.onDeviceData}
                            showHidden={showHidden} />
                    </ColumnContainer>
                </RowContainer>
                {
                    (exercise && deviceConnection) &&
                    <ExerciseQueueDispayer key={exercise.uid}
                        exerciseModel={exercise}
                        hand={location.state.hand}
                        deviceData={deviceData}
                        showHidden={showHidden}
                        onFinish={this.onFinish} />
                }
            </>
        );
    }
}

export default compose(
    withFirebase
)(ExercisesTutor);