import React from 'react'
import { connect } from 'react-redux'
import { verification } from '../redux/actions'

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Loading..."
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.token)
        this.props.verification(this.props.match.params.token)
        this.setState({ text: 'Verification Success' })
    }

    render() {
        return (
            <div>
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}

export default connect(null, { verification })(VerificationPage);