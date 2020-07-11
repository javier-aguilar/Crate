import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from './api/actions';
import { Helmet } from 'react-helmet';
import Button from '../../ui/button';
import { Grid, GridCell } from '../../ui/grid';
import { H3, H4 } from '../../ui/typography';
import { grey, grey2 } from '../../ui/common/colors';

const Products = (props) => {
  return (
    <div>
      <Helmet>
        <title>My Product History - Crate</title>
      </Helmet>
      <Grid style={{ backgroundColor: grey }}>
        <GridCell style={{ padding: '2em', textAlign: 'center' }}>
          <H3 font="secondary">My Product History</H3>
        </GridCell>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button theme="secondary" onClick={props.logout} style={{ margin: '1em'}}>Logout</Button>
      </div>
      <section>
        
      </section>
    </div>
  )
}

function productsState(state) {
  return {
    user: state.user,
  }
}

export default connect(productsState, { logout })(Products)
