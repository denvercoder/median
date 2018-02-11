import { Link } from 'react-router'
import React from 'react'
import ListErrors from './ListErrors'
import agent from '../agent'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state.auth })

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onChangeUsername: value => dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'username', value }),
  onSubmit: (username, email, password) =>
    dispatch({ type: 'REGISTER', payload: agent.Auth.register(username, email, password) }),
})

class Register extends React.Component {
  constructor() {
    super()

    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(username, email, password)
    }
  }
  render() {
    const username = this.props.username
    const email = this.props.email
    const password = this.props.password

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="login">Have an account?</Link>
              </p>
              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword}
                    />

                    <button
                      classname="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      disabled={this.props.inProgress}
                    >
                      Sign Up
                    </button>
                  </fieldset>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
