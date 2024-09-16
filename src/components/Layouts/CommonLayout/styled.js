import styled from 'styled-components'

export const CommonLayoutContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);

    .header {
        width: 100%;
        background: #231f40;
        height: 45px;

        .header-content {
            display: flex;
            width: 90%;
            margin: auto;
            justify-content: space-between;

            .parallelogram {
                width: 600px;
                height: 45px;
                background-color: #f07d22;
                transform: skew(-30deg);
                margin-left: 30px;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .parallelogram span {
                transform: skew(30deg);
                font-size: 15px;
                font-weight: 600;
                color: white
            }

            .contact-icon {
                align-self: center;
                font-size: 20px;
                font-weight: 600;
                color: white;
                display: flex;

                .icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: #f07d22;
                    margin-right: 15px;
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                }
            }

        }


        .contact-icon {

        }
    }

    .nav {
        width: 100%;
        /* height: 90px;
        margin: auto;
        display: flex;
        justify-content: space-between; */
        position: sticky;
        top: 0;
        z-index: 100;
        background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .logo-topder img{
            width: 100%px;
            height: 100%;
            cursor: pointer;
        }

        .list {
            align-self: center;
            display: flex;
            justify-content: space-between;

            span {
                padding: 0 15px;
                font-size: 20px;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
                transform-origin: center bottom;
                border-color: transparent !important;
                box-shadow: none !important;
            }
            
            span:hover {
                color: #ff7a33;
                transform: scale(1.05);
            }
        }

        .user-info {
            align-self: center;
        }
        
        .lo-re {
            font-size: 20px;
            cursor: pointer;
        }

        .login:hover, .register:hover {
            color: #ff7a33;
        }
    }

    .image-container {
        width: 100%;
        height: 350px;
        position: relative;
        display: inline-block;
    }

    .image-container img {
        height: 100%;
        width: 100%;
        opacity: 0.8;
        z-index: 1;
    }

    .image-container .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .text-image-container {
        z-index: 2;
        position: absolute;
        top: 50%;
        padding-left: 30%;
        /* left: 10%; */
        transform: translate(-50%, -50%);
        color: black; 
        font-size: 50px; 
        font-weight: bold; 
        text-align: center;

        .bread {
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
        }

        .bread:hover {
            font-weight: 700;
        }
    }

    .children {
        width: 100%;
    }
`