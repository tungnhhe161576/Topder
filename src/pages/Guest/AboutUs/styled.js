import styled from 'styled-components'

export const AboutUsContainer = styled.div`
    width: 100%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    .session1 {
        width: 90%;
        margin-top: 30px;
        flex: 1;
        display: flex;

        .session1-left {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center; 

            .content {
                width: 68%;
                height: 80%;
                background-color: white;
                border-top-right-radius: 20%;
                border-bottom-right-radius: 20%;
                overflow: hidden; 
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }

            .content img {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                object-fit: cover;
            }
        }
        
        .session1-right {
            flex: 1;

            .check {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ffeedf;
            }

            .check img {
                width: 40px;
                height: 40px;
            }
        }
    }

    .session2 {
        flex: 1;
        display: flex;

        .background {
            background-repeat: no-repeat;
            background-size: 100% auto;
            width: 100%; 
            height: 500px;
            justify-content: center;

            .vision {
                background: #231f40;
                height: 100px;
                width: 700px;
                border-radius: 10px;
                border: 1px solid white;
                margin-left: 100px;
                display: flex;
                align-items: center;
                padding-left: 30px;

                .icon {
                    width: 50px;
                    height: 50px;
                    transform: rotate(45deg);
                    background: #f57d21;
                    border-radius: 7px;
                    flex-shrink: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .vision:nth-child(2) {
                margin-left: 180px;
            }
        }

    }

    .session3 {
        flex: 1;
        width: 90%;
        margin: 50px auto;
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;

        .left {
            flex:  2;
        }

        .left-side-session3 {
            .item {
                display: flex;
                flex-wrap: wrap;
            }

            .child-item {
                display: flex;

                .round-icon {
                    align-self: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #f57d21;
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .content {
                    width: 400px;
                    background: #f1f0fa;
                    border-left: solid 2px #f57d21;
                    border-radius: 10px;
                    margin-left: -20px;
                    z-index: 1;
                    transform: skew(-15deg);
                }
            }
        }

        .right-side-session3 {
            flex: 1;

            img {
                width: 120%;
                height: 120%;
                object-fit: cover;
                z-index: 2;
                margin-left: -150px;
                margin-top: -60px;
            }
        }
    }
`