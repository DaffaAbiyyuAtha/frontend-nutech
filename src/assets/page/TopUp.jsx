import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { FaHouse, FaEye, FaCalculator } from "react-icons/fa6";
import backgroundSaldo from "../img/backgroundSaldo.png";

function TopUp() {
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const tokens = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.profile.dataProfile);
    const [listbalance, setListbalance] = React.useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSaldo, setShowSaldo] = React.useState(false);
    const [nominal, setNominal] = React.useState("");
    const saldo = listbalance;

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {  
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [data]);

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(angka);
    };

    if (tokens === null) {
        return <Navigate to="/login" replace />;
    }

    async function balanceHome() {
        const balanceHome = await fetch("https://take-home-test-api.nutech-integrasi.com/balance", {
            headers: {
                Authorization: "Bearer " + tokens,
              }
        });
        const listbalanceHome = await balanceHome.json();
        setListbalance(listbalanceHome.data.balance);
    }

    function processTopUp(e) {
        e.preventDefault();
        setLoading(true);
    
        const top_up_amount = nominal;
        console.log(top_up_amount)
    
        const payload = { top_up_amount };
    
        setTimeout(() => {
            fetch("https://take-home-test-api.nutech-integrasi.com/topup", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokens,
                },
                body: JSON.stringify(payload),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
    
                if (data.status === 0 || data.success === true) {
                    navigate(0);
                } else {
                    setMessage(data.message)
                    setLoading(false);
                }
            })
            .catch((err) => {
                setMessage(data.message)
                setLoading(false);
            });
        }, 3000);
    }

    useEffect(() => {
        balanceHome();
      }, []);

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner"></div>
                </div>
            )}
            {message && (
                <div
                    className={`fixed top-20 right-1/2 transform translate-x-1/2 px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
                    message.success === false ? "bg-red-500" : "bg-[#33BEC5]"
                    } text-white`}
                >
                    {message}
                </div>
            )}
            <div className="">
                <Navbar/>
                <div className="px-28">
                    <div className="flex flex-col gap-16">
                        <div className="flex">
                            <div className="w-1/2">
                                <img
                                    src={data?.profile_image && data.profile_image.trim() !== "" ? data.profile_image : profile}
                                    alt="profile"
                                    className="flex w-14 mb-6 rounded-full"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = profile;
                                    }}
                                />
                                <div className="font-medium mb-3">Selamat datang,</div>
                                <div className="font-semibold text-3xl">{data.first_name} {data.last_name}</div>
                            </div>
                            <div
                                className="w-1/2 h-40 bg-cover bg-center text-white rounded-lg"
                                style={{ backgroundImage: `url(${backgroundSaldo})` }}
                            >
                                <div className="flex flex-col h-full justify-between p-6">
                                    <div className="font-medium">saldo anda</div>
                                    <div className="font-semibold text-4xl">
                                        {showSaldo ? formatRupiah(saldo) : "Rp ••••••"}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="font-medium text-sm">Lihat Saldo</div>
                                        <button 
                                            type="button"
                                            onClick={() => setShowSaldo(!showSaldo)}
                                        >
                                            <FaEye />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="font-medium mb-3">Silahkan masukan</div>
                            <div className="font-semibold text-3xl">Nominal Top Up</div>
                        </div>
                        <form onSubmit={processTopUp} className="flex flex-col gap-8">
                            <div className="flex justify-between gap-8">
                                <div className="flex flex-1 items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <FaCalculator />
                                    <input
                                        type="text"
                                        value={nominal ? formatRupiah(nominal) : ""}
                                        name="topUp"
                                        id="topUp"
                                        readOnly
                                        className="flex-1 outline-none"
                                        placeholder="masukan email anda"
                                    />
                                </div>
                                <div className="flex flex-shrink-0 gap-8">
                                    <div
                                        onClick={() => setNominal(10000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 10000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(10000)}
                                    </div>
                                    <div
                                        onClick={() => setNominal(20000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 20000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(20000)}
                                    </div>
                                    <div
                                        onClick={() => setNominal(50000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 50000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(50000)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-8">
                                <button
                                    type="submit"
                                    className={`flex items-center justify-center text-[#C6C0C0] rounded-lg h-11 ${
                                        nominal ? "bg-[#C6C0C0] text-white w-full " : "w-full border-2 border-[#C6C0C0] text-[#C6C0C0] cursor-not-allowed"
                                    }`}
                                    disabled={!nominal}
                                    >
                                    Top Up
                                </button>
                                <div className="flex flex-shrink-0 gap-8">
                                    <div
                                        onClick={() => setNominal(100000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 100000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(100000)}
                                    </div>
                                    <div
                                        onClick={() => setNominal(250000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 250000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(250000)}
                                    </div>
                                    <div
                                        onClick={() => setNominal(500000)}
                                        className={`flex items-center justify-center rounded-lg border-2 w-24 h-11 cursor-pointer transition ${
                                        nominal === 500000
                                            ? "bg-[#C6C0C0] text-white"
                                            : "border-[#E2E2E2] hover:bg-gray-100"
                                        }`}
                                    >
                                        {formatRupiah(500000)}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopUp;