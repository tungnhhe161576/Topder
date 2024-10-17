import styled from 'styled-components'

export const ProfileContainer = styled.div `
    width: 90%;
    margin: 100px auto;
    border-radius: 10px;
    overflow: hidden;
    
    .left {
        background-color: #ff7c08;
        display: flex;
        flex-direction: column;
        height: 730px;
        
        .avatar {
            align-self: center;
            padding-top: 30px;
            position: relative;
            height: 300px;

            .img-container {
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: solid 5px #fff;
                border-radius: 50%;
                overflow: hidden;
                z-index: 1;

                img {
                    object-fit: cover;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .cam {
                    position: absolute;
                    width: 38px;
                    height: 38px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background-color: #fff;
                    bottom: 140px;
                    right: 35px;
                    z-index: 2;
                    cursor: pointer;
                }

                .cam:hover {
                    background-color: #f2eded;
                }
            }
            .out-image:hover {
                border: none !important;
                color: white !important;
                background-color: #b9b8b8 !important;
            }

            .name {
                text-align: center;
            }
        }

        .menu {
            display: flex;
            flex-direction: column;

            .menu-item {
                display: flex;
                cursor: pointer;
                height: 50px;

                .icon {
                    flex: 1;
                    color: white;
                    font-size: 25px;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-right: 1px solid white;
                    background-color: #ff993e !important;
                }

                .item-name {
                    padding-left: 20px;
                    flex: 5;
                    color: white;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    border-bottom: 1px solid white;
                }
            }

            .menu-item:nth-child(1) {
                border-top: 1px solid white;
            }

            .menu-item:hover {
                .icon {
                    background-color: #FFAF91 !important;
                }
                
                .item-name {
                    background-color: #FFAF75 !important;
                }
            }
            .menu-item.active .icon {
                background-color: #ffaf68 !important;
            }
    
            .menu-item.active .item-name {
                background-color: #ff993e !important;
            }
        }
    }

    .right {
        background-color: #f3f7fb;
        overflow-x: scroll;
        height: 730px;
    }
`