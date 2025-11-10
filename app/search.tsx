"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    const response = await fetch(`/api/events/search?location=${location}`);
    const data = await response.json();
    setEvents(data.events);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/events/${id}`);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex w-full max-w-lg items-center space-x-4 p-4 bg-white rounded-lg shadow-md mx-auto">
        <Input
          type="text"
          placeholder="Enter your location to find nearby events"
          className="flex-grow"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button type="submit" variant="green" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event: {_id: string; title: string; location: string; description: string}) => (
          <Card key={event._id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{event.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleViewDetails(event._id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
