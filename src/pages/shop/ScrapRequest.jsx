import React, { useEffect, useState } from "react";
import { Info } from "lucide-react";
import ShopNavBar from "../../componets/shop/ShopNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { getScrapRequests } from "../../services/api/shop/shopApi";
import { useNavigate } from "react-router-dom";

const ScrapRequest = () => {
  const [scrapRequests, setScrapRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScrapRequests = async () => {
      try {
        const data = await getScrapRequests();
        setScrapRequests(data);
      } catch (err) {
        console.error("Error fetching scrap requests:", err);
      }
    };

    fetchScrapRequests();
  }, []);

  const handleDetails = (id) => {
    navigate(`/shop/scrapRequestDetails/${id}`);
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <ShopNavBar />
        <div className="w-4/5">
          <HeadingAndProfile />

          <div className="bg-white rounded-lg m-4 sm:m-7">
            <div className="text-blue-950 font-bold text-lg sm:text-2xl p-4 sm:p-7">
              <h1>Requests Table</h1>
            </div>
            <table className="w-full table-auto text-xs">
              <thead>
                <tr className="text-left font-semibold border-b">
                  <th className="p-2 sm:p-4">Name</th>
                  <th className="p-2 sm:p-4 hidden sm:table-cell">Date</th>
                  <th className="p-2 sm:p-4 hidden sm:table-cell">Address</th>
                  <th className="p-2 sm:p-4 hidden sm:table-cell">Pincode</th>
                  <th className="p-2 sm:p-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {scrapRequests.length > 0 ? (
                  scrapRequests.map((request, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 sm:p-4">{request.name}</td>
                      <td className="p-2 sm:p-4 hidden sm:table-cell">
                        {new Date(request.date_requested).toLocaleDateString()}
                      </td>
                      <td className="p-2 sm:p-4 hidden sm:table-cell">
                        {request.address}
                      </td>
                      <td className="p-2 sm:p-4 hidden sm:table-cell">
                        {request.pincode}
                      </td>
                      <td className="p-2 sm:p-4">
                        <button onClick={() => handleDetails(request.id)}>
                          <Info color="#a3aed0" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 font-semibold text-xl sm:text-2xl text-center"
                    >
                      ! No New requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ScrapRequest;
