"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Phone } from "lucide-react"
import BrowseEvents from "@/components/BrowseEvents"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section with Background Image & Animations */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: "url('hero.jpg')", // Replace with your image in public folder
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl text-white animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-up">
            Discover & Create Amazing Events
          </h1>
          <p className="text-lg sm:text-xl mb-8 animate-fade-up animate-delay-200">
            Connect with your community, discover new experiences, and create unforgettable moments together.
          </p>
          <Link href="/create">
            <Button className="bg-primary text-white hover:bg-primary/90 animate-scale-up">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">About EventHub</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                EventHub is your all-in-one platform for discovering and joining 
                communities that match your interests. 
                Whether you're looking to participate in hackathons, 
                take part in quizzes, attend meetups, or 
                engage in exciting virtual and local events, we've got you covered.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to bring people together and make event management simple, accessible, and enjoyable for
                everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 text-center">
              <div className="text-5xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Events Created</p>
              <div className="text-5xl font-bold text-secondary mt-6 mb-2">50K+</div>
              <p className="text-muted-foreground">Active Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Boxes Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Get Started</h2>
          <div className="flex flex-col gap-8">
            {/* Create Event Box */}
            <Link href="/create">
              <Card className="p-10 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 w-full animate-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-3xl">
                      ✨
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Create Event</h3>
                      <p className="text-muted-foreground text-base">
                        Host your own event with easy tools. Set up details, manage attendees, and track RSVPs.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 sm:mt-0 sm:w-auto w-full">Get Started</Button>
                </div>
              </Card>
            </Link>

            {/* Browse Events Box */}
            <Link href="/browse">
              <Card className="p-10 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:border-secondary/40 w-full animate-fade-up animate-delay-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center text-3xl">
                      🔍
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Browse Events</h3>
                      <p className="text-muted-foreground text-base">
                        Explore thousands of events near you. Filter by category, date, and location.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 sm:mt-0 sm:w-auto w-full">Explore</Button>
                </div>
              </Card>
            </Link>

            {/* Join Community Box */}
            <Link href="/community">
              <Card className="p-10 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20 hover:border-accent/40 w-full animate-fade-up animate-delay-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-lg bg-accent/20 flex items-center justify-center text-3xl">
                      👥
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Join Community</h3>
                      <p className="text-muted-foreground text-base">
                        Connect with like-minded people and join communities that match your passions.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 sm:mt-0 sm:w-auto w-full">Join</Button>
                </div>
              </Card>
            </Link>

            {/* Register Box */}
            <Link href="/login">
              <Card className="p-10 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 hover:border-primary/40 w-full animate-fade-up animate-delay-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-3xl">
                      📝
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Register</h3>
                      <p className="text-muted-foreground text-base">
                        Create your account to start registering for events and managing your profile.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 sm:mt-0 sm:w-auto w-full">Sign Up</Button>
                </div>
              </Card>
            </Link>

            {/* Your Registrations Box */}
            <Link href="/my-registrations">
              <Card className="p-10 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-secondary/5 to-accent/10 border-secondary/20 hover:border-secondary/40 w-full animate-fade-up animate-delay-400">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center text-3xl">
                      📅
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Your Registrations</h3>
                      <p className="text-muted-foreground text-base">
                        View all your registered events, track attendance, and manage your event calendar.
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6 sm:mt-0 sm:w-auto w-full">View</Button>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-8">Contact Us</h2>

          <Card className="p-10 bg-card shadow-md border-primary/20 hover:shadow-xl transition-shadow duration-300 animate-fade-up">
            <div className="grid sm:grid-cols-2 gap-10 items-center">
              {/* Contact Info */}
              <div className="space-y-5">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have questions, feedback, or need support?  
                  Our team would love to hear from you. Reach out anytime — we’re always here to help make your event
                  experience better!
                </p>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>eventpt@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+91-1234567890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </div>

              {/* Illustration / CTA */}
              <div className="text-center sm:text-right space-y-4">
                <div className="text-6xl">💬</div>
                <p className="text-muted-foreground text-lg">Let’s start a conversation.</p>
                <Button className="mt-4">Send Message</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2025 EventHub. All rights reserved.</p>
        </div>
      </footer>

      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.6s ease-out forwards;
        }
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
        .animate-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  )
}
