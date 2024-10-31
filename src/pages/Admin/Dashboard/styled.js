import styled from 'styled-components'

export const DashboardContainer = styled.div `
    width: 100%;

    .part1 {
        Button {
            border: none;
            width: 100px;
            height: 35px;
        }
        Button:last-child {
            background-color: rgb(31, 59, 179) !important;
        }
        .overview {
            width: 100px;
            height: 45px;
            border-right: 1px solid #c5ced9;
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgb(31, 59, 179);
        }

        .background-count {
            background-color: #fff;
            border-radius: 20px;
            font-size: 25px;
            padding: 5px;
            width: 35px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            margin-top: 6px;
        }
        .total-restaurant .background-count {
            background-color: #f4f5f7;
            color: red;
            border: solid 1px red;
        }
        .contact .background-count {
            color: #0dcaf0;
        }
        .total-order .background-count {
            background-color: #fff2d6;
        }
        .total-user .background-count {
            background-color: #cbf0ee;
        }
        .total-blog .background-count {
            background-color: #8bc34a;
        }
        .title {
            font-size: 22px;
            font-weight: 600;
        }
    }

    .dashboard {
        margin-top: 40px;

        .left {
            .chart1 {
                border-radius: 10px;
                padding: 15px 25px;
                background-color: #fff;
            }
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: #c5ced9 1px solid;
                height: 80px;
            }
            .ant-select-selector {
                border: none !important; 
                box-shadow: none !important;
                background-color: #f1f1f1;
                font-size: 18px;
            }
            .ant-select-selector:hover {
                border-color: transparent !important;
            }
            .ant-select-focused .ant-select-selector {
                border-color: transparent !important;
                box-shadow: none !important; 
            }
            .ant-select-dropdown {
                box-shadow: none !important; 
            }
        }

        .right {
            .border {
                background: #fff;
                border-radius: 10px;
                width: 100%;

                .added {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 25px;
                    height: 25px;
                    background-color: rgb(31, 59, 179);
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                }
            }
            .wait, .accept, .process, .done, .cancel {
                border-bottom: 1px solid #c5ced9;
                padding-left: 15px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .cancel {
                border: none;
            }
            .click-to-view {
                cursor: pointer;
                color: #4d4d4d;
            }
            .click-to-view:hover {
                color: #ff9800 !important;
            }
        }
    }

`