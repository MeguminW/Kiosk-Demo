import { Clock, Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, getWaitColor, getWaitLabel } from '@/lib/utils'

interface WaitTimeIndicatorProps {
  waitMinutes: number
  queueLength: number
  variant?: 'compact' | 'detailed'
}

export function WaitTimeIndicator({
  waitMinutes,
  queueLength,
  variant = 'detailed',
}: WaitTimeIndicatorProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-6 text-xl">
        <div className="flex items-center gap-3">
          <Clock className="w-8 h-8" />
          <span className={cn('font-semibold tabular-nums', getWaitColor(waitMinutes))}>
            ~{waitMinutes} min
          </span>
        </div>
        <div className="flex items-center gap-3 text-neutral-500">
          <Users className="w-8 h-8" />
          <span>{queueLength} ahead</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="p-8 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl text-neutral-500">Current Wait Time</p>
        <Badge variant="outline" className={cn('text-base px-3 py-1', getWaitColor(waitMinutes))}>
          {getWaitLabel(waitMinutes)}
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-10 h-10 text-neutral-400" />
        <p className={cn('text-6xl font-bold tabular-nums', getWaitColor(waitMinutes))}>
          ~{waitMinutes} min
        </p>
      </div>

      <div className="flex items-center gap-3 text-neutral-500">
        <Users className="w-8 h-8" />
        <p className="text-2xl">
          {queueLength} patient{queueLength !== 1 ? 's' : ''} ahead
        </p>
      </div>
    </Card>
  )
}
