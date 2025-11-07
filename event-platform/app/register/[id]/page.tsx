"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"

interface EventDetails {
  id: number
  title: string
  date: string
  location: string
  type: string
}

// Mock event data
const eventDatabase: Record<number, EventDetails> = {
  1: { id: 1, title: "Tech Networking Mixer", date: "Nov 15, 2025", location: "Banglore, India", type: "Physical" },
  2: { id: 2, title: "React Workshop", date: "Nov 18, 2025", location: "Virtual", type: "Virtual" },
  3: { id: 3, title: "Web Design Conference 2025", date: "Nov 20-22, 2025", location: "Ahmedabad, India", type: "Hybrid" },
  4: { id: 4, title: "Startup Pitch Night", date: "Nov 25, 2025", location: "Hyderabad, India", type: "Physical" },
  5: { id: 5, title: "JavaScript Fundamentals", date: "Nov 28, 2025", location: "Virtual", type: "Virtual" },
  6: { id: 6, title: "AI & Machine Learning Summit", date: "Dec 1-3, 2025", location: "Pune, India", type: "Hybrid" },
  7: { id: 7, title: "Community Meetup", date: "Dec 5, 2025", location: "Pune, India", type: "Physical" },
  8: { id: 8, title: "UX Design Bootcamp", date: "Dec 8-12, 2025", location: "Virtual", type: "Virtual" },
  9: { id: 9, title: "DevOps Best Practices", date: "Dec 15, 2025", location: "Banglore, India", type: "Physical" },
  10: { id: 10, title: "Blockchain & Web3 Forum", date: "Dec 18, 2025", location: "Virtual", type: "Virtual" },
  11: { id: 11, title: "Mobile App Development", date: "Dec 10, 2025", location: "Virtual", type: "Hybrid" },
  12: { id: 12, title: "Year-End Tech Gala", date: "Dec 28, 2025", location: "Banglore, India", type: "Physical" },
}

export default function RegistrationPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = Number(params.id)
  const event = eventDatabase[eventId] || eventDatabase[1]

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [qrData, setQrData] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    specialRequests: "",
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.agreeToTerms) {
      alert("Please fill in all required fields and agree to terms")
      return
    }
    setIsSubmitted(true)
    setTimeout(() => {
      router.push("/my-registrations")
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[60vh]">
          <Card className="p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              You've successfully registered for {event.title}. Check your email for confirmation details.
            </p>
            <p className="text-sm text-muted-foreground">Redirecting to your registrations...</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Registration</h1>
          <p className="text-muted-foreground">Register for: {event.title}</p>
        </div>

        <Card className="p-8">
          {/* Event Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-foreground mb-3">{event.title}</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">{event.date}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{event.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Type</p>
                <p className="font-medium text-foreground">{event.type}</p>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-foreground font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Adithya"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Mohan"
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Adithya@example.com"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91-123452434"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-foreground font-medium">
                Company/Organization
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company/organisation name"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="specialRequests" className="text-foreground font-medium">
                Special Requests or Questions
              </Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Let us know if you have any special requests..."
                className="mt-2 min-h-20"
              />
            </div>

            {/* Payment Method */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mt-6 flex flex-col md:flex-row gap-6">
  <div className="flex-1">
    <p className="text-sm text-foreground font-medium mb-3">Payment Method</p>
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() =>
          setQrData(`Stripe | ${formData.firstName} ${formData.lastName} | ${event.title}`)
        }
        className="flex-1 px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors text-sm font-medium"
      >
        Stripe
      </button>
      <button
        type="button"
        onClick={() =>
          setQrData(`PayPal | ${formData.firstName} ${formData.lastName} | ${event.title}`)
        }
        className="flex-1 px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors text-sm font-medium"
      >
        PayPal
      </button>
    </div>

    {qrData && (
      <div className="mt-6 text-center">
        <p className="text-muted-foreground mb-2">Scan to complete your registration:</p>
        <QRCodeCanvas value={qrData} size={200} bgColor="#f8f8f8" fgColor="#333" level="H" />
      </div>
    )}
  </div>

  {/* Fallback Manual Payment */}
  <div className="flex-1">
    <p className="text-sm text-foreground font-medium mb-3">Or enter your payment info manually</p>
    <Input
      placeholder="UPI ID (e.g. yourid@bank)"
      className="mb-3 mt-2"
    />
    <Input
      placeholder="Email / PayPal ID"
      className="mb-3 mt-2"
    />
    <Input
      placeholder="Transaction ID (Optional)"
      className="mt-2"
    />
  </div>
</div>


            {/* Terms Agreement */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 rounded border-input mt-1"
                required
              />
              <span className="text-sm text-muted-foreground">
                I agree to the terms and conditions and privacy policy *
              </span>
            </label>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Complete Registration
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
