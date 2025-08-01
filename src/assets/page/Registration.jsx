import React, { useEffect } from "react";
import login from "../img/login.png"
import logo from "../img/Logo.png"
import { FaHouse, FaEye, FaLock, FaUser } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Registration() {
    const [pass, setPassword] = React.useState("password");
    const [confPass, setConfPassword] = React.useState("password");
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    function handleLogin() {
        if (location.pathname !== "/login") {
          setLoading(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }

    function changePassword() {
        if (pass === "password") {
            setPassword("text");
        } else {
            setPassword("password");
        }
    }
    function changeConfPassword() {
        if (confPass === "password") {
            setConfPassword("text");
        } else {
            setConfPassword("password");
        }
    }

    function processRegistration(e) {
        e.preventDefault();
        setLoading(true);
    
        const email = e.target.email.value;
        const first_name = e.target.firstName.value;
        const last_name = e.target.lastName.value;
        const password = e.target.password.value;
        const confPass = e.target.confpassword.value;
    
        if (password !== confPass) {
            setTimeout(() => {
                setMessage("Konfirmasi password tidak cocok!");
                setLoading(false);
            }, 3000);
            return;
        }
    
        const payload = { email, first_name, last_name, password };
    
        setTimeout(() => {
            fetch("https://take-home-test-api.nutech-integrasi.com/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
    
                if (data.status === 0 || data.success === true) {
                    navigate("/login");
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

    return (
        <>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="h-screen flex w-full">
                <div className="w-1/2">
                    <div className="flex flex-col h-full justify-center items-center">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="logo" className="w-6"/>
                            <div className="font-semibold text-xl">SIMS PPOP</div>
                        </div>
                        <div className="text-center font-semibold text-2xl mb-6">Lengkapi data untuk<br />membuat akun</div>
                        <div className="w-full px-8">
                            <form onSubmit={processRegistration}>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaHouse />
                                    </button>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="flex-1 outline-none"
                                        placeholder="masukan email anda"
                                    />
                                </div>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaUser />
                                    </button>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className="flex-1 outline-none"
                                        placeholder="nama depan"
                                    />
                                </div>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaUser />
                                    </button>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="flex-1 outline-none"
                                        placeholder="nama belakang"
                                    />
                                </div>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaLock />
                                    </button>
                                    <input
                                        type={pass}
                                        name="password"
                                        id="password"
                                        className="flex-1 outline-none"
                                        placeholder="buat password"
                                    />
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                        onClick={changePassword}
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-6">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaLock />
                                    </button>
                                    <input
                                        type={confPass}
                                        name="confpassword"
                                        id="confpassword"
                                        className="flex-1 outline-none"
                                        placeholder="konfirmasi password"
                                    />
                                    <button
                                        type="button"
                                        onClick={changeConfPassword}
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaEye />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <button 
                                        type="submit"
                                        className="bg-[#F42619] w-full h-11 rounded-lg text-white"
                                        >
                                            Regristasi
                                    </button>
                                </div>
                                <div className="text-[#A7A7A7] font-semibold text-center text-xs">
                                    sudah punya akun? login <Link onClick={handleLogin} className="text-[#F42619]">di sini</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    {message && (
                        <div className="px-4">
                            <div
                                className={`flex items-center justify-center bg-[#FFF5F3] w-full mt-[-70px] rounded-lg transition-opacity duration-500 ease-in-out ${
                                message.success === false ? "bg-[#33BEC5]" : "bg-[#FFF5F3]"
                                } text-[#FF5630]`}
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </div>
                <img src={login} className="w-1/2 h-full object-cover" alt="Login">
                </img>
            </div>
        </>
    )
}

export default Registration;