import styled from 'styled-components'

export const WhishlistContainer = styled.div `
    padding: 20px 40px 0 40px;

    .list-wishlist {
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
            margin: -3px 5px;
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
    }
`