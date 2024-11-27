import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Byma Fondos</h1>
            <div>
                <button 
                    onClick={() => navigate("/especies")} 
                >
                    Especies
                </button>
                <button>
                    Acdis
                </button>
                <button>
                    Gerentes
                </button>
            </div>
        </div>
    );
}

export default Home;
