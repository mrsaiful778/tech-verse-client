import React from 'react';
import error from '../../assets/404.gif'
import { Link } from 'react-router-dom';

const Errorpage = () => {
    return (
        <div className='max-w-screen-7xl mx-auto '>
            <div className='text-center'>
                <img className='' src={error} alt="" />
            
            <div>
                <Link to="/">
                <button className='btn btn-accent'> Go to home</button>
                </Link>
            </div>
            </div>
        </div>
    );
};

export default Errorpage;