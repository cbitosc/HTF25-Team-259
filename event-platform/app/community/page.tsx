"use client"

import { Navigation } from "@/components/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Communities</h1>
          <p className="text-muted-foreground text-lg">
            Join communities based on your interests and connect with like-minded people.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Web Development", members: 2500, description: "For web developers of all levels" },
            { name: "UI/UX Design", members: 1800, description: "Design enthusiasts and professionals" },
            { name: "Startups", members: 3200, description: "Entrepreneurs and startup founders" },
            { name: "AI & Machine Learning", members: 2100, description: "AI/ML researchers and practitioners" },
            { name: "DevOps", members: 1400, description: "DevOps engineers and cloud architects" },
            { name: "Mobile Development", members: 1900, description: "iOS, Android, and cross-platform developers" },
          ].map((community) => (
            <Card key={community.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{community.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
              <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {community.members} members
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  Active
                </div>
              </div>
              <Button className="w-full">Join Community</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
