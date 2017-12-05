// @flow

import type { GlobalSubscriptionsState } from 'meteor-redux-subscriptions'
import { getSubscriptionIdSelector } from '..'

describe('selectors', () => {

  it('#getSubscriptionIdSelector', () => {
    const state: GlobalSubscriptionsState = {
      subscriptions: [{id: 'id-1', load: false, name: 'name-1'}]
    }
    expect(getSubscriptionIdSelector('name-1')(state)).toBe('id-1')
    expect(getSubscriptionIdSelector('name-2')(state)).toBe(null)
  })

})
