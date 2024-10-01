import styled from 'styled-components'

export const RestaurantDetailContainer = styled.div `
    width: 90%;
    margin: auto;

    .information {
        margin-top: 50px;

        .image-container {
            img {
                background-size: cover;
                width: 100%;
                height: 100%;
            }
        }

        .added-like {
            color: white;
            font-weight: bold; 
            font-size: 15px;
            width: 220px;
            height: 44px;
            background-color: #ff7c08;
        }

        .added-like:hover {
            background-color: #ff9933 !important;
            border: none;
            color: white !important;
        }

        .album-image {
            height: 80px;
            width: 100%;
            display: flex;

            .row {
                display: flex;
                flex-wrap: nowrap;
                white-space: nowrap;
                max-width: 100%;
                overflow-x: auto;
            }

            button {
                border: none;
                color: white;
                background-color: #ef7d22;
                height: 80px;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .image-item {
                margin-top: -1px;
                height: 72px;
                border: 2px solid #ef7d22;
            }

            .img {
                background-size: cover;
                width: 100%;
                height: 72px;
                max-width: 100%;
            }
        }
    }

    .description {
        margin-top: 50px;
        height: 750px;

        .segment {
            font-weight: bold;

            .ant-segmented .ant-segmented-item-selected {
                background-color: #ef7d22 !important;
                color: white;
            }
        }

        .rating-container {
            display: flex;
            align-items: center;
            background-color: #f3f7fb;
            border-radius: 10px;
            padding-top: 20px;
            padding-bottom: 30px;
        }

        .pagination {
            margin-top: 30px;
            display : flex;
            justify-content: center;

            :where(.css-dev-only-do-not-override-14i19y2).ant-pagination .ant-pagination-item {
                background-color: #fff;
                border: none;
            }

            .custom-pagination .ant-pagination-item-active {
                background-color: #ef7d22 !important;
            }

            .custom-pagination .ant-pagination-item-active a {
                color: white !important;
            }
        }

        .rating-form {
            background: #eef6eb;
            border-radius: 10px;
        }

        .rating-button {
            border: none;
            height: 40px;
            background-color: #ff7c08;
        }

        .rating-button:hover {
            background: #ff9933 !important;
            color: white !important;
        }
    }

    .booking {
        .left-side {
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 702px 300px 0px 0px; 
            border-color: transparent #ef7d22 transparent transparent;
        }

        .form-booking {
            background: #ef7d22;
    
            .button-submit {
                color: white;
                background: #231f40;
                height: 40px;
                border: none;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .button-submit:hover {
                background: #3e367d !important;
            }

            .input {
                height: 50px;

            }
        }
    }
    
    .related-restaurant {
        margin-top: 50px;

        .related-restaurant-container {
            height: 360px;
            width: 100%;
            background-color: #fff;
            position: relative;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-radius: 5px;
            margin-top: 20px;

            .image-container {
                overflow: hidden;
                height: 200px;

                img {
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.3s;
                    border-radius: 5px;
                }

                img:hover {
                    transform: scale(1.1);
                }
            }

            .restaurant-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                .name {
                    cursor: pointer;
                    margin-top: 20px;
                    line-height: 1.5em;
                    font-size: 18px;
                    font-weight: 700;
                }

                .name:hover {
                    color: #ef7d22;
                }

                .rate {
                    margin-top: 10px;
                }

                .button-booking {
                    align-self: flex-end;
                    margin-right: 10px;
                    margin-top: 20px;

                    .button {
                        color: white;
                        border: none;
                        height: 35px;
                        width: 100px;
                        font-weight: bold;
                    }

                    .button:hover {
                        background-color: #ff9933;

                    }
                }
            }
        }
    }
`