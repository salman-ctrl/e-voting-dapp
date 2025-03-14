import React from 'react'
import SplitText from "./styling/SplitText";
import PropTypes from 'prop-types';



const Login = (props) => {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <div className=' h-72 justify-center flex items-center gap-y-16 flex-col'>
            <SplitText
                text="Selamat Datang di e-Voting!"
                className="text-4xl font-semibold text-center "
                delay={100}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
            />
            <button className='border-1 border-blue-500 shadow-md text-blue-500 rounded-lg px-10 py-5 hover:text-white hover:bg-blue-500 text-xl cursor-pointer hover:scale-110 duration-500' onClick={props.connectWallet}>Login Metamask</button>
        </div>


    )
}
Login.propTypes = {
    connectWallet: PropTypes.func.isRequired,
};

export default Login
