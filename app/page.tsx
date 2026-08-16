import Link from 'next/link'
import { FaMotorcycle, FaQrcode, FaEye, FaPlus, FaShare, FaShieldAlt } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Digital Motorcycle Management
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Motorcycle
            <span className="text-blue-600"> E-Logbook</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Smart digital logbook system for managing your motorcycles. 
            Generate QR codes, track details, and share information instantly.
          </p>

          {/* CTA Buttons */}
          

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-sm text-gray-500 mt-1">Digital Records</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">QR</p>
              <p className="text-sm text-gray-500 mt-1">Instant Access</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">🔒</p>
              <p className="text-sm text-gray-500 mt-1">Secure Storage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to digitize your motorcycle records
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <FaPlus className="text-2xl text-blue-600" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Motorcycle</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter motorcycle details including plate number, brand, model, owner information, and vehicle type (PSV/Private) in the admin panel.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <FaQrcode className="text-2xl text-blue-600" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate QR Code</h3>
              <p className="text-gray-600 leading-relaxed">
                Each motorcycle gets a unique QR code that contains all its details. The QR code can be downloaded as a PDF or shared via WhatsApp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <FaEye className="text-2xl text-blue-600" />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Step 3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scan & View</h3>
              <p className="text-gray-600 leading-relaxed">
                Scan the QR code with any QR reader to instantly view all motorcycle details, including type (PSV/Private), owner information, and service history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your motorcycle fleet efficiently
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold text-gray-900 mb-1">Easy Entry</h4>
              <p className="text-sm text-gray-600">Simple form to add motorcycle details</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-1">QR Generation</h4>
              <p className="text-sm text-gray-600">Unique QR codes for each motorcycle</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="font-semibold text-gray-900 mb-1">PDF Export</h4>
              <p className="text-sm text-gray-600">Download details as PDF with QR code</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-1">WhatsApp Share</h4>
              <p className="text-sm text-gray-600">Share motorcycle details via WhatsApp</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
            <p className="flex items-center gap-2">
              <FaShieldAlt className="text-xs" />
              <span>Motorcycle E-Logbook</span>
            </p>
            <p className="mt-2 sm:mt-0">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}