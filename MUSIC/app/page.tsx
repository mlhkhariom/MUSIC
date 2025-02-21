import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MusicDistro
          </Link>
          <div>
            <Link href="/login">
              <Button variant="ghost" className="mr-2">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Distribute Your Music Worldwide</h1>
          <p className="text-xl text-gray-600 mb-8">Reach millions of listeners across all major streaming platforms</p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started
            </Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Global Reach", description: "Distribute to Spotify, Apple Music, Amazon, and more" },
            { title: "Artist-Friendly", description: "Keep 100% of your royalties with our free plan" },
            { title: "Easy to Use", description: "Upload and manage your releases with our intuitive dashboard" },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", description: "Create your free account" },
              { step: 2, title: "Upload", description: "Add your music or video" },
              { step: 3, title: "Choose Stores", description: "Select where to distribute" },
              { step: 4, title: "Get Paid", description: "Receive your royalties" },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Music with the World?</h2>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Distributing Now
            </Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">MusicDistro</h4>
              <p className="text-sm">Empowering independent artists worldwide</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-sm">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="text-sm">
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">{/* Add social media icons here */}</div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">© {new Date().getFullYear()} MusicDistro. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

