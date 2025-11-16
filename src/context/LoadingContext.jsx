// src/context/LoadingContext.jsx
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";
import { View, Modal } from "react-native";
import LoadingSpinner from "../components/common/LoadingSpinner";

const LoadingContext = createContext();

export const useLoading = () => {
    const ctx = useContext(LoadingContext);
    if (!ctx) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return ctx;
};

export const LoadingProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("Loading...");

    const showLoading = useCallback((msg) => {
        setMessage(msg || "Loading...");
        setVisible(true);
    }, []);

    const hideLoading = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {children}

            {/* Overlay */}
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                statusBarTranslucent
            >
                <View className="flex-1 items-center justify-center bg-black/40">
                    <View className="bg-slate-900 rounded-2xl px-6 py-5">
                        <LoadingSpinner text={message} size="md" />
                    </View>
                </View>
            </Modal>
        </LoadingContext.Provider>
    );
};
