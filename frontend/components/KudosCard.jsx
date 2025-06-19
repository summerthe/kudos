import KudoForm from '@/components/KudoForm'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

export default function KudosCard({
  handleGiveKudo,
  kudos,
  kudosAvailable,
  users,
}) {
  return (
    <Card className="w-full max-w-md mx-auto mt-10 space-y-4">
      <CardContent className="space-y-2">
        <h2 className="font-semibold">Kudos Given to other users</h2>
        {kudos?.length > 0 ? (
          kudos.map(k => (
            <div key={k.id} className="text-sm border p-2 rounded">
              <p>{k.message}</p>
              <div className="flex justify-between	">
                <span className="text-xs ">
                  <b>{k.receiver_name}</b>
                </span>
                <span className="text-xs ">{formatDate(k.created_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs">No Kudos Given</p>
        )}
      </CardContent>

      <CardContent>
        <KudoForm
          handleGiveKudo={handleGiveKudo}
          users={users}
          kudosAvailable={kudosAvailable}
        />
      </CardContent>
    </Card>
  )
}
