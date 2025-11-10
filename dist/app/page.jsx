"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchBar from "./search";
import FeatureCard from "./feature-card";
import { HeartHandshake, Users, TrendingUp } from "lucide-react";
import AvatarMenu from "./avatar-menu";
export default function HomePage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);
    return (<div>
      <div className="flex border-black border-l-4 border-r-2 border-t-2 border-b-4 rounded-sm justify-between items-center m-10 p-3 bg-green-100">
        <div className="m-2">
          <h1 className="font-bold text-xl">Voluntr</h1>
          <p className="text-sm">Support. Impact. Inspire. </p>
        </div>
        <div className="flex gap-2 m-5">
          {isLoggedIn ? (<AvatarMenu />) : (<>
              <Button className="cursor-pointer border-black border-l-3 border-b-3 border-t-1 border-r-1" variant="green" onClick={() => {
                router.push("/login");
            }}>
                Login
              </Button>
              <Button className="border-black border-l-3 border-b-3 cursor-pointer" onClick={() => {
                router.push("/register");
            }} variant="outline">
                Register
              </Button>
            </>)}
        </div>
      </div>
      <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 py-12 text-center bg-gradient-to-b to-green-50 from-white border-black border-l-4 border-r-2 border-t-2 border-b-4 rounded-sm m-10">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Welcome to <span className="text-green-600">Voluntr</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Voluntr is your gateway to meaningful volunteer opportunities.
            Whether you're looking to give back to your community, develop new
            skills, or connect with like-minded individuals, Voluntr makes it
            easy to find and join volunteer activities that align with your
            passions.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center py-12 bg-gray-50 border-black border-l-4 border-r-2 border-t-2 border-b-4 rounded-sm m-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Find Your Next Opportunity
        </h2>
        <SearchBar />
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Voluntr?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<HeartHandshake />} title="Direct Impact" description="Connect directly with NGOs and see the immediate impact of your contributions."/>
            <FeatureCard icon={<Users />} title="Community Building" description="Join a community of like-minded individuals passionate about making a difference."/>
            <FeatureCard icon={<TrendingUp />} title="Skill Development" description="Gain valuable skills and experience while contributing to meaningful causes."/>
          </div>
        </div>
      </section>
    </div>);
}
