import React, { useState, useEffect } from "react";

let alertHandler;

export const showCustomAlert = (message) => {
    if (alertHandler) {
        alertHandler(message);
    }
};

function CustomAlert() {
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        alertHandler = (msg) => {
            setMessage(msg);
            setVisible(true);
        };
    }, []);

    return (
        visible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] animate-[fadeIn_.3s_ease-in-out]">

                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-2xl">🔔</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Notification
                            </h2>
                            <p className="text-sm text-gray-500">
                                Please review the message below
                            </p>
                        </div>
                    </div>

                    <p className="mb-6 text-gray-700 leading-relaxed">
                        {message}
                    </p>

                    <div className="flex justify-end">
                        <button
                            onClick={() => setVisible(false)}
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default CustomAlert;