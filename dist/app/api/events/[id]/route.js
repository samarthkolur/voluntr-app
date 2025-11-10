import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import User from "@/lib/models/user";
export async function GET(request, { params }) {
    const { id } = params;
    await connect();
    const ngo = await User.findOne({ "events._id": id });
    if (!ngo) {
        return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    const event = ngo.events.id(id);
    return NextResponse.json({ event });
}
