import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const ClientContext = createContext()

const ClientProvider = ({ children }) => {
    const [client, setClient] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const clientInfo = JSON.parse(localStorage.getItem("userInfo"));
        setClient(clientInfo);

        if (!clientInfo) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <ClientContext.Provider value={{ client, setClient }}>
            {children}
        </ClientContext.Provider>
    )
};

export const ClientState = () => {
    return useContext(ClientContext);
}

export default ClientProvider;