"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    releaseDate: "",
    audioFile: null,
    coverArt: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload New Release</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="artist">Artist</Label>
          <Input id="artist" name="artist" value={formData.artist} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="genre">Genre</Label>
          <Input id="genre" name="genre" value={formData.genre} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="audioFile">Audio File</Label>
          <Input id="audioFile" name="audioFile" type="file" onChange={handleFileChange} accept="audio/*" required />
        </div>
        <div>
          <Label htmlFor="coverArt">Cover Art</Label>
          <Input id="coverArt" name="coverArt" type="file" onChange={handleFileChange} accept="image/*" required />
        </div>
        <Button type="submit">Upload Release</Button>
      </form>
    </div>
  )
}

