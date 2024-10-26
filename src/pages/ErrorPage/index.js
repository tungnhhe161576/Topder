import React from 'react'
// import { useRouteError } from "react-router-dom";


const ErrorPage = () => {
    // const error = useRouteError();
    // console.error(error);

    return (
        <div className='d-flex flex-column mt-20 ml-30'>
            <h1>Oops!</h1>
            <p className=''>Sorry, an unexpected error has occurred.</p>
            <p>
                {/* <i>{error.statusText || error.message}</i> */}
            </p>
        </div>
    )
}

export default ErrorPage