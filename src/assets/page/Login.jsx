import React, { useEffect } from "react";
import login from "../img/login.png"
import logo from "../img/Logo.png"
import { FaHouse, FaEye, FaLock } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login as loginAction } from "../redux/reducers/auth"
import { datasProfile } from "../redux/reducers/profile";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const [pass, setPassword] = React.useState("password");
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(location.state?.message || false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    function handleSignUp() {
        if (location.pathname !== "/registration") {
          setLoading(true);
          setTimeout(() => {
            navigate("/registration");
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

    function stopLoadingWithDelay() {
        setTimeout(() => setLoading(false), 2000);
    }

    function processLogin(e) {
        e.preventDefault();
        setLoading(true);
    
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        const payload = { email, password };
    
        fetch("https://take-home-test-api.nutech-integrasi.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        .then((res) => res.json())
        .then((data) => {
        console.log("API Response:", data);

        if (data.status === 0 || data.success === true) {
            dispatch(loginAction(data.data.token));

            fetch("https://take-home-test-api.nutech-integrasi.com/profile", {
            headers: { Authorization: `Bearer ${data.data.token}` },
            })
            .then((res) => res.json())
            .then((profileData) => {
                dispatch(datasProfile(profileData.data));
                navigate("/home");
                setMessage(data.message)
                stopLoadingWithDelay(false);
            });
        } else {
            setMessage(data.message)
        }
        })
        .catch((err) => console.error("Login Error:", err));
        stopLoadingWithDelay(false);
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
                    <div className="flex flex-col h-screen justify-center items-center">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="logo" className="w-6"/>
                            <div className="font-semibold text-xl">SIMS PPOP</div>
                        </div>
                        <div className="text-center font-semibold text-2xl mb-6">Masuk atau buat akun<br />untuk memulai</div>
                        <div className="w-full px-8">
                            <form onSubmit={processLogin} action="">
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-4">
                                    <button
                                        type="button"
                                        className="text-[#E2E2E2]"
                                    >
                                        <FaHouse />
                                    </button>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="flex-1 outline-none"
                                        placeholder="masukan email anda"
                                    />
                                </div>
                                <div className="flex w-full items-center rounded-lg h-11 p-4 overflow-hidden border-2 border-[#E2E2E2] gap-3 mb-6">
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
                                        placeholder="masukkan password anda"
                                    />
                                    <button
                                        type="button"
                                        onClick={changePassword}
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
                                            Masuk
                                    </button>
                                </div>
                                <div className="text-[#A7A7A7] font-semibold text-center text-xs">
                                    belum punya akun? registrasi <Link className="text-[#F42619]" onClick={handleSignUp}>di sini</Link>
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

export default Login;