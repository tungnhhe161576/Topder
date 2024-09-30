import styled from 'styled-components'

export const HistoryContainer = styled.div `
    padding: 20px 60px 0 40px;

    .table {
        height: 360px;
        border-radius: 10px;
        overflow: hidden;
    }

    .order-table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
    }

    .order-table th, .order-table td {
        padding: 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    .order-table th {
        background-color: #ff7f0e;
        color: white;
        font-weight: bold;
        font-size: 18px;
    }

    .order-table td {
        background-color: #fff;
    }

    .order-table td .phone-number {
        background-color: #ff7f0e;
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
    }

    .order-table td .status {
        padding: 5px 10px;
        border-radius: 15px;
        color: white;
    }

    .status.pending {
        background-color: #6c757d;
    }

    .status.accepted {
        background-color: #007bff;
    }

    .status.completed {
        background-color: #28a745;
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

    .pagination {
        display: flex;
        justify-content: left;
        margin-top: 20px;
    }
    
    .custom-pagination .ant-pagination-item {
        border: 1px solid #d9d9d9;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        margin: 0 5px;
    }

    .custom-pagination .ant-pagination-item-active {
        background-color: #fa8c16;
        border-color: #fa8c16;
        color: white;
    }

    .custom-pagination .ant-pagination-item a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-weight: bold;
    }

    .custom-pagination .ant-pagination-item-active a {
        color: white;
    }

    .custom-pagination .ant-pagination-prev,
    .custom-pagination .ant-pagination-next {
        border: none;
    }

    .custom-pagination .ant-pagination-prev:hover,
    .custom-pagination .ant-pagination-next:hover {
        color: #fa8c16;
    }

    .custom-pagination .ant-pagination-prev .anticon,
    .custom-pagination .ant-pagination-next .anticon {
        font-size: 16px;
    }

    .custom-pagination .ant-pagination-prev,
    .custom-pagination .ant-pagination-next {
        padding: 0 10px;
    }


    .form-order-detail  {
        background-color: #fff;
        border-radius: 10px;
        width: 100%;
        height: 550px;

        .return-button {
            margin: 30px 0 0 20px;
            height: 40px;
            width: 100px;
            border: none;
        }

        .return-button:hover {
            background-color: #d87735;
            color: white;
        }

        .step-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #4caf50;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        :where(.css-dev-only-do-not-override-14i19y2).ant-steps .ant-steps-item-finish>.ant-steps-item-container>.ant-steps-item-tail::after {
            background-color: #28a745 !important;
            height: 3px;
        }
        :where(.css-dev-only-do-not-override-14i19y2).ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-tail::after {
            background-color: gray !important;
            height: 3px;
        }
        :where(.css-dev-only-do-not-override-14i19y2).ant-steps .ant-steps-item-wait>.ant-steps-item-container>.ant-steps-item-tail::after {
            background-color: gray !important;
            height: 3px;
        }
        
        :where(.css-dev-only-do-not-override-14i19y2).ant-steps.ant-steps-label-vertical .ant-steps-item-tail {
            padding: 0 !important;
            /* margin: 0 !important; */
        }

        .ant-steps-item-wait .step-icon {
            background-color: gray !important ;
        }

        .info {
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
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