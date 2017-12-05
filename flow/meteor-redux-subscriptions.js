import type { Dispatch } from 'redux'

declare module 'meteor-redux-subscriptions' {
  declare export type CreateMeteorSubscription = (name: string, ...args: any[]) => MeteorSubscription
  declare export type MeteorSubscription = {
    stop: () => void,
    ready: () => boolean,
    subscriptionId: string
  };
  declare export type MeteorCallbacks = {
    onStop: (err: any) => void,
    onReady: () => void,
  };
  declare export type SubscriptionsStorage = {
    [id: string]: () => void
  }
  declare export type SetSubscriptionPayload = {
    id: string,
    load: boolean,
    name: string
  }
  declare export type SetSubscriptionAction = {
    type: string,
    payload: SetSubscriptionPayload
  }
  declare export type RemoveSubscriptionPayload = {
    id: string,
  }
  declare export type RemoveSubscriptionAction = {
    type: string,
    payload: RemoveSubscriptionPayload
  }
  declare export type SubscriptionsState = {
    id: string,
    load: boolean,
    name: string
  }[]
  declare export type GlobalSubscriptionsState = {
    subscriptions: SubscriptionsState
  }
  declare export type MeteorSubscriptionActions = {
    subscribeAction: (name: string, ...args: any[]) => (dispatch: Dispatch<SetSubscriptionAction>) => Promise<string>,
    stopAction: (id: string) => (dispatch: Dispatch<RemoveSubscriptionAction>) => Promise<string>,
    stopAllAction: () => (dispatch: Dispatch<RemoveSubscriptionAction>) => Promise<void>
  }
}
