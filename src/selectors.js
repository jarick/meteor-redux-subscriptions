// @flow

import type { GlobalSubscriptionsState } from 'meteor-redux-subscriptions'

export const getSubscriptionIdSelector = (name: string) => {
  return (state: GlobalSubscriptionsState): string | null => {
    const item = state.subscriptions.filter((_) => _.name === name)[0]

    return item ? item.id : null
  }
}
