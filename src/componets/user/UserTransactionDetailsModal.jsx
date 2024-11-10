import { X } from "lucide-react";
import React from "react";

const UserTransactionDetailsModal = ({ transaction, handleCloseModal }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="flex flex-col bg-white w-3/6 rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h1 className="text-xl font-semibold">Transaction Details</h1>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex justify-between space-x-8">
            {/* Transaction Info */}
            <div className="w-1/2">
              <h2 className="text-lg font-medium mb-4">Transaction Info</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Shop Name:</h3>
                  <h3>{transaction.shop_name}</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Date Picked:</h3>
                  <h3>
                    {new Date(transaction.date_picked).toLocaleDateString()}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Payment Method:</h3>
                  <h3>{transaction.payment_method}</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Total Quantity:</h3>
                  <h3>{transaction.total_quantity} kg</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-semibold">Total Price:</h3>
                  <h3>₹ {transaction.total_price}</h3>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="w-1/2">
              <h2 className="text-lg font-medium mb-4">Product Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between font-semibold border-b pb-2">
                  <h3>Product Name</h3>
                  <h3>Quantity</h3>
                </div>
                {transaction.products.map((product, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{product.product_name}</p>
                    <p>{product.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTransactionDetailsModal;
