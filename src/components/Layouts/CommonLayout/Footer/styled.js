import styled from 'styled-components'

export const FooterContainer = styled.div `
    width: 100%;
    display: flex;

    .footer {
        margin-top: 100px;
        width: 100%;
        height: 540px;
        position: relative;
        display: inline-block;

        .image-container {
            background-size: cover;
            background-position: center;
            width: 100%;
            height: 100%;
        }
        
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 50, 0.7);
            z-index: 1;
        }

        .content {
            display: flex;
            padding: 120px 100px 0 100px; 
            position: absolute;
            z-index: 2;
            color: white;
            top: 0%;
            
            .side1 {
                width: 40%;
                .icon {
                    margin-right: 10px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #f57d21;
                    color: white;
                    font-size: 22px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
            }

            .side2 {
                width: 15%;

                .list {
                    cursor: pointer;
                }
            }

            .side3 {
                width: 15%;

                .list {
                    cursor: pointer;
                }
            }

            .side4 {
                width: 35%;
                
                .icon {
                    margin-right: 10px;
                    color: #f57d21;
                    font-size: 20px;
                    font-weight: bold;
                }
            }

            .title {
                width: 100px;
                font-size: 25px;
                font-weight: bold;
                border-bottom: solid 1px #f57d21;
                margin-bottom: 15px;
                margin-top: -10px;
            }

            .list {
                color: #dfdddd;
            }

            .item {
                width: 8px;
                height: 8px;
                background-color: #f57d21;
                margin-right: 10px;
                margin-top: 8px;
            }
        }

        .bottom-footer {
            background-color: #f57d21 !important;
            position: absolute;
            bottom: -20%;
            left: 0;
            width: 100%;
            height: 60px;

            .text {
                width: 80%;
                color: white;
                margin: auto;
                font-size: 20px;
                text-align: center;
                padding-top: 15px;
            }
        }
    }

`