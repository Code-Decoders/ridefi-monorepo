"use client"

import { getUserData } from "@/app/_lib/firebase";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useParams } from 'next/navigation'


export default function MetroStationScanner() {
    const params = useParams()
    const [user, setUser] = useState(null);
    const [lastData, setData] = useState(null);

    // Play a sound on successful scan
    const playSound = () => {
        console.log("Playing sound");
        const audio = new Audio("/success.mp3"); // Replace with your sound file
        audio.play();
    };

    const handleScan = (data) => {
        if (data !== lastData) {
            setData(data)
            if (lastData)
                playSound();
            getUserData(data).then((user) => {
                setUser(user);
                handleAction(user);
            })
            setTimeout(() => {
                setUser(null);
                setData(null);
            }, 3000);
        }
    };

    const handleAction = async (user) => {
        if (params.id == "1") {
            await fetch("/api", {
                method: "POST",
                body: JSON.stringify({
                    walletId: user.walletId,
                    seed: user.seed,
                    method: "startTrip"
                })
            })
        }
        else {
            await fetch("/api", {
                method: "POST",
                body: JSON.stringify({
                    walletId: user.walletId,
                    seed: user.seed,
                    method: "endTrip",
                    endPosition: 3
                })
            });
        }
    }

    const handleError = (err) => {
        console.info(err.message);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* Scanner Area */}
            {!user ? (
                <div className="flex flex-col items-center space-y-6">
                    <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-lg relative">
                        <div className="absolute inset-0 border-4 border-dashed border-teal-500 rounded-lg animate-pulse"></div>
                        <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    handleScan(result.text);
                                }
                                if (!!error) {
                                    handleError(error);
                                }
                            }}

                            scanDelay={500}
                            constraints={{
                                facingMode: "user" || "environment",
                                width: 640, // Add default width
                                height: 480, // Add default height
                            }}
                            containerStyle={{
                                width: "100%",
                                height: "auto",
                            }}
                            className="rounded-lg"
                        />
                    </div>
                    {(
                        <p className="text-sm">Scan the QR code</p>
                    )}
                </div>
            ) : (
                // Welcome Message After Scan
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center animate-ping">
                        <div className="w-24 h-24 rounded-full bg-green-500"></div>
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-gray-800">
                        Welcome, {user?.name}!
                    </h2>
                    <p className="text-gray-500 mt-2">Have a safe journey!</p>
                </div>
            )}
        </div>
    );
}
