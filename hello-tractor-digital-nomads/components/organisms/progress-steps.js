import React from 'react';

function ProgressSteps({ currentStep, steps }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center relative">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold
                ${index + 1 <= currentStep
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-300 bg-white text-gray-500"
                }`}
            >
              {index + 1}
            </div>
            <span className="mt-2 text-sm font-medium">{step}</span>
          </div>
        ))}
        {/* Progress line */}
        <div className="absolute top-5 left-0 h-[2px] bg-gray-200 w-full -z-0">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgressSteps;
