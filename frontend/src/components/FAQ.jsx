import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing icons for toggle
import img from '../assets/faq.svg'; // Update the path to your image

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null); // Track which FAQ is open

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close state
  };

  const faqs = [
    {
      question: "What is V-Learn, and how does it work?",
      answer: "V-Learn is an online platform designed to help trainees build confidence and skills in driving, learning, or any other specialized area. It connects learners with expert trainers for personalized guidance.",
    },
    {
      question: "How can I book an appointment?",
      answer: "You can book an appointment by clicking the 'Request an Appointment' button on the homepage. Choose your trainer and schedule a session that works best for you.",
    },
    {
      question: "Is V-Learn available worldwide?",
      answer: "Yes, V-Learn connects users globally with a network of trainers and a supportive learning community.",
    },
    {
      question: "Are the trainers certified?",
      answer: "Yes, all trainers on V-Learn are certified professionals with extensive experience in their respective fields.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "Absolutely! You can reschedule appointments by logging into your account and selecting a new time that suits you.",
    },
  ];

  return (
    <div className="container mt-10 bg-white mb-4 max-w-screen-xl mx-auto p-8 flex flex-col md:flex-row items-center gap-8">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img src={img} alt="FAQ" className="w-full h-auto rounded-lg shadow-lg" />
      </div>

      {/* FAQ Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-6 text-blue-950">Frequently Asked Questions</h2>
        <div className="space-y-4 ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg ${
                openIndex === index ? "border-blue-200 bg-blue-50" : "border-gray-200"
              } p-4 shadow-md`}
            >
              <button
                className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-blue-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
