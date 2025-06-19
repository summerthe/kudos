import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export default function GivenKudosCard({ kudos }) {
  return (
    <Card className="w-full max-w-md mx-auto mt-10 space-y-4">
      <CardContent className="space-y-2">
        <h2 className="font-semibold">Kudos Given to other users</h2>
        {kudos.map((k, i) => (
          <div key={i} className="text-sm border p-2 rounded">
            <p>{k.message}</p>
            <div className="flex justify-between	">
              <span className="text-xs ">
                <b>{k.receiver_name}</b>
              </span>
              <span className="text-xs ">{formatDate(k.created_at)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
