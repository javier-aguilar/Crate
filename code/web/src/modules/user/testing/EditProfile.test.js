import React from "react";
import { MemoryRouter, Router } from "react-router-dom";
import EditProfile from '../EditProfile';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { Provider } from "react-redux";
import { createStore, compose } from 'redux'
import { rootReducer } from '../../../setup/store'
import { createMemoryHistory } from 'history'

describe('Edit Profile', () => {

  it('should render without crashing', () => {
    const store = createStore(rootReducer, compose())
    const history = createMemoryHistory()
    const { getByText } = render(
    <Provider>
      <MemoryRouter>
        <EditProfile/>
      </MemoryRouter>
    </Provider>
    )

    const header = getByText('My Profile')

    expect(header).toBeInTheDocument()
  })
})