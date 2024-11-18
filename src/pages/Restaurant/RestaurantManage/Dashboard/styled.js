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

        .data-by-month, .data-by-day, .star{
            border : 1px solid #d5d5d5;
            background-color: white;;
            border-radius: 15px;
            width: 100%;
            height: 180px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        .date-picker {
            padding-left: 20px;
            width: 80%;
            height: 25px;
        }
        .data {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10px;
        }
        .ant-picker {
            height: 30px;
        }
        :where(.css-dev-only-do-not-override-14qglws).ant-picker-outlined:focus-within {
            border-color: #ff9800;
        }
        :where(.css-dev-only-do-not-override-14qglws).ant-picker-outlined:hover {
            border-color: #ff9800;
        }

        .background-count {
            border-radius: 20px;
            font-size: 25px;
            width: 50px;
            border: 1px solid red;
            margin-left: 30px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            margin-top: 6px;
        }

        .income {
            width: 120px !important;
        }
        .order-by-month {
            border-radius: 20px;
            font-size: 25px;
            padding: 5px;
            width: 150px;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 6px;
        }
        .income-by-month {
            border-radius: 20px;
            font-size: 25px;
            padding: 5px;
            width: 150px;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 6px;
        }
        
        .title {
            font-size: 22px;
            font-weight: 600;
            padding: 20px 0 0 20px;
        }
    }

    .dashboard {
        margin-top: 40px;

        .left {
            .ant-statistic {
                display: inline-block;
            }

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