import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href; // Get the current URL to share
  const shareMessage = `
    Check out V-Learn! Empowering learning and training experiences globally.
    
    Features of V-Learn:
    🌐 Comprehensive Trainer Database
    📅 Appointment Scheduling
    🔍 Smart Search for Personalized Results
    📚 Resource Sharing and Community Support
    🤝 Direct Communication with Trainers

    Share this link: ${shareUrl}
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage)
      .then(() => {
        toast.success("message copied successfully. You can paste it on your social media handle.")
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl mx-auto transition-transform transform scale-95">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Share Our Platform</h2>
        <p className="text-lg text-gray-600 mb-4">
          Help us spread the word about V-Learn! Share our platform with your friends and family to empower their learning and training experiences.
        </p>
        <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Features of V-Learn:</h3>
        <ul className="list-disc list-inside mb-4">
          <li className="text-gray-700">🌐 Comprehensive Trainer Database</li>
          <li className="text-gray-700">📅 Appointment Scheduling</li>
          <li className="text-gray-700">🔍 Smart Search for Personalized Results</li>
          <li className="text-gray-700">📚 Resource Sharing and Community Support</li>
          <li className="text-gray-700">🤝 Direct Communication with Trainers</li>
        </ul>
        <p className="text-lg text-gray-600 mb-4">
          To share our platform, click the button below to copy the message, or share directly to your social media:
        </p>
        <div className="bg-gray-100 border rounded-lg p-4 mb-4">
          <p className="text-gray-800">{shareUrl}</p>
        </div>
        <button
          onClick={handleCopy}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Copy Shareable Message
        </button>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Share on Social Media:</h4>
        <div className="flex space-x-4 mb-6">
          <a
            href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition duration-300"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition duration-300"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href={`https://instagram.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition duration-300"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition duration-300"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
