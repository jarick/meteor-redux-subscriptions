// @flow

import type { Store } from 'redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import type {
  MeteorCallbacks,
  SetSubscriptionAction,
  RemoveSubscriptionAction
} from 'meteor-redux-subscriptions'
import {
  createSubscriptionActionsCreator,
  SetSubscriptionActionType,
  RemoveSubscriptionActionType
} from '../'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {

  it('#subscribeAction success', () => {
    const id = 'test-id'
    const name = 'test'
    const MockSubscribe = (name: string, data: MeteorCallbacks) => {
      expect(name).toBe('test')
      const { onReady } = data
      setTimeout(() => {
        onReady()
      }, 1000)
      return {
        stop() {},
        ready() { return true },
        subscriptionId: id
      }
    }
    const { subscribeAction } = createSubscriptionActionsCreator(MockSubscribe)
    const store: Store<{}> = mockStore({})
    const expectedActions: SetSubscriptionAction[] = [
      {
        type: SetSubscriptionActionType,
        payload: { id, load: false, name },
      },
      {
        type: SetSubscriptionActionType,
        payload: { id, load: true, name }
      },
    ]
    subscribeAction(name)(store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('#subscribeAction fail', () => {
    const id = 'test-id'
    const name = 'test'
    const MockSubscribe = (name: string, data: MeteorCallbacks) => {
      const { onStop } = data
      setTimeout(() => onStop('subscription is stopped'), 1000)
      return {
        stop() {},
        ready() { return true },
        subscriptionId: id
      }
    }
    const { subscribeAction } = createSubscriptionActionsCreator(MockSubscribe)
    const store: Store<{}> = mockStore({})
    const expectedActions: SetSubscriptionAction[] = [
      {
        type: SetSubscriptionActionType,
        payload: { id, load: false, name }
      },
      {
        type: SetSubscriptionActionType,
        payload: { id, load: true, name }
      },
    ]
    subscribeAction(name)(store.dispatch).then(() => {
      throw new Error('Promise must be rejected')
    },() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('#stopAction', (done) => {
    const id = 'test-id'
    const MockSubscribe = (name: string, data: MeteorCallbacks) => {
      expect(name).toBe('test')
      const { onReady } = data
      setTimeout(() => onReady(), 1000)
      return {
        stop() {},
        ready() { return true },
        subscriptionId: id
      }
    }
    const subscriptions = {
      [id]: () => done()
    }
    const { stopAction } = createSubscriptionActionsCreator(MockSubscribe, subscriptions)
    const store: Store<{}> = mockStore({})
    const expectedActions: RemoveSubscriptionAction[] = [
      {
        type: RemoveSubscriptionActionType,
        payload: { id }
      },
    ]
    stopAction(id)(store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(subscriptions).toEqual({})
    })
  })

  it('#stopAllAction', (done) => {
    const id = 'test-id'
    const MockSubscribe = (name: string, data: MeteorCallbacks) => {
      expect(name).toBe('test')
      const { onReady } = data
      setTimeout(() => onReady(), 1000)
      return {
        stop() {},
        ready() { return true },
        subscriptionId: id
      }
    }
    const subscriptions = {
      [id]: () => done()
    }
    const { stopAllAction } = createSubscriptionActionsCreator(MockSubscribe, subscriptions)
    const store: Store<{}> = mockStore({})
    const expectedActions: RemoveSubscriptionAction[] = [
      {
        type: RemoveSubscriptionActionType,
        payload: { id }
      },
    ]
    stopAllAction()(store.dispatch).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(subscriptions).toEqual({})
    })
  })
})
