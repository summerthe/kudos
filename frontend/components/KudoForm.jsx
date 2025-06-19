import React from 'react'
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
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useState } from 'react'

const kudoSchema = z.object({
  receiver: z.string().min(1, 'Select receiver'),
  message: z.string().min(1, 'Enter message'),
})

function KudoForm({ handleGiveKudo, users, kudosAvailable }) {
  const form = useForm({
    resolver: zodResolver(kudoSchema),
  })

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {kudosAvailable ? (
          <Button className="w-full">Give a Kudo</Button>
        ) : (
          <Button className="w-full" disabled>
            No more kudos available for this week
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async data => {await handleGiveKudo(data, form.setError, ()=> setOpen(false)); form.reset() }
            )}
            className="space-y-4">
            <FormField
              control={form.control}
              name="receiver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users &&
                        users.map(user => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
  )
}

export default KudoForm
