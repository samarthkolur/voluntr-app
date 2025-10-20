"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div>
      <div className="flex border-black border-l-4 border-r-2 border-t-2 border-b-4 rounded-sm justify-between items-center m-10 p-3 bg-green-100">
        <div className="m-2">
          <h1 className="font-bold text-xl">Voluntr</h1>
          <p className="text-sm">Support. Impact. Inspire. </p>
        </div>
        <div className="flex gap-2 m-5">
          <Button
            className="cursor-pointer border-black border-l-3 border-b-3 border-t-1 border-r-1"
            variant="green"
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            className="border-black border-l-3 border-b-3 cursor-pointer"
            onClick={() => {
              router.push("/register");
            }}
            variant="outline"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
