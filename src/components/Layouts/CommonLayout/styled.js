import styled from "styled-components";

export const CommonLayoutContainer = styled.div`
    width: 100%;
    background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=League+Gothic&display=swap');

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
                color: white;
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
        position: sticky;
        top: 0;
        z-index: 100;
        background: linear-gradient(to right, #fff6ee 0%, white 50%, #fff6ee 100%);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .logo-topder img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .list {
            display: flex;
            justify-content: space-evenly;

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

        .login:hover,
        .register:hover {
            color: #ff7a33;
        }
    }

    & .carousel{
        --w-column: 200px;
        background-color: #232442;
        color: #fff;
        font-family: Poppins;
        background-image: radial-gradient(
            #2b2e4f, #111126
        );
        height: calc(100vh - 150px);
        overflow: hidden;
        position: relative;
        & .list{
            width: min(1500px, 90vw);
            margin: auto;
            height: 100%;
            position: relative;
            & .item{
                position: absolute;
                inset: 0;
                & figure{
                    position: absolute;
                    width: 65%;
                    top: 47%;
                    left: 10%;
                    transform: translateY(-50%);
                    & img{
                        width: 75%;
                        transform: rotate(-20deg);
                    }
                    &::before{
                        content: '';
                        position: absolute;
                        background-color: #0b0b1b;
                        width: 100%;
                        height: 100px;
                        top: 150%;
                        left: 50px;
                        border-radius: 50%;
                        filter: blur(50px);
                    }
                }
                
                & .content{
                    position: absolute;
                    z-index: 2;
                    width: 70%;
                    height: 100%;
                    right: var(--w-column);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: end;
                    & .category{
                        font-weight: 500;
                        cursor: pointer;
                    }
                    & h2{
                        font-family: 'League Gothic';
                        font-size: 6em;
                        line-height: 1em;
                    }
                    p {
                        font-size: 1.1em;
                    }
                    & .description{
                        align-items: center;
                        color: #fff8;
                        max-width: 400px;
                        font-size: small;
                        text-align: right;
                        & i{
                            height: 50px;
                            color: #ffea7c;
                            font-size: 2em;
                            border: 1px solid #659cdf;
                            border-radius: 50%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }
                & .more{
                    display: grid;
                    grid-template-columns: repeat(2, 120px);
                    gap: 20px;
                    grid-template-rows: 35px;
                    & button{
                        border-radius: 30px;
                        font-family: 'League Gothic';
                        text-transform: uppercase;
                        color: #fff;
                        background-color: transparent;
                        border: none;
                        position: relative;
                        cursor: pointer;
                        &:nth-child(1){
                            background-image: linear-gradient(
                                to right, #81baa0, #46a39c
                            );
                        }
                        &:nth-child(2){
                            border: 2px solid transparent;
                            background: linear-gradient(#242745, #242745) padding-box,
                            linear-gradient(to right, #81baa0, #46a39c) border-box;
                            & i{
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
            &::after{
                content: '';
                position: absolute;
                right: var(--w-column);
                width: var(--w-column);
                height: 100%;
                border-left: 1px solid #324073;
                border-right: 1px solid #324073;
                pointer-events: none;
            }
            &::before{
                content: '';
                position: absolute;
                z-index: 1;
                height: var(--w-column);
                width: 100%;
                top: 52%;
                border-top: 1px solid #324073;
                border-bottom: 1px solid #324073;
                pointer-events: none;
            }
        }
    & .arrows{
        width: min(1500px, 90vw);
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -25px);
        pointer-events: none;
        z-index: 2;
        & button{
            top: 60%;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #659cdf55;
            background-color: #232442;
            color: #fff7;
            font-size: large;
            cursor: pointer;
            pointer-events: auto;
            transition: 0.5s;
            &:hover{
                border: 1px solid #659cdf;
                color: #fff;
            }
        }
    }
    & .indicators{
        position: absolute;
        top: 52%;
        height: var(--w-column);
        width: min(1200px, 90vw);
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        pointer-events: none;
        justify-content: end;
        gap: 10px;
        & .number{
            font-family: 'League Gothic';
            font-size: 7vw;
        }
        & ul{
            display: flex;
            gap: 10px;
            & li{
                width: 50px;
                height: 5px;
                background-color: #659cdf;
                border-radius: 10px;
                pointer-events: auto;
                cursor: pointer;
                transition: 0.5s;
                &.active{
                    background-color: yellow;
                }
            }
            }
        }
    }

    .carousel{
        --calculation: 1;
        & .list{
            & .item{
                transform: translateX(calc(100vw * var(--calculation)));
                transition:  0.5s;
                opacity: 0;
                & figure{
                    & img{
                        transform: rotate(0deg);
                        transition: transform 0.5s;
                        transition-delay: 0.3s;
                    }
                }
                & .content{
                    & .category, h2, .description, .more{
                        transform: translateX(calc(200px * var(--calculation)));
                        transition:  0.7s;
                        opacity: 0;
                        transition-delay: 0.3s;
                    }
                    & h2{ transition-delay: 0.5s; }
                    & .description{ transition-delay: 0.7s; }
                    & .more{ transition-delay: 0.9s; }
                }
                &.active{
                    opacity: 1;
                    transform: translateX(0);
                    & figure{
                        & img{
                            transform: rotate(-20deg);
                        }
                    }
                    & .content{
                        & .category, h2, .description, .more{
                            transform: translateX(0px);
                            opacity: 1;
                        }
                    }
                }
                &.activeOld{
                    transform: translateX(calc(-100vw * var(--calculation)));
                }
            }
        }
    }

    @media screen and (max-width: 1023px) and (min-width: 768px){
        :root{
            --w-column: 100px;
        }
        body{
            & .carousel{
                height: 60vh;
                & .list{
                    & .item{
                        & .content{
                            & h2{
                                font-size: 5em;
                            }
                        }
                    }
                }
            }
        }
    }
    @media screen and (max-width: 767px){
        :root{
            --w-column: 50px;
        }
        body{
            & .carousel{
                height: 100vh;
                & .list{
                    & .item{
                        & .content{
                            justify-content: end;
                            padding-bottom: 100px;
                            & h2{
                                font-size: 5em;
                            }
                        }
                        & figure{
                            width: 110%;
                            transform: translateY(0);
                            top: 200px;
                            left: -30px;
                        }
                    }
                }
                & .indicators{
                    & .number{
                        font-size: 10em;
                        transform: translateX(50px);
                        opacity: 0.5;
                    }
                }
            }
        }
    }

    .children {
        width: 100%;
    }
`;
