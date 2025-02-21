export default function Documentation() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Documentation</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p>
            Welcome to the Music Distribution CMS. This system allows you to manage and distribute your music worldwide.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">User Types</h2>
          <ul className="list-disc list-inside">
            <li>Artist: Individual musicians or bands</li>
            <li>Label: Music labels managing multiple artists</li>
            <li>Admin: System administrators</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside">
            <li>Upload and manage music releases</li>
            <li>Track streams and revenue</li>
            <li>Distribute to multiple platforms</li>
            <li>Analytics and reporting</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

