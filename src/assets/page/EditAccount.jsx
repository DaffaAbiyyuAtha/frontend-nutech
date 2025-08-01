import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { FaHouse, FaEye, FaUser } from "react-icons/fa6";
import { datasProfile } from "../redux/reducers/profile";

function EditAccount() {
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const tokens = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.profile.dataProfile);
    console.log(data)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {  
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [data]);

    function changeProfile(e) {
        e.preventDefault();
        setLoading(true)
    
        const email = e.target.email.value;
        const first_name = e.target.firstName.value;
        const last_name = e.target.lastName.value;
    
        const payload = { email, first_name, last_name };
    
        fetch("https://take-home-test-api.nutech-integrasi.com/profile/update", {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokens}` },
          body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
        console.log("API Response:", data);

        if (data.status === 0 || data.success === true) {
            dispatch(datasProfile(data.data));
            setMessage(data.message);
            navigate("/account");
        } else {
            setMessage(data.message);
            setLoading(false)
        }

        })
        .catch((err) => console.error("update error Error:", err));
        setLoading(false)
    }

    if (tokens === null) {
        return <Navigate to="/login" replace />;
    }
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
                <div className="flex flex-col gap-8 px-28">
                    <div className="flex flex-col justify-center items-center gap-8">
                        <img
                            src={data?.profile_image && data.profile_image.trim() !== "" ? data.profile_image : profile}
                            alt="profile"
                            className="flex w-36 rounded-full"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = profile;
                            }}
                        />
                        <div className="font-semibold text-3xl">{data.first_name} {data.last_name}</div>
                    </div>
                    <form onSubmit={changeProfile} className="flex flex-col w-full">
                        <div className="flex flex-col w-full max-w-[600px] mx-auto items-center gap-8">
                            <div className="flex flex-col gap-2 w-full">
                            <div className="">Email</div>
                            <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#3A3636] gap-3 mb-4">
                                <button type="button" className="text-[#3A3636]">
                                    <FaHouse />
                                </button>
                                <input
                                    type="email"
                                    name="email"
                                    className="flex-1 outline-none"
                                    defaultValue={data.email}
                                />
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full max-w-[600px] mx-auto items-center gap-8">
                            <div className="flex flex-col gap-2 w-full">
                            <div className="">Nama Depan</div>
                            <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#3A3636] gap-3 mb-4">
                                <button type="button" className="text-[#3A3636]">
                                    <FaUser />
                                </button>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="flex-1 outline-none"
                                    defaultValue={data.first_name}
                                />
                            </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full max-w-[600px] mx-auto items-center gap-8">
                            <div className="flex flex-col gap-2 w-full">
                            <div className="">Nama Belakang</div>
                            <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#3A3636] gap-3 mb-4">
                                <button type="button" className="text-[#3A3636]">
                                    <FaUser />
                                </button>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="flex-1 outline-none"
                                    defaultValue={data.last_name}
                                />
                            </div>
                            </div>
                        </div>
                        <button type="submit" className="flex flex-col w-full h-11 max-w-[600px] mx-auto items-center justify-center gap-8 bg-[#F42619] rounded-lg text-white mb-4">
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditAccount;