"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UserProfile {
  firstName: string
  lastName: string
  dob: string
  education: string
  interests: string
  location: string
  email: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    dob: "",
    education: "",
    interests: "",
    location: "",
    email: "",
  })

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    const email = localStorage.getItem("userName") || ""
    if (savedProfile) {
      setProfile({ ...JSON.parse(savedProfile), email: `${email}@example.com` })
    } else {
      setProfile((prev) => ({ ...prev, email: `${email}@example.com` }))
    }
  }, [])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  // Save profile
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile))
    alert("Profile saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <Card className="max-w-2xl mx-auto p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={profile.dob}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="education">Education</Label>
          <Input
            id="education"
            name="education"
            placeholder="e.g., B.Sc Computer Science"
            value={profile.education}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="interests">Interests / Hobbies</Label>
          <Input
            id="interests"
            name="interests"
            placeholder="e.g., Coding, Reading, Sports"
            value={profile.interests}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g., Bangalore, India"
            value={profile.location}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={profile.email} disabled />
        </div>

        <Button onClick={handleSave} className="w-full mt-4">
          Save Profile
        </Button>
      </Card>
    </div>
  )
}
