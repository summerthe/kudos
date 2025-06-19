import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProfileCard({ profile, handleLogout }) {
  return (
    <Card className="w-full max-w-md mx-auto mt-10 space-y-4">
      <CardHeader>
        <CardTitle>Welcome, {profile.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>Email: {profile.email}</div>
        <div>Organization: {profile.organization_name}</div>
        <div>Kudos Available: {profile.kudos_available}</div>
        <Button className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </CardContent>
    </Card>
  )
}
