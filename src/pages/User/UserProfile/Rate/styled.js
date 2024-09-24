import styled from 'styled-components'

export const RateContainer = styled.div `
    padding: 20px 60px 0 40px;
    
    .title {

    }

    .rates {
        border-radius: 10px;
        background-color: #fff;
        margin-top: 30px;
        padding-top: 20px;
        padding-left: 20px;
        height: 500px;

        .list {
            height: 80%;

            .rate-container {
                display: flex;
                align-items: center;
                margin-bottom: 25px;
    
                .image-container {
                    height: 80px;
                    width: 80px;
                    border-radius: 50%;;
                    border: 5px solid #fff;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        cursor: pointer;
                    }
                }
                
                .detail {
                    margin-left: 20px;
                    .name {
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 5px;
                        cursor: pointer;
                    }
    
                    .date {
                        color: #ff7c08;
                        font-size: 13px;
                    }
    
                    .vote {
                        margin-top: 8px;
                        margin-bottom: 12px;
                    }
    
                    .content {
                        font-size: 14px
                    }
                }
            }
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
    }
`