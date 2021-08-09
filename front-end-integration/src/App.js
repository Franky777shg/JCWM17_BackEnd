import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// import pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisPage from './pages/register';
import VerificationPage from './pages/verification';

// import action
import { keepLogin } from './redux/actions'

class App extends React.Component {
  componentDidMount() {
    this.props.keepLogin()
  }

  render() {
    return (
      <div style={{ backgroundColor: '#A3DDCB' }}>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisPage} />
          <Route path="/verification/:token" component={VerificationPage} />
        </Switch>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     role: state.userReducer.role
//   }
// }

export default connect(null, { keepLogin })(App);