import React from "react";

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    
    return (
        <div className="d-grid">
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
          </div>
    )
};

export default Main;