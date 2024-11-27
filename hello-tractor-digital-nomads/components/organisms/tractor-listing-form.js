'use client'

import { useState } from "react"
import { Upload } from 'lucide-react'

export default function TractorForm({ onStepChange }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    tractorName: '',
    regularPrice: '',
    salePrice: '',
    horsePower: '',
    driverType: '',
    description: '',
    features: '',
    images: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
      onStepChange(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      onStepChange(currentStep - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-8 bg-white shadow-lg rounded-lg p-8">
      {currentStep === 1 && (
        <>
          <div className="space-y-4">
            <label htmlFor="tractorName" className="text-lg font-semibold">Tractor Name</label>
            <input
              id="tractorName"
              name="tractorName"
              placeholder="Enter tractor name"
              value={formData.tractorName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="regularPrice" className="text-lg font-semibold">Regular Price</label>
            <input
              id="regularPrice"
              name="regularPrice"
              placeholder="Enter regular price"
              type="number"
              value={formData.regularPrice}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="salePrice" className="text-lg font-semibold">Sale Price</label>
            <input
              id="salePrice"
              name="salePrice"
              placeholder="Enter sale price"
              type="number"
              value={formData.salePrice}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <div className="space-y-4">
            <label htmlFor="horsePower" className="text-lg font-semibold">Horse Power</label>
            <input
              id="horsePower"
              name="horsePower"
              placeholder="Enter horse power"
              value={formData.horsePower}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="driverType" className="text-lg font-semibold">Driver Type</label>
            <input
              id="driverType"
              name="driverType"
              placeholder="Enter driver type"
              value={formData.driverType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-4">
            <label htmlFor="description" className="text-lg font-semibold">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter tractor description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={4}
            />
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <div className="space-y-4">
            <label htmlFor="features" className="text-lg font-semibold">Features</label>
            <textarea
              id="features"
              name="features"
              placeholder="Enter tractor features"
              value={formData.features}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={4}
            />
          </div>
          <div className="space-y-4">
            <label className="text-lg font-semibold">Images</label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" multiple />
              </label>
            </div>
          </div>
        </>
      )}

      {currentStep === 4 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Review Your Listing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Tractor Name:</p>
              <p className="text-gray-600">{formData.tractorName}</p>
            </div>
            <div>
              <p className="font-semibold">Regular Price:</p>
              <p className="text-gray-600">{formData.regularPrice}</p>
            </div>
            <div>
              <p className="font-semibold">Sale Price:</p>
              <p className="text-gray-600">{formData.salePrice}</p>
            </div>
            <div>
              <p className="font-semibold">Horse Power:</p>
              <p className="text-gray-600">{formData.horsePower}</p>
            </div>
            <div>
              <p className="font-semibold">Driver Type:</p>
              <p className="text-gray-600">{formData.driverType}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Description:</p>
            <p className="text-gray-600">{formData.description}</p>
          </div>
          <div>
            <p className="font-semibold">Features:</p>
            <p className="text-gray-600">{formData.features}</p>
          </div>
          {/* Display uploaded images here */}
        </div>
      )}

      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button 
            type="button" 
            onClick={handlePrevious} 
            variant="outline"
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button 
            type="button" 
            onClick={handleNext} 
            className="ml-auto px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Next
          </button>
        ) : (
          <button 
            type="submit" 
            className="ml-auto px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Submit Listing
          </button>
        )}
      </div>
    </form>
  )
}
