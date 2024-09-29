import styled from 'styled-components'

export const RestaurantLayoutContainer = styled.div `
    width: 100%;
    height: 100vh;
    background-color: #f4f5f7;

    .header {
        height: 60px;
        padding: 20px 30px 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .logo {
            width: 150px;

            img {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
        }

        .options {
            display: flex;
            align-items: center;
            font-size: 22px;
            .item {
                margin-right: 20px;
                cursor: pointer;
            }
            .item:hover {
                color: #f07d22;
            }
        }
    }

    .body-layout {
        display: flex;
        
        .left-side {
            width: 15%;
            display: flex;
            flex-direction: column;

            .item {
                cursor: pointer;
                display: flex;
                height: 50px;
                align-items: center;
                
                .item-icon {
                    padding-left: 40px;
                }

                .item-name {
                    margin-left: 15px;
                }
            }

            .item:hover {
                color: #1f3bb3;
                background-color: #FFFFF4;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                font-weight: bold;
                font-size: 15px;
            }

            .active {
                background-color: #fff;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                color: #1f3bb3;
                font-size: 16px;
                font-weight: bold;
            }
        }
    
        .children {
            margin-left: 50px;
            width: 75%;
        }
    }
`