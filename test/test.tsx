import React from 'react'
import { ListOfNonces } from './test-components'
import { NonceProvider } from '../src/usenonce'

import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import toJSON from 'enzyme-to-json'

configure({ adapter: new Adapter() })

test('deterministic rendering', () => {
  const wrapper = mount(
    <NonceProvider>
      <ListOfNonces/>
    </NonceProvider>
  )

  expect(toJSON(wrapper)).toMatchSnapshot()

  wrapper.find('button').last().simulate('click')
  wrapper.update()

  // Make sure that nonces are stable across re-renders
  expect(toJSON(wrapper)).toMatchSnapshot()
})
