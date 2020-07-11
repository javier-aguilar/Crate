import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { updateUser } from './api/actions'
import IosContactOutline from 'react-ionicons/lib/IosContactOutline'
import Button from '../../ui/button'
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

class EditProfile extends Component {
  constructor(props) {
    super(props)
      this.state = {
        error: '',
        isLoading: false,
        user: {
          id: this.props.user.details.id,
          name: this.props.user.details.name,
          email: this.props.user.details.email,
          address: this.props.user.details.address,
          description: this.props.user.details.description
        }
      }
  }

  onChange = (event) => {
    let user = this.state.user
    user[event.target.name] = event.target.value;

    this.setState({user});
  }

  onClick = (event) => {
    this.props.updateUser(this.state.user)
  }


  render() {
    return (
      <div>
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Edit Profile</H3>
          </GridCell>
        </Grid>
      <section style={{display: 'flex', justifyContent: 'space-evenly', height: '85vh', }}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <IosContactOutline color="grey" fontSize="250px" style={{margin: '1rem'}}/>
          <button style={{border: 'none', backgroundColor: 'inherit', padding: '1rem 0', textDecoration: 'underline', cursor: 'pointer'}}>Edit Photo</button>
        </div>
        <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '25rem', height: '30rem'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label style={{padding: '1rem 0'}}>Name</label>
            <input name="name" onChange={this.onChange} value={this.state.user.name} style={{paddingLeft: '.5rem', height: '2rem'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label style={{padding: '1rem 0'}}>Email</label>
            <input name="email" onChange={this.onChange} value={this.state.user.email} style={{paddingLeft: '.5rem', height: '2rem'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label style={{padding: '1rem 0'}}>Shipping Address</label>
            <input name="address" onChange={this.onChange} value={this.state.user.address} style={{paddingLeft: '.5rem', height: '2rem'}}/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <label style={{padding: '1rem 0'}}>Personal Description</label>
            <textarea name="description" onChange={this.onChange} value={this.state.user.description} style={{paddingLeft: '.5rem', height: '5rem'}}></textarea>
          </div>
          <Link to='/user/profile'>
            <Button theme='secondary' onClick={this.onClick} style={{margin: '1rem 0', width: '50%', alignSelf: 'center'}}>Save</Button>
          </Link>
        </form>
      </section>
      </div>
    )
  }
}

const editProfileState = (state) => {
  return {
    user: state.user
  }
}

export default connect(editProfileState, { updateUser } )(withRouter(EditProfile))
