import React, { Component } from 'react';
import { withFirebase } from '../../../services/firebase';

class DeviceConnector extends Component {
    socket = null;
    deviceIP = null;
    listener = null;
    state = {
        socketOpen: false
    }

    componentDidMount() {
        this.setDeviceListener();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.authUser.uid !== this.props.authUser.uid || nextState.socketOpen !== this.state.socketOpen;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authUser.uid !== this.props.authUser.uid) {
            this.setDeviceListener();
        }
    }

    componentWillUnmount() {
        this.closeDeviceSocket();
        if (!!this.listener)
            this.listener.off();
    }

    setDeviceListener() {
        const { firebase, authUser } = this.props;
        if (!!this.listener)
            this.listener.off();

        this.listener = firebase.user(authUser.uid);
        this.listener.on('value', snapshot => {
            const user = snapshot.val();
            if (!!user.deviceIP && user.deviceIP !== "0.0.0.0" && user.deviceIP !== this.deviceIP) {
                this.deviceIP = user.deviceIP;
                this.openDeviceSocket();
            }
        });
    }

    openDeviceSocket = () => {
        const { onDeviceConnectionChange } = this.props;
        this.closeDeviceSocket();
        this.socket = new WebSocket(`ws://${this.deviceIP}:81/`);
        this.socket.onerror = () => {
            console.log("socket error");
            this.setState({ socketOpen: false });
            if (typeof onDeviceConnectionChange === "function")
                onDeviceConnectionChange(false);
        }
        this.socket.onopen = () => {
            console.log("socket open");
            this.setState({ socketOpen: true });
            if (typeof onDeviceConnectionChange === "function")
                onDeviceConnectionChange(true);
        };
        this.socket.onmessage = this.props.onMessage;
    }

    closeDeviceSocket = () => {
        if (!!this.socket && this.state.socketOpen) {
            this.socket.close();
            this.socket = null;
            if (typeof this.props.onDeviceConnectionChange === "function")
                this.props.onDeviceConnectionChange(false);
        }
    }

    startWithoutDevice = () => {
        console.log("try no connect");
        if (typeof this.props.onDeviceConnectionChange === "function")
            this.props.onDeviceConnectionChange(true);
    }

    render() {
        const { userIsAdmin } = this.props;
        const { socketOpen } = this.state;

        return (
            <div>
                <h4>Device IP: {this.deviceIP || "no IP"}</h4>
                {socketOpen ? "Connected" : "No connected"}
                <button onClick={this.openDeviceSocket}>Try connect</button>
                {userIsAdmin && <button onClick={this.startWithoutDevice} >Start without device</button>}
            </div>
        );
    }
}

const onMessage = e => console.log(e.data);


DeviceConnector.defaultProps = {
    onMessage: onMessage
};

export default withFirebase(DeviceConnector);