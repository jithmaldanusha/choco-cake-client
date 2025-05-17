import React, { useState, useEffect } from "react";
import AdminNavbar from "../Components/AdminNavbar";

const AdminDashboard = () => {
  //order total
  const [totalIncome, setTotalIncome] = useState(0);

  //montly income
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  //useeffect for the order total
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/getTotalIncome`);
        const result = await response.json();
        if (result.statusCode === 200) {
          setTotalIncome(result.data.totalIncome);
        } else {
          console.error("Failed to fetch total income:", result.message);
        }
      } catch (error) {
        console.error("Error fetching total income:", error);
      }
    };

    const fetchMonthlyIncome = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/order/getMonthlyIncome`);
        const result = await response.json();
        console.log(result);

        if (result.statusCode === 200) {
          setMonthlyIncome(result.data.totalMonthlyIncome);
        } else {
          console.error("Failed to fetch monthly income:", result.message);
        }
      } catch (error) {
        console.error("Error fetching monthly income:", error);
      }
    };

    fetchTotalIncome();
    fetchMonthlyIncome();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar/>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h2 className="text-3xl font-semibold">All Income</h2>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-6 mt-12">
            {/* All income section */}
            <div className="bg-gray-100 text-center p-8 rounded-lg shadow-md w-80">
              <h3 className="text-xl font-semibold">All Income</h3>

              {/* order total value display */}
              <p className="text-3xl mt-2">RS {totalIncome.toLocaleString()}.00</p>
            </div>

            {/* Monthly income section */}
            <div className="bg-gray-100 text-center p-8 rounded-lg shadow-md w-80">
              <h3 className="text-xl font-semibold">Monthly Income</h3>

              {/* monthly order value display */}
              <p className="text-3xl mt-2">RS {monthlyIncome.toLocaleString()}.00</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-end items-center mt-[-80px] pr-2">
          <img src="/images/Man.png" alt="Man" className="w-96 h-auto" />
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <img
            src="/images/Adminlogo.png"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-right">
            <p className="font-semibold">Admin</p>
            <p className="text-gray-500">Welcome</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
