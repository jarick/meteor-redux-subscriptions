// @flow

import type { Dispatch } from 'redux'
import type {
  MeteorCallbacks,
  CreateMeteorSubscription,
  SubscriptionsStorage,
  SetSubscriptionAction,
  RemoveSubscriptionAction,
  MeteorSubscriptionActions
} from 'meteor-redux-subscriptions'
import { SetSubscriptionActionType, RemoveSubscriptionActionType  } from './reducer'

export default (
  create: CreateMeteorSubscription,
  subscriptions: SubscriptionsStorage = {}
): MeteorSubscriptionActions => {
  return {
    subscribeAction(name: string, ...args: any[]) {
      return (dispatch: Dispatch<SetSubscriptionAction>): Promise<string> => {
        return new Promise((resolve, reject) => {
          const data: MeteorCallbacks = {
            onStop(error) {
              dispatch({
                type: SetSubscriptionActionType,
                payload: { id: subscriptionId, load: true, name }
              })
              reject(error)
            },
            onReady() {
              dispatch({
                type: SetSubscriptionActionType,
                payload: { id: subscriptionId, load: true, name }
              })
              resolve(subscriptionId)
            },
          }
          const { subscriptionId, stop } = create(name, ...args, data)
          subscriptions[subscriptionId] = stop
          dispatch({
            type: SetSubscriptionActionType,
            payload: { id: subscriptionId, load: false, name }
          })
        })
      }
    },
    stopAction(id: string) {
      return (dispatch: Dispatch<RemoveSubscriptionAction>): Promise<string> => {
        if (!Object.prototype.hasOwnProperty.call(subscriptions, id)) {
          throw new Error(`Subscription (${id}) is not exists`)
        }
        dispatch({
          type: RemoveSubscriptionActionType,
          payload: { id }
        })
        subscriptions[id]()
        delete subscriptions[id]

        return Promise.resolve(id)
      }
    },
    stopAllAction() {
      return (dispatch): Promise<void> => {
        Object.keys(subscriptions).forEach((id: string) => {
          dispatch({
            type: RemoveSubscriptionActionType,
            payload: { id }
          })
          subscriptions[id]()
          delete subscriptions[id]
        })

        return Promise.resolve()
      }
    }
  }
}
