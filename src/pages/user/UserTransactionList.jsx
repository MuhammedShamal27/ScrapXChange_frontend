import React, { useEffect, useState } from "react";
import { userTransactions } from "../../services/api/user/userApi";
import UserNavBar from "../../componets/user/UserNavBar";
import UserSideBar from "../../componets/user/UserSideBar";
import UserFooter from "../../componets/user/UserFooter";
import UserTransactionDetailsModal from "../../componets/user/UserTransactionDetailsModal";

const UserTransactionList = () => {
  const [data, setData] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // To store the selected transaction
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await userTransactions();
        setData(response);
        console.log("the response ", response);
      } catch (err) {
        console.error("the error is", err);
      }
    };
    fetchUserTransactions();
  }, []);

  // Function to handle clicking a transaction
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <UserNavBar />
      <div className="flex bg-bgColor">
        <UserSideBar />
        <div className="m-10 bg-white rounded-lg w-full text-sm">
          <h1 className="p-3 text-2xl font-semibold">Transaction List</h1>

          {/* Header row with responsive hidden classes */}
          <div className="flex justify-between border-b p-3">
            <h1 className="w-1/2 text-left">Shop Name</h1>
            <h1 className="w-1/4 text-center hidden sm:block">Date Picked</h1>
            <h1 className="w-1/4 text-center hidden sm:block">
              Total Quantity
            </h1>
            <h1 className="w-1/2 text-right">Total Price</h1>
          </div>

          {/* Transaction data row */}
          {data.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between p-3 cursor-pointer"
              onClick={() => handleTransactionClick(transaction)}
            >
              <h1 className="w-1/2 text-left">{transaction.shop_name}</h1>
              <h1 className="w-1/4 text-center hidden sm:block">
                {new Date(transaction.date_picked).toLocaleDateString()}
              </h1>
              <h1 className="w-1/4 text-center hidden sm:block">
                {transaction.total_quantity} kg
              </h1>
              <h1 className="w-1/2 text-right">₹{transaction.total_price}</h1>
            </div>
          ))}
        </div>
      </div>
      <UserFooter />
      {/* Show modal only when a transaction is clicked */}
      {isModalOpen && selectedTransaction && (
        <UserTransactionDetailsModal
          transaction={selectedTransaction}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default UserTransactionList;
