import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { FaHouse, FaEye, FaLock } from "react-icons/fa6";
import backgroundSaldo from "../img/backgroundSaldo.png";

function HistoryTransaction() {
    const tokens = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.profile.dataProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showSaldo, setShowSaldo] = React.useState(false);
    const saldo = "20000";

    if (tokens === null) {
        return <Navigate to="/login" replace />;
    }

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(angka);
      };
    return (
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
                        <div className="flex gap-4 font-medium">
                            <div className="text-[#C6C0C0]">Maret</div>
                            <div className="text-[#C6C0C0]">Mei</div>
                            <div className="text-[#C6C0C0]">Juni</div>
                            <div className="text-[#C6C0C0]">Juli</div>
                            <div className="text-[#4E4B4B]">Agustus</div>
                            <div className="text-[#C6C0C0]">September</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full text-[#C6C0C0]">
                        Maaf tidak ada histori transaksi saat ini
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryTransaction;