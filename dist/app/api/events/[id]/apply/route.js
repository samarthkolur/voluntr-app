import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import User from "@/lib/models/user";
export async function POST(request, { params }) {
    const { id } = params;
    const { userId } = await request.json();
    if (!userId) {
        return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }
    await connect();
    const ngo = await User.findOne({ "events._id": id });
    if (!ngo) {
        return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    const event = ngo.events.id(id);
    if (event.applicants.includes(userId)) {
        return NextResponse.json({ message: "User has already applied to this event" }, { status: 400 });
    }
    event.applicants.push(userId);
    await ngo.save();
    return NextResponse.json({ message: "Successfully applied to the event" });
}
