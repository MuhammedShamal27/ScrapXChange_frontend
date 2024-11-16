import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import FooterOfAdminAndShop from "../../componets/FooterOfAdminAndShop";
import { ReportBlockUnblock, Reports } from "../../services/api/admin/adminApi";
import { toast } from "sonner";
import { EllipsisVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminHeadingAndProfile from "../../componets/AdminHeadingAndProfile";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllReports = async () => {
      try {
        const response = await Reports();
        setReports(response);
      } catch (err) {
        console.error("some error occured ", err);
      }
    };
    fetchAllReports();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/admin/reportdetails/${id}/`);
  };

  return (
    <>
      <div className="adminFont flex bg-bgColor ">
        <AdminNavBar />
        <div className="w-10/12">
          <AdminHeadingAndProfile />
          <div className=" bg-white m-7 rounded-lg">
            <h1 className="text-xl font-semibold p-3 ml-7">Reports</h1>
            <div className="flex flex-col ml-7">
              <div className="grid grid-cols-2 sm:grid-cols-5  gap-4 p-3 font-semibold border-b ">
                <h1>From</h1>
                <h1 className="hidden sm:block">Towards</h1>
                <h1 className="hidden sm:block">Reason</h1>
                <h1 className="hidden sm:block">Date</h1>
                <h1>Action</h1>
              </div>
              {reports.map((report, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigate(report.id)}
                  className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-3 items-center text-xs  "
                >
                  <p>{report.sender_name}</p>
                  <p className="hidden sm:block">{report.receiver_name}</p>
                  <p className="hidden sm:block">{report.reason}</p>
                  <p className="hidden sm:block">
                    {new Date(report.timestamp).toLocaleDateString()}
                  </p>
                  <p>
                    <EllipsisVertical />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterOfAdminAndShop />
    </>
  );
};

export default ReportList;
