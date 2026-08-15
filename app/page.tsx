import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Motorcycle E-Logbook
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Smart digital logbook for your motorcycles
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Admin Dashboard
            </Link>
            <div className="px-8 py-3 bg-green-600 text-white rounded-lg">
              Scan QR to View Details
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-2">📝</div>
                <h3 className="font-semibold">Add Motorcycle</h3>
                <p className="text-sm text-gray-600">Enter motorcycle details in admin panel</p>
              </div>
              <div>
                <div className="text-4xl mb-2">📱</div>
                <h3 className="font-semibold">Generate QR</h3>
                <p className="text-sm text-gray-600">Unique QR code for each motorcycle</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🔍</div>
                <h3 className="font-semibold">Scan & View</h3>
                <p className="text-sm text-gray-600">Scan QR to see all details instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}