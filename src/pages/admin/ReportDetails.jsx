import React, { useEffect, useState } from "react";
import AdminNavBar from "../../componets/admin/AdminNavBar";
import HeadingAndProfile from "../../componets/HeadingAndProfile";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  DetailOfReport,
  ReportBlockUnblock,
  ReportReasons,
} from "../../services/api/admin/adminApi";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [reportReason, setReportReason] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false); // Track if user is blocked
  const [warningCount, setWarningCount] = useState(0); // Track warnings count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportDetails = async (reportId) => {
      try {
        const response = await DetailOfReport(reportId);
        setReport(response);
        // Fetch report reasons
        const reasonsResponse = await ReportReasons(response.receiver);
        setReportReason(reasonsResponse);

        // Get current block/unblock and warning status
        setIsBlocked(response.receiver_is_blocked);
        setWarningCount(response.warning_count);
      } catch (err) {
        console.error("some error occured while fetching ", err);
      }
    };

    if (id) {
      fetchReportDetails(id); // Fetch the details only if 'id' exists
    }
  }, [id]);

  const handleWarning = async () => {
    try {
      const request = {
        reportId: report.id,
        action: "warning",
      };
      const response = await ReportBlockUnblock(report.receiver, request);
      setWarningCount(response.warning_count);
    } catch (err) {
      console.error("Error issuing warning: ", err);
    }
  };

  const handleBlock = async () => {
    try {
      request = {
        reportId: report.id,
        action: "block",
      };
      const response = await ReportBlockUnblock(report.receiver, request);
      setIsBlocked(true);
    } catch (err) {
      console.error("Error blocking user: ", err);
    }
  };

  const handleUnblock = async () => {
    try {
      request = {
        reportId: report.id,
        action: "unblock",
      };
      const response = await ReportBlockUnblock(report.receiver, request);
      setIsBlocked(false);
    } catch (err) {
      console.error("Error unblocking user: ", err);
    }
  };

  const hanldeGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="adminFont flex bg-bgColor flex-col lg:flex-row">
      <AdminNavBar />
      <div className="w-full lg:w-10/12">
        <HeadingAndProfile />

        <div className="flex flex-col lg:flex-row m-10 gap-10">
          <div className="bg-white w-full lg:w-6/12 rounded-lg flex flex-col justify-around">
            <div className="ml-7 space-y-3 p-3">
              <h1 className="font-semibold">Report Details</h1>
              <div className="flex items-center text-sm space-x-10">
                <h1>From :</h1>
                <p>{report ? report.sender_name : "Loading..."}</p>
              </div>
              <div className="flex items-center text-sm space-x-5">
                <h1>Towards :</h1>
                <p>{report ? report.receiver_name : "Loading..."}</p>
              </div>
              <div className="flex items-center text-sm space-x-7">
                <h1>Reason :</h1>
                <p>{report ? report.reason : "Loading..."}</p>
              </div>
              {report && report.reason === "other" && (
                <div className="flex items-center text-sm space-x-7">
                  <h1>Description :</h1>
                  <p>{report.description}</p>
                </div>
              )}
              <div className="flex items-center text-sm space-x-7">
                <h1>Date :</h1>
                <p>
                  {report
                    ? new Date(report.timestamp).toLocaleDateString()
                    : "Loading..."}
                </p>
              </div>
            </div>

            <div className="flex justify-around text-sm p-3">
              <button
                className="rounded-2xl bg-black text-white w-1/6 h-7"
                onClick={hanldeGoBack}
              >
                Go Back
              </button>
              {!isBlocked && (
                <button
                  className="rounded-2xl bg-orange-400 text-white w-2/6 h-7"
                  onClick={handleWarning}
                >
                  Make a Warning ({warningCount})
                </button>
              )}
              <button
                className={`rounded-2xl ${
                  isBlocked ? "bg-green-400" : "bg-red-500"
                } text-white w-1/6 h-7`}
                onClick={isBlocked ? handleUnblock : handleBlock}
              >
                {isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>

          <div className="bg-white w-full lg:w-6/12 rounded-lg">
            <h1 className="font-semibold ml-5 p-3">Current Report</h1>
            <div className="ml-5 p-3">
              <div className="grid grid-cols-5 text-sm justify-between border-b pb-2">
                <h2>Fraud</h2>
                <h2>Inappropriate Content</h2>
                <h2>Spam</h2>
                <h2>Other</h2>
                <h2>Total Reports</h2>
              </div>
              <div className="grid grid-cols-5 text-sm justify-between pt-2">
                <p>
                  {reportReason
                    ? reportReason.reason_counts.fraud
                    : "Loading..."}
                </p>
                <p>
                  {reportReason
                    ? reportReason.reason_counts.inappropriate
                    : "Loading..."}
                </p>
                <p>
                  {reportReason
                    ? reportReason.reason_counts.spam
                    : "Loading..."}
                </p>
                <p>
                  {reportReason
                    ? reportReason.reason_counts.other
                    : "Loading..."}
                </p>
                <p>
                  {reportReason ? reportReason.total_reports : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white m-10 rounded-lg text-sm">
          <h1 className="font-semibold ml-7 p-3">Similar Reports</h1>
          <div className="grid grid-cols-4 justify-items-center border-b py-2">
            <h1>From</h1>
            <h1>Towards</h1>
            <h1>Reason</h1>
            <h1>Date</h1>
          </div>

          {reportReason && reportReason.similar_reports.length > 0 ? (
            reportReason.similar_reports.map((similarReport, index) => (
              <div
                key={index}
                className="grid grid-cols-4 justify-items-center py-2"
              >
                <h1>{similarReport.sender__username}</h1>
                <h1>{similarReport.receiver__username}</h1>
                <h1>{similarReport.reason}</h1>
                <h1>
                  {new Date(similarReport.timestamp).toLocaleDateString()}
                </h1>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-3 justify-items-center py-2">
              <h1>No similar reports found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
