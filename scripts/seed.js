const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function connect() {
    try{
        mongoose.connect("mongodb+srv://admin:adminpassword@voluntr.baordkh.mongodb.net/?appName=voluntr");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error' + err);
            process.exit();
       })
    } catch (error) {
        console.log(error);
    }
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["volunteer", "ngo"],
    required: true,
  },
  events: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    googleFormLink: { type: String, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  }],
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function seed() {
  await connect();

  // Clear existing data
  await User.deleteMany({});
  console.log("Cleared existing users");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create NGOs with events
  const ngos = [
    {
      name: "Helping Hands Foundation",
      email: "ngo@helpinghands.org",
      password: hashedPassword,
      role: "ngo",
      events: [
        {
          title: "Beach Cleanup Drive",
          description: "Join us for a 3-hour beach cleanup to protect marine life and keep our shores beautiful. All equipment provided.",
          date: new Date("2025-12-15T08:00:00.000Z"),
          location: "Marina Beach, Chennai",
          googleFormLink: "https://forms.gle/beach-cleanup-2025",
          applicants: []
        },
        {
          title: "Tree Plantation Campaign",
          description: "Help us plant 1000 trees across the city to combat climate change and improve air quality.",
          date: new Date("2025-12-20T07:00:00.000Z"),
          location: "Central Park, Bangalore",
          googleFormLink: "https://forms.gle/tree-plantation-2025",
          applicants: []
        }
      ]
    },
    {
      name: "Education for All",
      email: "contact@educationforall.org",
      password: hashedPassword,
      role: "ngo",
      events: [
        {
          title: "Teaching Underprivileged Children",
          description: "Volunteer to teach basic math and science to children from low-income families. No teaching experience required.",
          date: new Date("2025-12-10T15:00:00.000Z"),
          location: "Community Center, Mumbai",
          googleFormLink: "https://forms.gle/teaching-volunteer-2025",
          applicants: []
        },
        {
          title: "Book Distribution Drive",
          description: "Help us distribute educational books and stationery to rural schools. Transportation will be provided.",
          date: new Date("2025-12-25T09:00:00.000Z"),
          location: "Rural Schools, Pune",
          googleFormLink: "https://forms.gle/book-distribution-2025",
          applicants: []
        }
      ]
    },
    {
      name: "Animal Welfare Society",
      email: "info@animalwelfare.org",
      password: hashedPassword,
      role: "ngo",
      events: [
        {
          title: "Animal Shelter Care",
          description: "Spend time with rescued animals, help with feeding, cleaning, and providing care at our shelter.",
          date: new Date("2025-12-18T10:00:00.000Z"),
          location: "Animal Shelter, Delhi",
          googleFormLink: "https://forms.gle/animal-shelter-2025",
          applicants: []
        },
        {
          title: "Street Animal Feeding Program",
          description: "Join our weekend program to feed and provide medical care to street animals in your neighborhood.",
          date: new Date("2025-12-22T17:00:00.000Z"),
          location: "Various Locations, Hyderabad",
          googleFormLink: "https://forms.gle/street-animals-2025",
          applicants: []
        }
      ]
    }
  ];

  // Create volunteers
  const volunteers = [
    {
      name: "Rahul Sharma",
      email: "rahul.volunteer@email.com",
      password: hashedPassword,
      role: "volunteer",
      events: []
    },
    {
      name: "Priya Patel",
      email: "priya.volunteer@email.com",
      password: hashedPassword,
      role: "volunteer",
      events: []
    },
    {
      name: "Amit Kumar",
      email: "amit.volunteer@email.com",
      password: hashedPassword,
      role: "volunteer",
      events: []
    }
  ];

  // Insert NGOs
  const createdNGOs = await User.insertMany(ngos);
  console.log(`Created ${createdNGOs.length} NGOs`);

  // Insert volunteers
  const createdVolunteers = await User.insertMany(volunteers);
  console.log(`Created ${createdVolunteers.length} volunteers`);

  // Simulate some volunteers applying to events
  const ngo1 = createdNGOs[0]; // Helping Hands Foundation
  const ngo2 = createdNGOs[1]; // Education for All
  
  // Add volunteers as applicants to some events
  if (ngo1 && ngo1.events && ngo1.events.length > 0) {
    ngo1.events[0].applicants.push(createdVolunteers[0]._id, createdVolunteers[1]._id);
    ngo1.events[1].applicants.push(createdVolunteers[2]._id);
    await ngo1.save();
  }

  if (ngo2 && ngo2.events && ngo2.events.length > 0) {
    ngo2.events[0].applicants.push(createdVolunteers[0]._id);
    await ngo2.save();
  }

  console.log("Sample data created successfully!");
  console.log("\n=== NGO Login Credentials ===");
  console.log("Email: ngo@helpinghands.org | Password: password123");
  console.log("Email: contact@educationforall.org | Password: password123");
  console.log("Email: info@animalwelfare.org | Password: password123");
  
  console.log("\n=== Volunteer Login Credentials ===");
  console.log("Email: rahul.volunteer@email.com | Password: password123");
  console.log("Email: priya.volunteer@email.com | Password: password123");
  console.log("Email: amit.volunteer@email.com | Password: password123");
}

seed().then(() => {
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error seeding database:", error);
  mongoose.connection.close();
});