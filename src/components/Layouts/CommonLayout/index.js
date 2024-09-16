import React from 'react'
import { CommonLayoutContainer } from './styled'
import Header from './Header'


const CommonLayout = ( {children} ) => {
    return (
        <CommonLayoutContainer>
            <Header/>

            <div className='children'>
                {children}
            </div>
        </CommonLayoutContainer>
    )
}

export default CommonLayout