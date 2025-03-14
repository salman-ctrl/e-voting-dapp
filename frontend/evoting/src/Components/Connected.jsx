import React from 'react'

const Connected = (props) => {
    return (
        <div>
            <div className=' h-72 justify-center flex items-center gap-y-5 flex-col'>
                <p className='text-4xl'>Kamu Telah Terkoneksi dengan Metamask!</p>
                <div className='card flex'>
                    <p className='text-xl'>
                        Akun Metamask: {props.address}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Connected
