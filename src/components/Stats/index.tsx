import React from 'react'
import { isEmpty } from 'ramda'

import { usePusher } from '@/utils/pusher'
import { StatsFields } from '@/api/models/Stats'

import { UIStore } from '@/store'
import { useStats } from '@/utils/fetch'

const Stats = () => {
  const liveStatsEnabled = UIStore.useState((s) => s.liveStatsEnabled)

  const { stats } = useStats()
  const realtimeData = usePusher('stats', 'stats-update', liveStatsEnabled) as StatsFields

  const data = isEmpty(realtimeData) ? stats : realtimeData

  if (!data) {
    return null
  }

  return (
    <span>
      <strong>Secrets</strong> created:&nbsp;
      {new Intl.NumberFormat('en-US').format(data?.totalSecretsCount || 0)} | viewed:&nbsp;
      {new Intl.NumberFormat('en-US').format(data?.totalSecretsViewCount || 0)} |
      compromised:&nbsp;0
    </span>
  )
}

export default Stats
