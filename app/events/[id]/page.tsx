"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<{title: string; location: string; description: string; date: string} | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data.event);
      };
      fetchEvent();
    }
  }, [id]);

  const handleApply = async () => {
    // For now, we'll use a hardcoded userId.
    // In a real application, you would get this from the authenticated user.
    const userId = "60d21b4667d0d8992e610c85"; // Replace with a real user ID
    const response = await fetch(`/api/events/${id}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      alert("Successfully applied to the event!");
    } else {
      const data = await response.json();
      alert(`Failed to apply: ${data.message}`);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{event.description}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleApply}>Apply Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
