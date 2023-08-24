import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        setAdmin(adminInfo);

        if (!adminInfo) {
            navigate("/admin");
        }
    }, [navigate]);

    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
};

export const AdminState = () => {
    return useContext(AdminContext);
}

export default AdminProvider;