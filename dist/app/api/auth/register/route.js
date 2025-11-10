import { NextResponse } from "next/server";
import { connect } from "@/lib/mongodb";
import User from "@/lib/models/user";
import bcrypt from "bcryptjs";
export async function POST(request) {
    const { name, email, password, role } = await request.json();
    if (!name || !email || !password || !role) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    await connect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    return NextResponse.json({ user }, { status: 201 });
}
