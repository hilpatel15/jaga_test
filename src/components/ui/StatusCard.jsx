import React from "react";
import { Users, Clock, CheckCircle } from "lucide-react";

const StatusCard = ({ title, count, icon: Icon, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${color}`}>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <p className="text-3xl font-extrabold text-gray-900 mt-1">{count}</p>
  </div>
);

export default StatusCard;
