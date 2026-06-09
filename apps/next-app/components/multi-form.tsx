"use client";

import { useState } from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";

export default function MultiForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    fullName: "",
    email: "",
    age: "",
    // Step 2: Experience
    experience: "",
    satisfaction: "",
    // Step 3: Feedback
    feedback: "",
    improvements: "",
    // Step 4: Contact Preference
    contactMethod: "",
    newsletter: false,
  });

  const totalSteps = 4;
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("[v0] Form submitted:", formData);
    alert(
      "Thank you for completing the survey! Your responses have been submitted."
    );
    setCurrentStep(5); // Show completion screen
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.age !== ""
        );
      case 2:
        return formData.experience !== "" && formData.satisfaction !== "";
      case 3:
        return (
          formData.feedback.trim() !== "" && formData.improvements.trim() !== ""
        );
      case 4:
        return formData.contactMethod !== "";
      default:
        return true;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Customer Survey
          </h1>
          <p className="text-slate-400">
            Help us improve by sharing your feedback
          </p>
        </div>

        {currentStep === 5 ? (
          // Completion Screen
          <div className="rounded-2xl bg-white p-8 text-center shadow-2xl md:p-12">
            <div className="mb-6 flex justify-center">
              <CheckCircle2 className="h-20 w-20 text-green-500" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-slate-900">
              Thank You!
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Your survey responses have been successfully submitted. We
              appreciate your valuable feedback!
            </p>
            <button
              onClick={() => {
                setCurrentStep(1);
                setFormData({
                  fullName: "",
                  email: "",
                  age: "",
                  experience: "",
                  satisfaction: "",
                  feedback: "",
                  improvements: "",
                  contactMethod: "",
                  newsletter: false,
                });
              }}
              className="rounded-lg bg-slate-900 px-8 py-3 font-semibold text-white transition duration-200 hover:bg-slate-800"
            >
              Take Survey Again
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Progress Bar */}
            <div className="h-2 bg-linear-to-r from-blue-600 to-blue-700">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{
                  width: `${((totalSteps - currentStep) / totalSteps) * 100}%`,
                }}
              ></div>
            </div>

            {/* Step Indicator */}
            <div className="px-8 pt-8 pb-6 md:px-12">
              <div className="mb-8 flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-1 items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 ${
                        step <= currentStep
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`mx-2 h-1 flex-1 transition-all duration-300 ${
                          step < currentStep ? "bg-blue-600" : "bg-slate-200"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-600">
                Step {currentStep} of {totalSteps}
              </p>
            </div>

            {/* Form Content */}
            <div className="px-8 py-8 md:px-12">
              {currentStep === 1 && (
                <div className="animate-fadeIn space-y-6">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      Basic Information
                    </h2>
                    <p className="text-slate-600">
                      Let&apos;s start with some basic details
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 text-black transition focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 transition focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Age Range
                    </label>
                    <select
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 border-slate-200 px-4 py-3 transition focus:border-blue-600 focus:outline-none"
                    >
                      <option value="">Select your age range</option>
                      <option value="18-25">18-25</option>
                      <option value="26-35">26-35</option>
                      <option value="36-45">36-45</option>
                      <option value="46-55">46-55</option>
                      <option value="56+">56+</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fadeIn space-y-6">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      Your Experience
                    </h2>
                    <p className="text-slate-600">
                      Tell us about your experience with us
                    </p>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      How long have you been a customer?
                    </label>
                    <div className="space-y-2">
                      {[
                        "Less than 3 months",
                        "3-6 months",
                        "6-12 months",
                        "More than 1 year",
                      ].map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center rounded-lg border-2 border-slate-200 p-3 transition hover:border-blue-600 hover:bg-blue-50"
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={option}
                            checked={formData.experience === option}
                            onChange={handleInputChange}
                            className="h-4 w-4 accent-blue-600"
                          />
                          <span className="ml-3 text-slate-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      How satisfied are you?
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              satisfaction: String(rating),
                            }))
                          }
                          className={`h-12 w-12 rounded-lg font-semibold transition ${
                            formData.satisfaction === String(rating)
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      1 = Not satisfied, 5 = Very satisfied
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-fadeIn space-y-6">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      Your Feedback
                    </h2>
                    <p className="text-slate-600">
                      Help us understand what you think
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      What did you like most?
                    </label>
                    <textarea
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      placeholder="Share what you enjoyed about your experience..."
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-slate-200 px-4 py-3 transition focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      What could we improve?
                    </label>
                    <textarea
                      name="improvements"
                      value={formData.improvements}
                      onChange={handleInputChange}
                      placeholder="Tell us what we can do better..."
                      rows={4}
                      className="w-full resize-none rounded-lg border-2 border-slate-200 px-4 py-3 transition focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-fadeIn space-y-6">
                  <div>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      Contact Preferences
                    </h2>
                    <p className="text-slate-600">
                      How would you like us to get in touch?
                    </p>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Preferred contact method
                    </label>
                    <div className="space-y-2">
                      {["Email", "Phone", "SMS", "No preference"].map(
                        (method) => (
                          <label
                            key={method}
                            className="flex cursor-pointer items-center rounded-lg border-2 border-slate-200 p-3 transition hover:border-blue-600 hover:bg-blue-50"
                          >
                            <input
                              type="radio"
                              name="contactMethod"
                              value={method}
                              checked={formData.contactMethod === method}
                              onChange={handleInputChange}
                              className="h-4 w-4 accent-blue-600"
                            />
                            <span className="ml-3 text-slate-700">
                              {method}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <label className="flex cursor-pointer items-center rounded-lg border-2 border-slate-200 p-4 transition hover:border-blue-600 hover:bg-blue-50">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded accent-blue-600"
                    />
                    <span className="ml-3 font-medium text-slate-700">
                      Subscribe to our newsletter for updates
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 bg-slate-50 px-8 py-8 md:px-12">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`rounded-lg px-6 py-3 font-semibold transition ${
                  currentStep === 1
                    ? "cursor-not-allowed bg-slate-200 text-slate-400"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition ${
                  isStepValid()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                {currentStep === totalSteps ? "Submit" : "Next"}
                {currentStep !== totalSteps && <ChevronRight size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
