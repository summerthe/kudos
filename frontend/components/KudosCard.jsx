import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const kudoSchema = z.object({
  receiver: z.string().min(1, 'Select receiver'),
  message: z.string().min(1, 'Enter message'),
})

export default function KudosCard({ kudos, kudosAvailable }) {
  const form = useForm({
    resolver: zodResolver(kudoSchema),
  })

  const giveKudo = async data => {
    // handle submit
    console.log(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10 space-y-4">
      <CardContent className="space-y-2">
        <h2 className="font-semibold">Kudos Received</h2>
        {kudos.map((k, i) => (
          <div key={i} className="text-sm border p-2 rounded">
            <p>{k.message}</p>
            <div className="flex justify-between	">
              <span className="text-xs ">
                <b>{k.sender_name}</b>
              </span>
              <span className="text-xs ">{formatDate(k.created_at)}</span>
            </div>
          </div>
        ))}
      </CardContent>

      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            {kudosAvailable ? (
              <Button className="w-full">Give a Kudo</Button>
            ) : (
              <Button className="w-full" disabled>
                No kudos available for this week
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(giveKudo)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="receiver"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select user" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Replace with actual users */}
                            <SelectItem value="user1">User 1</SelectItem>
                            <SelectItem value="user2">User 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input placeholder="Say something nice..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Kudo
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
