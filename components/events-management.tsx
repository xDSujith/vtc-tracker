"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Plus,
  Users,
  MapPin,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { format } from "date-fns"

export function EventsManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [activeView, setActiveView] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")

  const mockEvents = []

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "convoy":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "training":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "special":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesView = activeView === "all" || event.status === activeView
    return matchesSearch && matchesView
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Events Management</h2>
          <p className="text-muted-foreground">Organize convoys, training sessions, and special events</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover-lift gradient-border">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Set up a new convoy, training session, or special event for your VTC members.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Weekly Convoy - Berlin to Prague" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="convoy">Convoy</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="special">Special Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your event..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 glass">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input id="maxParticipants" type="number" placeholder="20" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route">Route</Label>
                  <Input id="route" placeholder="Berlin → Prague" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance</Label>
                  <Input id="distance" placeholder="347 km" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="gradient-border">Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="glass hover-lift">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={activeView} onValueChange={setActiveView}>
              <TabsList className="glass">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Events</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="hover-lift bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="glass hover-lift animate-scale-in">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(event.status)}
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hover-lift">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {event.date} at {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.route}</span>
                  {event.distance && (
                    <Badge variant="secondary" className="text-xs">
                      {event.distance}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {event.participants}/{event.maxParticipants} participants
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{event.organizer.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{event.organizer.name}</span>
                </div>
                <Button size="sm" variant="outline" className="hover-lift bg-transparent">
                  {event.status === "upcoming" ? "Join Event" : "View Details"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Create your first event to get started"}
            </p>
            <Button className="gradient-border">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
