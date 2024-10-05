import React, { useEffect, useState } from 'react'
import { shopTransactionList } from '../../services/api/shop/shopApi'
import ShopNavBar from '../../componets/shop/ShopNavBar';
import HeadingAndProfile from '../../componets/HeadingAndProfile';
import FooterofAdminAndShop from '../../componets/FooterOfAdminAndShop'
import TransactionDetailsModal from '../../componets/shop/TransactionDetailsModal';


const TransactionList = () => {
    const [data , setData] = useState([]);
    const [selectedTransaction , setSelectedTransaction] = useState(null);
    const [showModal , setShowModal] = useState(false);



    useEffect(() => {
        const fetchTransactions = async () => {
            try{
                const response =await shopTransactionList();
                setData(response)
                console.log('the transcation list',response)
            }catch (err){
                console.error ('the given error is ',err)
            }
        }
        fetchTransactions();
    },[])

    const openTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction)
        setShowModal(true);
    }


  return (
<>
  <div className="flex flex-col md:flex-row bg-bgColor min-h-screen">
    <ShopNavBar />
    <div className="flex flex-col w-full md:w-8/12">
      <HeadingAndProfile />
      <div className="bg-white m-4 md:m-10 rounded-lg p-4">
        <h1 className="font-semibold text-lg md:text-2xl mb-4">Transaction List</h1>

        {/* Grid layout for headings */}
        <div className="grid grid-cols-5 text-xs md:text-sm font-semibold border-b p-2 md:p-3 gap-2 text-left">
          <h1>Name</h1>
          <h1>Quantity</h1>
          <h1>Price</h1>
          <h1>Payment type</h1>
          <h1>Date</h1>
        </div>

        {/* Grid layout for transaction data */}
        {data.map((transaction,index) => (
        <div key={index} className="grid grid-cols-5 text-xs md:text-sm p-2 md:p-3 gap-2 text-left cursor-pointer" 
        onClick={() => openTransactionDetails(transaction)}>
            <h1>{transaction.collection_request.name}</h1>
            <h1>{transaction.total_quantity} Kg</h1>
            <h1>₹{transaction.total_price}</h1>
            <h1>{transaction.payment_method}</h1>
            <h1>{transaction.date_picked}</h1>
        </div>
        ))}
      </div>
    </div>
  </div>
  <FooterofAdminAndShop/>
  { showModal && selectedTransaction && (
    <TransactionDetailsModal 
    transaction={selectedTransaction}
    onClose={() => setShowModal(false)}
    />
  ) }
</>

  )
}

export default TransactionList