import React from 'react'
import { Col } from 'antd'
import { IoStorefront } from "react-icons/io5";
import { IconContext } from 'react-icons/lib';
import { useNavigate } from 'react-router-dom';


const LeftSide = () => {
    const nav = useNavigate()

    return (
        <Col span={12} className='left-side'>
            <IconContext.Provider value={{ color: "white", size: "3em" }}>
                <IoStorefront className='ml-20 mt-10' style={{cursor: 'pointer'}}  onClick={() => { nav('/') }}/>
            </IconContext.Provider>
            <h2>TOPDER</h2>
            <img src='/login.webp' alt='error' className='login-img' />
        </Col>
    )
}

export default LeftSide