import React from "react";
import logo from "../img/Logo.png"
import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
    const location = useLocation()
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    function handleHome() {
        if (location.pathname !== "/home") {
          setLoading(true);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      }
    
      function handleTopUp() {
        if (location.pathname !== "/top-up") {
          setLoading(true);
          setTimeout(() => {
            navigate("/top-up");
          }, 2000);
        }
      }
    
      function handleTransaction() {
        if (location.pathname !== "/transaction") {
          setLoading(true);
          setTimeout(() => {
            navigate("/transaction");
          }, 2000);
        }
      }
    
      function handleAccount() {
        if (location.pathname !== "/account") {
          setLoading(true);
          setTimeout(() => {
            navigate("/account");
          }, 2000);
        }
      }
    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="flex items-center justify-between w-full h-12 px-28 mb-16 font-semibold text-[#322E2E] shadow-md">
                <div onClick={handleHome} className="flex items-center gap-2 cursor-pointer">
                    <img src={logo} alt="logo" className="w-5"/>
                    <div className="">SIMS PPOB</div>
                </div>
                <div className="flex gap-6">
                    <div
                        onClick={handleTopUp}
                        className={`${
                            location.pathname === "/top-up" ? "text-[#F42619] cursor-pointer" : "cursor-pointer"
                        }`}
                        >
                            Top Up
                    </div>
                    <div
                        onClick={handleTransaction}
                        className={`${
                            location.pathname === "/transaction" ? "text-[#F42619] cursor-pointer" : "cursor-pointer"
                        }`}
                        >
                            Transaction
                    </div>
                    <div
                        onClick={handleAccount}
                        className={`${
                            location.pathname === "/account" ? "text-[#F42619] cursor-pointer" : "cursor-pointer"
                        }`}
                        >
                            Akun
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;