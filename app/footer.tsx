"use client";



export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 Voluntr. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Facebook
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
