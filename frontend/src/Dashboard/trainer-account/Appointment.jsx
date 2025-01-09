import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdPaid, MdOutlinePayment } from 'react-icons/md';

const Appointment = ({ appointment }) => {
  // Handle cases where appointment is null, undefined, or not an array
  if (!appointment || !Array.isArray(appointment) || appointment.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No appointment available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Appointments</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Photo</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Payment Status</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Ticket Price</th>
              <th className="py-2 px-4 text-sm font-semibold text-gray-600">Booked On</th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((app) => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">{app.trainer?.name || 'N/A'}</td>
                <td className="py-3 px-4">
                  {app.user?.photo ? (
                    <img
                      src={app.user.photo}
                      alt={`${app.user.name}'s photo`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-400" />
                  )}
                </td>
                <td className="py-3 px-4 text-gray-800 flex items-center gap-2">
                  {app.isPaid ? (
                    <>
                      <MdPaid className="text-green-500" /> Paid
                    </>
                  ) : (
                    <>
                      <MdOutlinePayment className="text-red-500" /> Unpaid
                    </>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-800">{app.ticketPrice || 'N/A'}</td>
                <td className="py-3 px-4 text-gray-800">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
