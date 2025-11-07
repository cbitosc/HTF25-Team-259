"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar, Users } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  location: string
  type: string
  description: string
  attendees: number
  image: string
  category: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Networking Mixer",
    date: "Nov 15, 2025",
    location: "Banglore, India",
    type: "Physical",
    description: "Connect with tech professionals and entrepreneurs in a casual setting.",
    attendees: 45,
    image: "/tech-networking-event.jpg",
    category: "Networking",
  },
  {
    id: 2,
    title: "React Workshop",
    date: "Nov 18, 2025",
    location: "Virtual",
    type: "Virtual",
    description: "Learn advanced React patterns and best practices from industry experts.",
    attendees: 120,
    image: "/react-workshop.jpg",
    category: "Workshop",
  },
  {
    id: 3,
    title: "Web Design Conference 2025",
    date: "Nov 20-22, 2025",
    location: "Ahmedabad, India",
    type: "Hybrid",
    description: "The premier conference for web designers and UX professionals.",
    attendees: 500,
    image: "/web-design-conference.jpg",
    category: "Conference",
  },
  {
    id: 4,
    title: "Startup Pitch Night",
    date: "Nov 25, 2025",
    location: "Hyderabad, India",
    type: "Physical",
    description: "Watch innovative startups pitch their ideas to investors.",
    attendees: 200,
    image: "/startup-pitch-event.png",
    category: "Networking",
  },
  {
    id: 5,
    title: "JavaScript Fundamentals",
    date: "Nov 28, 2025",
    location: "Virtual",
    type: "Virtual",
    description: "Master the fundamentals of JavaScript programming.",
    attendees: 85,
    image: "/javascript-course.png",
    category: "Workshop",
  },
  {
    id: 6,
    title: "AI & Machine Learning Summit",
    date: "Dec 1-3, 2025",
    location: "Pune, India",
    type: "Hybrid",
    description: "Explore the latest trends in AI and machine learning.",
    attendees: 350,
    image: "/ai-machine-learning-summit.jpg",
    category: "Conference",
  },
  {
    id: 7,
    title: "Community Meetup",
    date: "Dec 5, 2025",
    location: "Pune, India",
    type: "Physical",
    description: "Casual meetup for local tech enthusiasts and developers.",
    attendees: 60,
    image: "/community-meetup.png",
    category: "Social",
  },
  {
    id: 8,
    title: "UX Design Bootcamp",
    date: "Dec 8-12, 2025",
    location: "Virtual",
    type: "Virtual",
    description: "Intensive bootcamp to master UX design principles and tools.",
    attendees: 95,
    image: "/ux-design-bootcamp.jpg",
    category: "Workshop",
  },
  {
    id: 9,
    title: "DevOps Best Practices",
    date: "Dec 15, 2025",
    location: "Bangalore, India",
    type: "Physical",
    description: "Learn DevOps strategies and tools from industry leaders.",
    attendees: 110,
    image: "/devops-conference.jpg",
    category: "Workshop",
  },
  {
    id: 10,
    title: "Blockchain & Web3 Forum",
    date: "Dec 18, 2025",
    location: "Virtual",
    type: "Virtual",
    description: "Discuss the future of blockchain and Web3 technologies.",
    attendees: 200,
    image: "/blockchain-web3.jpg",
    category: "Conference",
  },
  {
    id: 11,
    title: "Mobile App Development",
    date: "Dec 20, 2025",
    location: "Virtual",
    type: "Hybrid",
    description: "Build cross-platform mobile apps with modern frameworks.",
    attendees: 75,
    image: "/mobile-app-development.png",
    category: "Workshop",
  },
  {
    id: 12,
    title: "Year-End Tech Gala",
    date: "Dec 28, 2025",
    location: "Bangalore, India",
    type: "Physical",
    description: "Celebrate the year with the tech community at our annual gala.",
    attendees: 300,
    image: "/tech-gala-celebration.jpg",
    category: "Social",
  },
]

export default function BrowseEventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Browse Events</h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing events happening near you and around the world.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-card border-border"
            >
              {/* Event Image */}
              <div className="relative h-40 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {event.category}
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">{event.title}</h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                {/* Register Button */}
                <Link href={`/register/${event.id}`}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
