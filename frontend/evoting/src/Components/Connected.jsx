import React from 'react'

const Connected = (props) => {
    return (
        <div>
            <div className=' h-72 justify-center flex items-center gap-y-5 flex-col'>
                <p className='text-4xl'>Kamu Telah Terkoneksi dengan Metamask!</p>
                <div className='card flex flex-col items-center gap-y-3'>
                    <p className='text-xl'>
                        Akun Metamask: {props.address}
                    </p>
                    <p className='text-xl'>
                        Sisa Waktu: {props.remainingTime}
                    </p>

                </div>
                <div className='flex-col flex gap-y-7'>
                    {props.showButton ? (

                        <p className='text-xl'>
                            Kamu telah melakukan voting: {props.address}
                        </p>
                    ) : (
                        <div>
                            <input type="number" className='outline-none border-blue-500 border-1 px-5 py-2 rounded-md focus:shadow-lg' placeholder='Masukan nomor kandidat' value={props.number} onChange={props.handleNumberChange} name="" id="" />
                            <button className='px-5 py-5 ml-10 rounded-md bg-blue-500 text-white text-2xl' onClick={props.voteFunction}>Vote </button>
                        </div>
                    )}

                </div>
            </div>
            <div className="overflow-x-auto mt-12">
                <table className="w-full border border-gray-300 table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-2xl border border-gray-300 p-2 text-center">Nomor</th>
                            <th className="text-2xl border border-gray-300 p-2 text-center">Nama Kandidat</th>
                            <th className="text-2xl border border-gray-300 p-2 text-center">Jumlah Vote</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.candidate.map((candidates, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 p-2 text-center">{candidates.name}</td>
                                <td className="border border-gray-300 p-2 text-center">{candidates.voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Connected
