import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import User from "@/lib/models/user";
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    if (!location) {
        return NextResponse.json({ message: "Location parameter is required" }, { status: 400 });
    }
    await connect();
    const ngosWithEvents = await User.find({
        role: "ngo",
        "events.location": new RegExp(location, "i"),
    });
    const events = ngosWithEvents.flatMap((ngo) => ngo.events.filter((event) => event.location.toLowerCase().includes(location.toLowerCase())));
    return NextResponse.json({ events });
}
