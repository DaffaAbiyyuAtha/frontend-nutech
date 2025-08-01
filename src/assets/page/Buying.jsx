import React, { useState, useEffect } from "react";
import logo from "../img/Logo.png"
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaEye, FaCalculator, FaXmark } from "react-icons/fa6";
import backgroundSaldo from "../img/backgroundSaldo.png";

function Buying() {
    const tokens = useSelector((state) => state.auth.token);
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const [showSaldo, setShowSaldo] = React.useState(false);
    const [popup, setPopup] = React.useState(false);
    const [popupSuccess, setPopupSuccess] = React.useState(false);
    const [popupFailed, setPopupFailed] = React.useState(false);
    const [listbalance, setListbalance] = React.useState(0);
    const saldo = listbalance;
    const product = useSelector((state) => state.buying.selected);
    const data = useSelector((state) => state.profile.dataProfile);
    const navigate = useNavigate();

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

    function processTopUp(e) {
        e.preventDefault();
        setLoading(true);
    
        const service_code = product.code;
    
        const payload = { service_code };
    
        setTimeout(() => {
            fetch("https://take-home-test-api.nutech-integrasi.com/transaction", {
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
                    setPopupSuccess(true);
                    setPopup(false)
                    setLoading(false);
                } else {
                    setPopupFailed(true)
                    setPopup(false)
                    setLoading(false);
                }
            })
            .catch((err) => {
                setPopupFailed(true)
                setPopup(false)
                setLoading(false);
            });
        }, 3000);
    }

    function confirmBuying(){
        if (popup === false) {
            setPopup(true);
        } else {
            setPopup(false)
        }
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
                            <div className="font-medium mb-3">PemBayaran</div>
                            <div className="flex items-center gap-4 font-semibold">
                                <img src={product.image} alt="Listrik" className="w-8"/>
                                <div className="">{product.name}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                <FaCalculator />
                                <input
                                    type="text"
                                    value={product?.tarif ? formatRupiah(product.tarif) : ""}
                                    name="topUp"
                                    id="topUp"
                                    readOnly
                                    className="flex-1 outline-none"
                                    
                                />
                            </div>
                            <button onClick={confirmBuying} className="w-full h-11 bg-[#F42619] text-white rounded-lg">
                                Bayar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {popup === false? (
                <div className="hidden"></div>
            ) : (
                <form onSubmit={processTopUp} className="flex absolute left-0 top-0 w-full items-center justify-center h-screen bg-black/50">
                    <div className="flex flex-col gap-4 items-center bg-white p-8 rounded-lg">
                        <img src={logo} alt="" className="w-10"/>
                        <div className="text-center">
                            <div className="">Beli {product.name} senilai</div>
                            <div className="font-semibold text-2xl">{product?.tarif ? formatRupiah(product.tarif) : ""}</div>
                        </div>
                        <button type="submit" className="text-[#F42619]">Ya, lanjutkan Bayar</button>
                        <button type="button" onClick={() => window.location.reload()} className="text-[#C6C0C0]">Batalkan</button>
                    </div>
                </form>
            )}
            {popupSuccess === false? (
                <div className="hidden"></div>
            ) : (
                <div className="flex absolute left-0 top-0 w-full items-center justify-center h-screen bg-black/50">
                    <div className="flex flex-col gap-4 items-center bg-white p-8 rounded-lg">
                        <FaCheck className="bg-[#52BD94] w-10 h-10 rounded-full p-2 text-white"/>
                        <div className="text-center">
                            <div className="">Pembayaran {product.name} senilai</div>
                            <div className="font-semibold text-2xl">{product?.tarif ? formatRupiah(product.tarif) : ""}</div>
                            <div className="">berhasil!</div>
                        </div>
                        <Link to="/home" className="text-[#F42619]">Kembali ke Beranda</Link>
                    </div>
                </div>
            )}
            {popupFailed === false? (
                <div className="hidden"></div>
            ) : (
                <div className="flex absolute left-0 top-0 w-full items-center justify-center h-screen bg-black/50">
                    <div className="flex flex-col gap-4 items-center bg-white p-8 rounded-lg">
                        <FaXmark className="bg-[#F42619] w-10 h-10 rounded-full p-2 text-white"/>
                        <div className="text-center">
                            <div className="">Pembayaran {product.name} senilai</div>
                            <div className="font-semibold text-2xl">{product?.tarif ? formatRupiah(product.tarif) : ""}</div>
                            <div className="">gagal</div>
                        </div>
                        <Link to="/home" className="text-[#F42619]">Kembali ke Beranda</Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Buying;