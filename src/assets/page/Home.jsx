import React, { useState, useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { FaHouse, FaEye, FaLock } from "react-icons/fa6";
import backgroundSaldo from "../img/backgroundSaldo.png";
import { setProduct } from "../redux/reducers/buying";
import game from "../img/Game.png"
import kurban from "../img/Kurban.png"
import listrik from "../img/Listrik.png"
import paketData from "../img/PaketData.png"
import musik from "../img/Musik.png"
import pbb from "../img/PBB.png"
import pdam from "../img/PDAM.png"
import pgn from "../img/PGN.png"
import pulsa from "../img/Pulsa.png"
import televisi from "../img/Televisi.png"
import voucherMakanan from "../img/VoucherMakanan.png"
import zakat from "../img/Zakat.png"

function Home() {
    const tokens = useSelector((state) => state.auth.token);
    const [loading, setLoading] = React.useState(true);
    const data = useSelector((state) => state.profile.dataProfile);
    const [listBanner, setListBanner] = React.useState([]);
    const [listService, setListService] = React.useState([]);
    const [listbalance, setListbalance] = React.useState(0);
    const dispatch = useDispatch();
    const [showSaldo, setShowSaldo] = React.useState(false);
    const saldo = listbalance;

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {  
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [data]);


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

    const handleSelectProduct = (name, image, code, tarif) => {
        dispatch(setProduct({ name, image, code, tarif }));
    };


    async function bannerHome() {
        const dataHome = await fetch("https://take-home-test-api.nutech-integrasi.com/banner", {});
        const listBanner = await dataHome.json();
        setListBanner(listBanner.data);
    }

    async function serviceHome() {
        const serviceHome = await fetch("https://take-home-test-api.nutech-integrasi.com/services", {
            headers: {
                Authorization: "Bearer " + tokens,
              }
        });
        const listServiceHome = await serviceHome.json();
        setListService(listServiceHome.data);
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

    useEffect(() => {
        bannerHome();
        serviceHome();
        balanceHome();
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
                        <div className="flex overflow-x-auto scrollbar-hide gap-8 lg:justify-center">
                            {listService.map((items) => {
                                return (
                                    <Link 
                                        key={items.service_code}
                                        to="/buying" 
                                        onClick={() => handleSelectProduct(items.service_name, items.service_icon, items.service_code, items.service_tariff)} 
                                        className="flex flex-col gap-1 items-center flex-shrink-0"
                                    >
                                        <img src={items.service_icon} alt={items.service_name} />
                                        <div className="text-sm">{items.service_name}</div>
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="flex overflow-x-auto scrollbar-hide gap-3 lg:justify-center">
                            {listBanner.map((items) => {
                                return (
                                    <div className="flex flex-shrink-0">
                                        <img src={items.banner_image} alt={items.banner_name} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;