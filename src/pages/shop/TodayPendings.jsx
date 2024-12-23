import React, { useEffect, useState } from "react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import todaypending from "../../assets/test.png";
import {
  getPendingDetails,
  todayPendings,
} from "../../services/api/shop/shopApi";
import RequestDetails from "../../componets/shop/RequestDetails";
import FooterofAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Nothing from "../../assets/Nothing.jpeg";
import ReportMessage from "../../componets/ReportMessage";
import { TriangleAlert } from "lucide-react";

const TodayPendings = () => {
  const navigate = useNavigate();
  const [pendings, setPendings] = useState([]);
  const [error, setError] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    const fetchPendings = async () => {
      try {
        const response = await todayPendings();
        console.log("response", response);
        setPendings(response);
      } catch (err) {
        console.error("Error while fetching data", err);
        setError(err.message);
      }
    };
    fetchPendings();
  }, []);

  const openDetailsModal = async (id) => {
    try {
      const response = await getPendingDetails(id);
      console.log("the response in frontend", response);
      setSelectedRequestDetails(response);
      setIsDetailsModalOpen(true);
    } catch (err) {
      console.error("Error while fetching details", err);
      setError(err.message);
    }
  };

  const handleCollect = (id) => {
    try {
      navigate(`/shop/scrapCollection/${id}`);
    } catch {
      toast("Unexpected error occurred");
    }
  };

  const handleReportClick = (pending) => {
    setSelectedUser(pending);
    setIsReportModalOpen(true);
  };

  const closeReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor min-h-screen">
        <ShopNavBar />
        <div>
          <HeadingAndProfile />
          <div className="ml-10">
            {pendings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {pendings.map((pending, index) => (
                  <div
                    key={index}
                    className="rounded-lg shadow-2xl p-3 space-y-3"
                  >
                    <div className="relative">
                      {/* Image and alert button */}
                      <img
                        className="rounded"
                        src={todaypending}
                        alt="Pending"
                      />
                      <button
                        onClick={() => handleReportClick(pending)}
                        className="absolute top-2 right-2 bg-white rounded-sm"
                      >
                        <TriangleAlert color="#c81414" size={20} />
                      </button>
                    </div>

                    {/* Name */}
                    <h1 className="text-center font-semibold">
                      {pending.name}
                    </h1>

                    {/* Buttons */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => openDetailsModal(pending.id)}
                        className="bg-black text-white py-2 px-4 rounded-3xl text-xs"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleCollect(pending.id)}
                        className="bg-myBlue text-white py-2 px-4 rounded-3xl text-xs"
                      >
                        Collect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" bg-white flex flex-col items-center rounded-2xl shadow-2xl">
                <img className="w-2/6 rounded-2xl p-3" src={Nothing} alt="" />
                <h2 className="text-xl p-3 ">Take a Break !</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterofAdminAndShop />
      {isDetailsModalOpen && selectedRequestDetails && (
        <RequestDetails
          isOpen={isDetailsModalOpen}
          details={selectedRequestDetails}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}

      {isReportModalOpen && selectedUser && (
        <ReportMessage
          onClose={closeReportModal}
          receiver={selectedUser.user}
          Name={selectedUser.name}
          type="shop"
        />
      )}
    </>
  );
};

export default TodayPendings;
