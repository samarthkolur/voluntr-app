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
    
    // Find all NGOs and get events where the user has applied
    const ngosWithEvents = await User.find({
      role: "ngo",
      "events.applicants": decoded.id
    }).select("name email events");

    const appliedEvents = ngosWithEvents.flatMap((ngo: {name: string; email: string; events: {applicants: string[], toObject: () => object}[]}) => 
      ngo.events
        .filter((event: {applicants: string[]}) => event.applicants.includes(decoded.id))
        .map((event: {toObject: () => object}) => ({
          ...event.toObject(),
          ngoName: ngo.name,
          ngoEmail: ngo.email
        }))
    );

    return NextResponse.json({ events: appliedEvents });
  } catch {
    return NextResponse.json({ message: "Error fetching applications" }, { status: 500 });
  }
}