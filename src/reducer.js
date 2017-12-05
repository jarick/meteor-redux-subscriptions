// @flow

import type {
  SubscriptionsState,
  SetSubscriptionAction,
  RemoveSubscriptionAction
} from 'meteor-redux-subscriptions'

export const SetSubscriptionActionType = '@METEOR_REDUX_SUBSCRIPTIONS/SUBSCRIBE'
export const RemoveSubscriptionActionType = '@METEOR_REDUX_SUBSCRIPTIONS/REMOVE'
type Action = SetSubscriptionAction | RemoveSubscriptionAction

const reducers = {};

reducers[SetSubscriptionActionType] = (
  state: SubscriptionsState,
  action: SetSubscriptionAction
): DataSetState<*> => {
  return state.filter(({ id }) => id !== action.payload.id).concat({ ...action.payload })
}

reducers[RemoveSubscriptionActionType] = (
  state: SubscriptionsState,
  action: RemoveSubscriptionActionType
): DataSetState<*> => {
  return state.filter(({ id }) => id !== action.payload.id)
}

export default (state: DataSetState<*> = {}, action: Action): DataSetState<*> => {
  const reducer = reducers[action.type]

  return reducer ? reducer(state, (action: any)) : state
}
