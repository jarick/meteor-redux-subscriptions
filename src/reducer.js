// @flow

import type {
  SubscriptionsState,
  SetSubscriptionAction,
  RemoveSubscriptionAction
} from 'meteor-redux-subscriptions'

export const SetSubscriptionActionType = '@METEOR_REDUX_SUBSCRIPTIONS/SUBSCRIBE'
export const RemoveSubscriptionActionType = '@METEOR_REDUX_SUBSCRIPTIONS/REMOVE'
type Action = SetSubscriptionAction | RemoveSubscriptionAction

export default (state: SubscriptionsState = [], action: Action) => {
  switch (action.type) {
    case SetSubscriptionActionType:
      return [ ...state, { ...action.payload } ]
    case RemoveSubscriptionActionType:
      return state.filter(({ id }) => id !== action.payload.id)
    default:
      return state
  }
}
