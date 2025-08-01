import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import profile from "../img/profile.png";
import { logout } from "../redux/reducers/auth";
import { removeData } from "../redux/reducers/profile";
import { FaHouse, FaEye, FaUser, FaPencil } from "react-icons/fa6";
import { datasProfile } from "../redux/reducers/profile";

function Account() {
    const [loading, setLoading] = React.useState(true);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const tokens = useSelector((state) => state.auth.token);
    const data = useSelector((state) => state.profile.dataProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {  
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [data]);

    function clearData() {
        dispatch(logout());
        dispatch(removeData());
        navigate("/login");
    }

    if (tokens === null) {
        return <Navigate to="/login" replace />;
    }

    const handleFileChange = async (e) => {
        setLoading(true)
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("first_name", data.first_name || "");
        formData.append("last_name", data.last_name || "");
        formData.append("email", data.email || "");

        try {
            const response = await fetch("https://take-home-test-api.nutech-integrasi.com/profile/image", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${tokens}`,
                },
                body: formData,
            });

            const result = await response.json();
            console.log(result)
            if (result.message && result.message.toLowerCase().includes("update profile image")) {
                dispatch(datasProfile({
                    ...data,
                    profile_image: result.data?.profile_image || data.profile_image
                }));
            
                setMessage(result.message);
            } else {
                setMessage(result.message);
                setLoading(false)
            }
        } catch (err) {
            console.error("Upload Error:", err);
            setMessage(result.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    function handleEditProfile() {
        if (location.pathname !== "/edit-account") {
          setLoading(true);
          setTimeout(() => {
            navigate("/edit-account");
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
                        <div className="flex">
                            <img
                                src={data?.profile_image && data.profile_image.trim() !== "" ? data.profile_image : profile}
                                alt="profile"
                                className="flex w-36 rounded-full"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = profile;
                                }}
                            />
                            <div className="flex items-end">
                                <div
                                    className="border-2 rounded-full p-1 ml-[-30px] cursor-pointer bg-white shadow"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <FaPencil />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="font-semibold text-3xl">{data.first_name} {data.last_name}</div>
                    </div>
                    <form action="" className="flex flex-col w-full">
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
                                    className="flex-1 outline-none"
                                    defaultValue={data.last_name}
                                />
                            </div>
                            </div>
                        </div>
                        <div onClick={handleEditProfile} className="flex flex-col w-full h-11 max-w-[600px] mx-auto items-center justify-center gap-8 bg-[#F42619] rounded-lg text-white mb-4 cursor-pointer">
                            Edit Profile
                        </div>
                        <button onClick={clearData} className="flex flex-col w-full h-11 max-w-[600px] mx-auto items-center justify-center gap-8 border-2 border-[#F42619] rounded-lg text-[#F42619]">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Account;