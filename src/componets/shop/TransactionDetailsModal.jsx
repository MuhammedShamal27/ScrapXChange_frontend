import React from "react";
import { X } from "lucide-react";

const TransactionDetailsModal = ({ transaction, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-4xl rounded-lg p-6 md:p-8 text-sm shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          {/* Modal Title */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-3xl text-gray-800">
              Transaction Details
            </h1>
          </div>

          {/* Transaction Details */}
          <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
            {/* Left Column: User Details */}
            <div className="bg-bgColor w-full md:w-1/2 p-4 rounded-lg shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">UserName:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Address:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.address}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Pincode:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.pincode}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Phone:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.phone}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Date Requested:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.date_requested}
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Date Scheduled:</h3>
                  <p className="text-gray-800">
                    {transaction.collection_request.scheduled_date}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Payment & General Details */}
            <div className="bg-bgColor w-full md:w-1/2 p-4 rounded-lg shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Payment Method:</h3>
                  <p className="text-gray-800">{transaction.payment_method}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Total Quantity:</h3>
                  <p className="text-gray-800">
                    {transaction.total_quantity} kg
                  </p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Total Price:</h3>
                  <p className="text-gray-800">₹{transaction.total_price}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Date Picked:</h3>
                  <p className="text-gray-800">{transaction.date_picked}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="bg-gray-100 w-full mt-6 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg text-gray-700 mb-4">
              Product Information
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-gray-600">
                    Category
                  </th>
                  <th className="text-left px-4 py-2 text-gray-600">Product</th>
                  <th className="text-left px-4 py-2 text-gray-600">Price</th>
                  <th className="text-left px-4 py-2 text-gray-600">
                    Quantity (kg)
                  </th>
                </tr>
              </thead>
              <tbody>
                {transaction.transaction_products.map((product, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border px-4 py-2 text-gray-800">
                      {product.product.category.name}
                    </td>
                    <td className="border px-4 py-2 text-gray-800">
                      {product.product.name}
                    </td>
                    <td className="border px-4 py-2 text-gray-800">
                      ₹{product.product.price}
                    </td>
                    <td className="border px-4 py-2 text-gray-800">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons at the bottom-right corner
          <div className="flex justify-end space-x-4 mt-6">
            <button className="bg-black hover:bg-gray-800 text-white py-2 px-6 rounded-full transition duration-300">
              Share
            </button>
            <button
             
              className="bg-myBlue hover:bg-blue-700 text-white py-2 px-6 rounded-full transition duration-300"
            >
              Download
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TransactionDetailsModal;
