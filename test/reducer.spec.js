// @flow

import { reducer, SetSubscriptionActionType, RemoveSubscriptionActionType } from '../'
import type { SetSubscriptionAction, RemoveSubscriptionAction } from 'meteor-redux-subscriptions'

describe('reducer', () => {

  it('#SetSubscription', () => {
    const payload = { id: 'id-1', load: false, name: 'name-1' }
    const action: SetSubscriptionAction = {
      type: SetSubscriptionActionType,
      payload: { ...payload }
    }
    expect(reducer(undefined, action)).toEqual([
      {
        ...payload
      }
    ])
  })

  it('#RemoveSubscription', () => {
    const action: RemoveSubscriptionAction = {
      type: RemoveSubscriptionActionType,
      payload: { id: 'id-1' }
    }
    expect(reducer([{ id: 'id-1', load: false, name: 'name-1' }], action)).toEqual([])
  })

})
