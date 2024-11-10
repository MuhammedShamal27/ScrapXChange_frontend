import React from "react";
import { X } from "lucide-react";

const RequestDetails = ({ isOpen, details, onClose }) => {
  if (!isOpen || !details) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div className=" " onClick={(e) => e.stopPropagation()}>
          <button className="bg-white" onClick={onClose}>
            <X />
          </button>
          <div className="flex rounded-2xl shadow-xl bg-white gap-7 p-7">
            <div className="rounded-2xl shadow-2xl p-20 text-xs space-y-3">
              <h1 className="font-bold text-base">Address</h1>
              <p>Name:{details.name}</p>
              <p>Address:{details.address}</p>
              <p>Landmark:{details.landmark}</p>
              <p>Pincode{details.pincode}</p>
              <p>Phone:{details.phone}</p>
            </div>
            <div className="rounded-2xl shadow-2xl p-20 text-xs space-y-3">
              <h1 className="font-bold text-base">Scrap</h1>
              <div>
                {details.products?.length > 0 ? (
                  details.products.map((product, index) => (
                    <p key={index}>{product}</p>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestDetails;
