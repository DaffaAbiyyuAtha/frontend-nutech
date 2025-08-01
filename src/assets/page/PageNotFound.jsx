import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    
    return (
        <div className="flex w-full flex-col h-screen gap-8 items-center justify-center">
            <div className="text-xl font-semibold">404 Page Not Found</div>
            <Link to="/home" className="">Back To Home</Link>
        </div>
    )
}

export default PageNotFound