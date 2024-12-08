"use client"
import { useEffect, useState } from "react";
import { auth, getUserData, logout } from "../_lib/firebase";

export default function RideFiApp() {
    const [activeTab, setActiveTab] = useState(0);
    const [logs, setLogs] = useState([]);

    const [user, setUser] = useState()


    useEffect(() => {
        if (auth?.currentUser) {
            getUserData(auth.currentUser.uid).then((user) => {
                console.log(user)
                setUser(user);
            });
            fetch("https://base-sepolia.blockscout.com/api/v2/addresses/0xb4c74D97C78919151829ea2FC745609f8315Cd47/logs").then(async (val) => {
                const data = await val.json();
                console.log(data.items.filter((val) => val.decoded.method_id === "75e269e1"))
                setLogs(data.items.filter((val) => val.decoded.method_id === "75e269e1"));
            })


        }
    }, [auth, auth?.currentUser]);


    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-center gap-5 w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-center text-xl font-semibold shadow-lg">
                <img src="/logo.png" className="w-10 h-10" />
                RideFi
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full pt-4 px-6">
                {/* QR Code Tab */}
                {activeTab === 0 && (
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl">
                            <h2 className="text-lg mb-2 font-semibold text-gray-800"> User: {user?.name}</h2>
                            <img
                                src={"https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=" + user?.uid}
                                alt="QR Code"
                                className="w-48 h-48 object-cover rounded-md shadow"
                            />
                            <p className="mt-4 text-lg max-w-[200px] font-medium text-gray-700 text-center">
                                Scan this QR code for Limitless Rides!
                            </p>
                        </div>
                    </div>
                )}

                {/* Details & Transactions Tab */}
                {activeTab === 1 && (
                    <div className="space-y-6">
                        {/* User Info */}
                        <div className="p-6 bg-gradient-to-r from-cyan-100 to-white shadow-lg rounded-2xl flex items-center space-x-4">
                            <div className="w-16 h-16 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                                {user?.name[0]}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {user?.name}
                                </h2>
                                <p className="text-gray-600 text-sm">{user?.email}</p>
                            </div>
                            <svg onClick={async () => {
                                await logout();
                                window.location.href = "/login";
                            }} xmlns="http://www.w3.org/2000/svg" fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1" viewBox="0 0 490.3 490.3">
                                <g>
                                    <g>
                                        <path d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3    s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6    c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1    C27.9,58.95,0,86.75,0,121.05z" />
                                        <path d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9    c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63    C380.6,325.15,380.6,332.95,385.4,337.65z" />
                                    </g>
                                </g>
                            </svg>
                        </div>

                        {/* Recent Transactions */}
                        <div className="p-6 bg-white shadow-lg rounded-2xl">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                Recent Transactions
                            </h2>
                            <ul className="space-y-4">
                                {logs.map((val, index) => (<li key={index} className="flex justify-between items-center border-b pb-2 text-gray-600">
                                    <span>Ride {val.decoded.parameters[1].value} mils</span>
                                    <span className="font-medium text-green-500">- ${val.decoded.parameters[2].value}</span>
                                </li>))}
                            </ul>
                            <button className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg shadow hover:bg-cyan-600 transition-all w-full">
                                View All Transactions
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Tab Navigation */}
            <nav className="w-full bg-white shadow fixed bottom-0 flex justify-around items-center py-4">
                <button
                    onClick={() => setActiveTab(0)}
                    className={`text-sm font-medium flex flex-col items-center ${activeTab === 0 ? "text-teal-500" : "text-gray-400"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 9V7a4 4 0 10-8 0v2m-2 4v5a2 2 0 002 2h8a2 2 0 002-2v-5m-5 0h.01"
                        />
                    </svg>
                    QR Code
                </button>
                <button
                    onClick={() => setActiveTab(1)}
                    className={`text-sm font-medium flex flex-col items-center ${activeTab === 1 ? "text-teal-500" : "text-gray-400"
                        }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mb-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    Profile
                </button>
            </nav>
        </div>
    );
}
