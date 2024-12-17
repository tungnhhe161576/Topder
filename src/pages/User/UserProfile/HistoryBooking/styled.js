import styled from 'styled-components'

export const HistoryContainer = styled.div `
    padding: 20px 60px 0 40px;

    .status {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border-radius: 25px;
        color: white;
        font-weight: 500;
    }
    .status.pending {
        background-color: #4bac4f;
    }
    .status.confirm {
        background-color: #1677ff;
    }
    .status.paid {
        width: 120px;
        background-color: #fc6536;
    }
    .status.complete {
        background-color: #00bcd4;
    }
    .status.cancel {
        background-color: #9e9e9e;
    }

    .btn.payment {
        background-color: #4caf50;
        color: white;
    }
    .btn.payment:hover {
        background-color: #8bc34a;
    }


    :where(.css-dev-only-do-not-override-14qglws).ant-table-wrapper table {
        text-align: center;
    }
    :where(.css-dev-only-do-not-override-14qglws).ant-table-wrapper .ant-table-thead >tr>th {
        text-align: center;
        background-color: #ff7f0e;
    }
    .ant-table {
        border: none;
    }


    .table {
        border-radius: 10px;
        overflow: hidden;
    }
    .order-table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
    }
    .order-table th, .order-table td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    .order-table th {
        background-color: #ff7f0e;
        color: white;
        font-weight: bold;
        font-size: 14px;
    }
    .order-table td {
        background-color: #fff;
        font-size: 12px;
    }
    .btn {
        padding: 5px 10px;
        border: none;
        border-radius: 15px;
        cursor: pointer;
        margin-right: 5px;
    }
    .detail-btn {
        background-color: #ff7f0e;
        color: white;
    }
    .detail-btn:hover {
        background-color: #d87735;
    }
    .cancel-btn {
        background-color: #6c757d;
        color: white;
    }
    .cancel-btn:hover {
        background-color: #4f5152;
    }
    .qr-btn {
        background-color: #8bc34a;
    }
    .qr-btn:hover {
        background-color:rgb(149, 228, 59);
    }



    .form-order-detail  {
        background-color: #fff;
        border-radius: 10px;
        width: 100%;
        height: 550px;

        .return-button {
            background-color: #fa8c16;
            color: #fff;
            margin: 20px 0 0 10px;
            height: 30px;
            width: 100px;
            border: none;
        }

        .return-button:hover {
            background-color: #ff7f0e !important;
            color: #fff !important;
        }

        .return-button:hover {
            background-color: #d87735;
            color: white;
        }

        .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #4bac4f;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        :where(.css-dev-only-do-not-override-14qglws).ant-steps.ant-steps-label-vertical .ant-steps-item-tail {
            padding: 0;
        }

        :where(.css-dev-only-do-not-override-14qglws).ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail::after {
            background-color: #4bac4f;
            height: 3px;
        }

        .ant-steps-item-wait .step-icon {
            background-color: gray !important ;
        }

        .info {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            margin-left: 50px;
        }

        table tr th {
            border-left: 1px solid #ddd;
            text-align: center;
        }
        table tr td {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            text-align: center;
        }

        table th:first-child {
            width: 150px;
        }
        table th:nth-child(2) {
            width: 100px;
        }
        table th:nth-child(3) {
            width: 120px;
        }
        table th:nth-child(4){
            width: 120px;
        }
    }
`