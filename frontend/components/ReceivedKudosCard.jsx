import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default function ReceivedKudosCard({ kudos }) {
  return (
    <Card className="w-full max-w-md mx-auto mt-10 space-y-4">
      <CardContent className="space-y-2">
        <h2 className="font-semibold">Kudos Received</h2>
        {kudos?.length > 0 ? (
          kudos.map(k => (
            <div key={k.id} className="text-sm border p-2 rounded">
              <p>{k.message}</p>
              <div className="flex justify-between	">
                <span className="text-xs ">
                  <b>{k.sender_name}</b>
                </span>
                <span className="text-xs ">{formatDate(k.created_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs">No Kudos Received</p>
        )}
      </CardContent>
    </Card>
  )
}
