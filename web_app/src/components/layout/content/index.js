import React, { Component } from 'react';
import Header from '../header';

class Content extends Component {
    state = {
        onContainerClick: null,
    }
    onMenuOpenClick = () => {
        if (typeof this.props.onMenuOpenClick === "function")
            this.props.onMenuOpenClick();
        this.setState({ onContainerClick: this.onMenuCloseClick })

    }
    onMenuCloseClick = () => {
        if (typeof this.props.onMenuCloseClick === "function")
            this.props.onMenuCloseClick();
        this.setState({ onContainerClick: null })
    }
    render() {
        return (
            <div className="st-holder" onClick={this.state.onContainerClick}>
                <div className="st-pusher" onClick={this.state.onContainerClick}>
                    <div className="st-content">
                        <div className="st-content-inner">
                            <Header onMenuOpenClick={this.onMenuOpenClick} />
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;