import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/lib/models/user";

export async function GET(request: Request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    
    await connect();
    
    const ngo = await User.findById(decoded.id);
    
    if (!ngo || ngo.role !== "ngo") {
      return NextResponse.json({ message: "NGO not found" }, { status: 404 });
    }

    // Get events with applicant counts
    const eventsWithStats = ngo.events.map((event: {title: string; description: string; date: Date; location: string; googleFormLink: string; applicants: string[]; toObject: () => object}) => ({
      ...event.toObject(),
      applicantCount: event.applicants.length
    }));

    return NextResponse.json({ 
      ngo: {
        name: ngo.name,
        email: ngo.email
      },
      events: eventsWithStats
    });
  } catch {
    return NextResponse.json({ message: "Error fetching NGO data" }, { status: 500 });
  }
}