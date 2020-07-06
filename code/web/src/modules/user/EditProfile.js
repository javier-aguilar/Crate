import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateUser } from './api/actions'

class EditProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        error: '',
        isLoading: false,
        user: {
          name: this.props.user.details.name,
          email: this.props.user.details.email,
          password: this.props.user.details.password,
        }
      }
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value;

    this.setState({user});
  }

  onClick = (event) => {
    updateUser(this.state.user)
  }


  render() {
    return (
      <div>
      <input name="email" onChange={this.onChange} value={this.state.user.email} />
      <button onClick={this.onClick}>Save</button>
    </div>
    )
  }
}

const editProfileState = (state) => {
  return {
    user: state.user
  }
}

export default connect(editProfileState)(EditProfile)