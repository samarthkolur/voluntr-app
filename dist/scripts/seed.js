import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connect } from "../lib/mongodb";
import User from "../lib/models/user";
async function seed() {
    await connect();
    const existingUser = await User.findOne({ email: "ngo@example.com" });
    if (existingUser) {
        console.log("Sample user already exists.");
        return;
    }
    const hashedPassword = await bcrypt.hash("password", 10);
    const user = await User.create({
        name: "Sample NGO",
        email: "ngo@example.com",
        password: hashedPassword,
        role: "ngo",
        events: [
            {
                title: "Community Cleanup",
                description: "Join us for a community cleanup event.",
                date: new Date("2025-12-01T10:00:00.000Z"),
                location: "Central Park",
                googleFormLink: "https://forms.gle/1234567890",
            },
        ],
    });
    console.log("Sample user created:", user);
}
seed().then(() => {
    mongoose.connection.close();
});
