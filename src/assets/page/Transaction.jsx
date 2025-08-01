import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { FaHouse, FaEye, FaLock } from "react-icons/fa6";
import backgroundSaldo from "../img/backgroundSaldo.png";

function Transaction() {
    const [loading, setLoading] = React.useState(true);
    const tokens = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.profile.dataProfile);
    const [listTransaction, setListTransaction] = React.useState([]);
    console.log(listTransaction)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSaldo, setShowSaldo] = React.useState(false);
    const [listbalance, setListbalance] = React.useState(0);
    const saldo = listbalance;

    if (tokens === null) {
        return <Navigate to="/login" replace />;
    }

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

    async function balanceHome() {
        const balanceHome = await fetch("https://take-home-test-api.nutech-integrasi.com/balance", {
            headers: {
                Authorization: "Bearer " + tokens,
              }
        });
        const listbalanceHome = await balanceHome.json();
        setListbalance(listbalanceHome.data.balance);
    }

    async function transactionHome() {
        const transactionHome = await fetch("https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=0&limit=100", {
            headers: {
                Authorization: "Bearer " + tokens,
              }
        });
        const listtransactionHome = await transactionHome.json();
        setListTransaction(listtransactionHome.data.records);
    }

    const formatTanggal = (tanggal) => {
        const date = new Date(tanggal);
        return date.toLocaleDateString("id-ID", { 
          day: "numeric", 
          month: "long", 
          year: "numeric" 
        }) + " " + date.toLocaleTimeString("id-ID", { 
          hour: "2-digit", 
          minute: "2-digit", 
          hour12: false 
        });
    };

    useEffect(() => {
        balanceHome();
        transactionHome();
      }, []);

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner"></div>
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
                            <div className="font-medium mb-4">Semua Transaksi</div>
                            {listTransaction.length === 0 ? (
                                <div className="text-center text-[#C6C0C0] py-4">
                                    Anda belum memiliki transaksi
                                </div>
                            ) : (
                                <div className="flex flex-col overflow-y-auto h-[calc(100vh-450px)]">
                                    {listTransaction.map((items) => {
                                        return (
                                            <div className="border-2 border-[#E2E2E2] rounded-lg mb-3 flex-shrink-0">
                                                <div className="flex justify-between p-4">
                                                    <div className="font-medium">
                                                        <div 
                                                            className={`${items.transaction_type === "TOPUP" ? "text-[#62C39E]" : "text-[#FF5630]"} mb-2 text-lg`}
                                                        >
                                                            {items.transaction_type === "TOPUP" ? "+ " : "- "}
                                                            {formatRupiah(items.total_amount)}
                                                        </div>
                                                        <div className="text-[#E2E2E2] text-xs">
                                                            {formatTanggal(items.created_on)} WIB
                                                        </div>
                                                    </div>
                                                    <div className="text-[#E2E2E2]">{items.transaction_type}</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction;