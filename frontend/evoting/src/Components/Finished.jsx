import React from 'react';
import { CheckCircle } from 'lucide-react';

const Finished = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center flex flex-col items-center gap-5">
                {/* Icon dengan animasi */}
                <CheckCircle className="w-20 h-20 text-green-500 animate-bounce" />

                {/* Teks utama */}
                <p className="text-3xl font-semibold text-gray-800">
                    Kamu Telah Melakukan Voting!
                </p>
            </div>
        </div>
    );
};

export default Finished;
