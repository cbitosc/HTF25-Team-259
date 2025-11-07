"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Download, QrCode, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QRCode from "react-qr-code"

interface Registration {
  id: number
  eventId: number
  eventTitle: string
  date: string
  location: string
  type: string
  status: "upcoming" | "ongoing" | "completed"
  attendees: number
  registeredDate: string
  ticketNumber: string
}

const mockRegistrations: Registration[] = [
  {
    id: 1,
    eventId: 1,
    eventTitle: "Tech Networking Mixer",
    date: "Nov 15, 2025",
    location: "Bangalore, India",
    type: "Physical",
    status: "upcoming",
    attendees: 45,
    registeredDate: "Oct 20, 2025",
    ticketNumber: "TKT-001-2025",
  },
  {
    id: 5,
    eventId: 5,
    eventTitle: "JavaScript Fundamentals",
    date: "Nov 28, 2025",
    location: "Virtual",
    type: "Virtual",
    status: "upcoming",
    attendees: 120,
    registeredDate: "Oct 18, 2025",
    ticketNumber: "TKT-002-2025",
  },
  {
    id: 8,
    eventId: 8,
    eventTitle: "UX Design Bootcamp",
    date: "Dec 8-12, 2025",
    location: "Virtual",
    type: "Virtual",
    status: "upcoming",
    attendees: 500,
    registeredDate: "Oct 15, 2025",
    ticketNumber: "TKT-003-2025",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-primary/10 text-primary border-primary/20"
    case "ongoing":
      return "bg-secondary/10 text-secondary border-secondary/20"
    case "completed":
      return "bg-muted/10 text-muted-foreground border-muted/20"
    default:
      return "bg-muted/10 text-muted-foreground border-muted/20"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Upcoming"
    case "ongoing":
      return "Ongoing"
    case "completed":
      return "Completed"
    default:
      return status
  }
}

export default function MyRegistrationsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations)
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showQRModal, setShowQRModal] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    if (!loggedIn) {
      alert("Please login to view your events")
      router.push("/login")
    }
  }, [router])

  if (!isLoggedIn) return null // avoid flashing content

  // Cancel registration
  const cancelRegistration = (registrationId: number) => {
    const confirmed = window.confirm("Are you sure you want to cancel this registration?")
    if (!confirmed) return

    setRegistrations((prev) => prev.filter((r) => r.id !== registrationId))
  }

  // Open modals
  const openDetails = (registration: Registration) => {
    setSelectedRegistration(registration)
    setShowDetailsModal(true)
  }

  const openQR = (registration: Registration) => {
    setSelectedRegistration(registration)
    setShowQRModal(true)
  }

  const closeModals = () => {
    setShowDetailsModal(false)
    setShowQRModal(false)
    setSelectedRegistration(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">My Registrations</h1>
          <p className="text-muted-foreground text-lg">Track your registered events and manage your attendance.</p>
        </div>

        {registrations.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-6">You haven't registered for any events yet.</p>
            <Link href="/browse">
              <Button>Browse Events</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="text-3xl font-bold text-primary mb-2">{registrations.length}</div>
                <p className="text-muted-foreground">Total Registrations</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {registrations.filter((r) => r.status === "upcoming").length}
                </div>
                <p className="text-muted-foreground">Upcoming Events</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <div className="text-3xl font-bold text-accent mb-2">
                  {registrations.filter((r) => r.status === "completed").length}
                </div>
                <p className="text-muted-foreground">Completed Events</p>
              </Card>
            </div>

            {/* Registrations List */}
            <div className="space-y-4">
              {registrations.map((registration) => (
                <Card key={registration.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-grow">
                        <div className="flex items-start gap-3 mb-3">
                          <h3 className="text-xl font-bold text-foreground">{registration.eventTitle}</h3>
                          <Badge className={`${getStatusColor(registration.status)} border`}>
                            {getStatusLabel(registration.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Ticket: <span className="font-mono font-medium">{registration.ticketNumber}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 bg-transparent"
                          onClick={() => openQR(registration)}
                        >
                          <QrCode className="w-4 h-4" />
                          Ticket
                        </Button>
                        <Button size="sm" onClick={() => openDetails(registration)}>
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => cancelRegistration(registration.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="p-6 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                onClick={closeModals}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedRegistration.eventTitle}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Date: {selectedRegistration.date}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Location: {selectedRegistration.location}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Type: {selectedRegistration.type}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Status: {getStatusLabel(selectedRegistration.status)}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Ticket Number: {selectedRegistration.ticketNumber}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Registered on: {selectedRegistration.registeredDate}
              </p>
            </Card>
          </div>
        )}

        {/* QR Modal */}
        {showQRModal && selectedRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="p-6 max-w-xs w-full relative flex flex-col items-center gap-4">
              <button
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                onClick={closeModals}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">{selectedRegistration.eventTitle} Ticket</h2>
              <QRCode
                value={JSON.stringify({
                  eventTitle: selectedRegistration.eventTitle,
                  ticketNumber: selectedRegistration.ticketNumber,
                  date: selectedRegistration.date,
                  location: selectedRegistration.location,
                })}
                size={180}
              />
              <p className="text-sm text-muted-foreground">
                Ticket: {selectedRegistration.ticketNumber}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
