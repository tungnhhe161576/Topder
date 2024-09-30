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
        .order-success .background-count {
            background-color: #cbf0ee;
        }
        .vote .background-count {
            background-color: #f5d3a1;
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
            .select {
                border: none;
                width: 120px;
                background: #f1f1f1;
            }
            .select:hover {
                border: none
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
            .wait, .accept, .process, .done {
                border-bottom: 1px solid #c5ced9;
                padding-left: 15px;
                height: 70px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .cancel {
                height: 70px;
                padding-left: 15px;
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