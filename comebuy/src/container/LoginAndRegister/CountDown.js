/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React from 'react';

export default class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 3,
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const { count } = this.state;
            this.setState({
                count: count - 1,
            });
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.count !== this.state.count && this.state.count === 0) {
            clearInterval(this.timer);
            if (this.props.onTimesup) {
                this.props.onTimesup();
            }
        }
    }

    fmtMSS(s) {
        return (s - (s % 60)) / 60 + (s > 9 ? ':' : ':0') + s;
    }

    render() {
        const { count } = this.state;
        return (
            <h1
                style={{ marginRight: '10px', marginTop: '10px', fontSize: '20px', fontWeight: 'italic', color: 'red' }}
            >
                {this.fmtMSS(count)}s
            </h1>
        );
    }
}
