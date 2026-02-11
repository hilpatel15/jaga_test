import React from "react";

const MetricCard = ({ number, unit, label }) => (
  <div className="p-4">
    <p className="text-6xl font-extrabold text-yellow-600">
      {number}
      {unit}
    </p>
    <p className="text-sm text-gray-600 mt-1">{label}</p>
  </div>
);

export default MetricCard;
