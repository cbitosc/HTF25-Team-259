"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

interface Attendee {
  name: string
  email: string
  checkedIn: boolean
  paymentStatus: "free" | "pending" | "paid"
}

interface Event {
  id: number
  title: string
  date: string
  description: string
  attendees: Attendee[]
  paid: boolean
}

export default function CreatedEventsPage() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const savedEvents = localStorage.getItem("createdEvents")
    if (savedEvents) setEvents(JSON.parse(savedEvents))
  }, [])

  const saveEvents = (updatedEvents: Event[]) => {
    setEvents(updatedEvents)
    localStorage.setItem("createdEvents", JSON.stringify(updatedEvents))
  }

  // --- Step 1: Mark attendee check-in ---
  const toggleCheckIn = (eventId: number, attendeeIndex: number) => {
    const updatedEvents = events.map(ev => {
      if (ev.id === eventId) {
        ev.attendees[attendeeIndex].checkedIn = !ev.attendees[attendeeIndex].checkedIn
      }
      return ev
    })
    saveEvents(updatedEvents)
    toast.success("Attendee check-in updated!")
    sendBrowserNotification("Check-in updated!", `Attendee updated in ${events.find(e => e.id === eventId)?.title}`)
  }

  // --- Step 2: Fake Notifications ---
  const sendBrowserNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body })
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") new Notification(title, { body })
      })
    }
  }

  // --- Step 3: Analytics ---
  const totalRegistrations = events.reduce((acc, e) => acc + e.attendees.length, 0)
  const checkedInCount = events.reduce((acc, e) => acc + e.attendees.filter(a => a.checkedIn).length, 0)
  const attendanceRate = totalRegistrations ? ((checkedInCount / totalRegistrations) * 100).toFixed(1) : "0"

  // --- Step 4: Export CSV ---
  const exportCSV = (event: Event) => {
    const header = ["Name", "Email", "Checked In", "Payment Status"]
    const rows = event.attendees.map(a => [
      a.name,
      a.email,
      a.checkedIn ? "Yes" : "No",
      a.paymentStatus
    ])
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map(e => e.join(",")).join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${event.title}-attendees.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("CSV exported!")
  }

  // --- Step 5: Fake Payment ---
  const handlePayment = (eventId: number, attendeeIndex: number) => {
    const updatedEvents = events.map(ev => {
      if (ev.id === eventId) {
        const attendee = ev.attendees[attendeeIndex]
        if (attendee.paymentStatus === "pending") {
          // fake payment popup
          if (confirm(`Simulate payment for ${attendee.name}?`)) {
            attendee.paymentStatus = "paid"
            toast.success(`${attendee.name} payment completed!`)
            sendBrowserNotification("Payment Completed", `${attendee.name} paid for ${ev.title}`)
          }
        }
      }
      return ev
    })
    saveEvents(updatedEvents)
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Created Events Dashboard</h1>

      {/* --- Analytics --- */}
      <Card className="mb-6 p-4 flex justify-between">
        <div>Total Registrations: {totalRegistrations}</div>
        <div>Checked-in: {checkedInCount}</div>
        <div>Attendance Rate: {attendanceRate}%</div>
      </Card>

      <div className="space-y-6">
        {events.map(event => (
          <Card key={event.id} className="p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <span className={`px-2 py-1 rounded text-sm font-medium ${event.paid ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {event.paid ? "Paid Event" : "Free Event"}
              </span>
            </div>
            <p>{event.description}</p>
            <p className="text-sm text-muted-foreground">Date: {event.date}</p>

            {/* --- Attendees --- */}
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Attendees:</h3>
              {event.attendees.length === 0 ? (
                <p className="text-sm text-muted-foreground">No attendees yet.</p>
              ) : (
                event.attendees.map((att, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span>{att.name} ({att.email})</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${att.checkedIn ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {att.checkedIn ? "Checked-in" : "Not Checked-in"}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${att.paymentStatus === "paid" ? "bg-green-100 text-green-800" : att.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                        {att.paymentStatus.toUpperCase()}
                      </span>
                      <Button size="sm" onClick={() => toggleCheckIn(event.id, i)}>
                        {att.checkedIn ? "Undo Check-in" : "Check-in"}
                      </Button>
                      {event.paid && att.paymentStatus === "pending" && (
                        <Button size="sm" onClick={() => handlePayment(event.id, i)}>Pay</Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => exportCSV(event)}>Export CSV</Button>
              <Link href={`/events/${event.id}`}>
                <Button size="sm">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
