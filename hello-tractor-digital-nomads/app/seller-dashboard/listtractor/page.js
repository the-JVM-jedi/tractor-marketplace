'use client'

import { useState } from "react"
import Header from "../components/Header"
import TractorForm from "../TractorListingForm"
import ProgressSteps from "../ProgressSteps"

export default function ListTractorPage() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative text-center text-black">
          <h2 className="text-5xl font-bold">List Your Tractor</h2>
        </div>
      </div>
      
      {/* Progress and Form Section */}
      <div className="container mx-auto py-16">
      <ProgressSteps
        currentStep={currentStep}
        steps={["Basic Info", "Specifications", "Images", "Review"]}
      />
        <TractorForm onStepChange={setCurrentStep} />
      </div>
    </div>
  )
}
