"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ChevronLeft } from "lucide-react"
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

export default function CreateEventPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    eventName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    eventType: "physical",
    category: "networking",
    location: "",
    // Step 2
    description: "",
    zoomLink: "",
    mediaUrl: "",
    paymentMethod: "free",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => {
      let newData = { ...prev, [name]: type === "checkbox" ? checked : value }

      // Auto-generate Zoom link if event type is virtual or hybrid
      if (name === "eventType" && (value === "virtual" || value === "hybrid") && !prev.zoomLink) {
        const randomDigits = Math.floor(100000000 + Math.random() * 900000000)
        newData.zoomLink = `https://zoom.us/j/${randomDigits}`
      }

      // Clear Zoom link if switched to physical
      if (name === "eventType" && value === "physical") {
        newData.zoomLink = ""
      }

      return newData
    })
  }

  const handleNext = () => {
    if (!formData.eventName || !formData.startDate || !formData.endDate || !formData.startTime || !formData.endTime) {
      alert("Please fill in all required fields")
      return
    }

    // If physical or hybrid, require location
    if ((formData.eventType === "physical" || formData.eventType === "hybrid") && !formData.location) {
      alert("Please enter the location for physical or hybrid events")
      return
    }

    setStep(2)
  }

  const handleBack = () => setStep(1)

  const handleSubmit = () => {
    if (!formData.description) {
      alert("Please fill in all required fields")
      return
    }

    // Build the new event object
    const newEvent: Event = {
      id: Date.now(), // unique ID
      title: formData.eventName,
      date: `${formData.startDate} ${formData.startTime}`, // you can customize
      description: formData.description,
      attendees: [], // start empty
      paid: formData.paymentMethod !== "free",
    }

    // Save to localStorage
    const existingEvents: Event[] = JSON.parse(localStorage.getItem("createdEvents") || "[]")
    existingEvents.push(newEvent)
    localStorage.setItem("createdEvents", JSON.stringify(existingEvents))

    toast.success("Event created successfully!")

    router.push("/created-events") // redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className={`h-2 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="mx-2 text-sm font-medium text-foreground">Step {step} of 2</div>
            <div className="flex-1">
              <div className={`h-2 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Event Details</span>
            <span>Additional Info</span>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Event Details</h2>

              <div>
                <Label htmlFor="eventName" className="text-foreground font-medium">
                  Event Name *
                </Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-foreground font-medium">
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-foreground font-medium">
                    End Date *
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="text-foreground font-medium">
                    Start Time *
                  </Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-foreground font-medium">
                    End Time *
                  </Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType" className="text-foreground font-medium">
                    Event Type
                  </Label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="physical">Physical</option>
                    <option value="virtual">Virtual</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category" className="text-foreground font-medium">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="networking">Networking</option>
                    <option value="workshop">Workshop</option>
                    <option value="conference">Conference</option>
                    <option value="social">Competition</option>
                    <option value="sports">Socials</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {(formData.eventType === "physical" || formData.eventType === "hybrid") && (
                <div>
                  <Label htmlFor="location" className="text-foreground font-medium">
                    Location / Address *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter event location"
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button onClick={handleNext} className="ml-auto flex items-center gap-2">
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Additional Information</h2>

              <div>
                <Label htmlFor="description" className="text-foreground font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your event"
                  className="mt-2 min-h-24"
                />
              </div>

              {(formData.eventType === "virtual" || formData.eventType === "hybrid") && (
                <div>
                  <Label htmlFor="zoomLink" className="text-foreground font-medium">
                    Zoom Link
                  </Label>
                  <Input
                    id="zoomLink"
                    name="zoomLink"
                    value={formData.zoomLink}
                    onChange={handleInputChange}
                    placeholder="https://zoom.us/j/..."
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="mediaUrl" className="text-foreground font-medium">
                  Event Image URL
                </Label>
                <Input
                  id="mediaUrl"
                  name="mediaUrl"
                  value={formData.mediaUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="mt-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentMethod" className="text-foreground font-medium">
                    Payment Method
                  </Label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="free">Free</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleBack} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleSubmit} className="ml-auto">
                  Create Event
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
