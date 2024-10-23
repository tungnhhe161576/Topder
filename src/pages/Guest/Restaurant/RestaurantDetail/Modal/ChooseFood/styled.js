import styled from 'styled-components'

export const ModalChooseFoodContainer = styled.div `
    width: 100%;

    .menu {
        .food-detail {
            display: flex;
            
            .food-img {
                padding-top: 5px;
            }
            .food-name {
                font-size: 16px;
                font-weight: 500;
                padding-left: 10px;
                justify-items: start;
            }
            .food-price {
                color: red;
                font-size: 16px;
                font-weight: 500;
            }
            .food-des {
                padding-left: 10px;
                text-align: left;
                line-height: 16px;
            }
        }
        .selected {
            background-color: #f09853;
            border-radius: 30px;
        }
    }

    .ant-radio-button-wrapper {
        border: none;
        color: black !important;
    }
    .ant-radio-button-wrapper:hover {
        color: #747474 !important;
    }
    .ant-radio-button-wrapper-checked {
        border-radius: 30px;
    }
    :where(.css-dev-only-do-not-override-14qglws).ant-radio-button-wrapper:not(:first-child)::before {
        background-color: #fff;
    }
    :where(.css-dev-only-do-not-override-14qglws).ant-input-number-outlined {
        border-color: #f09853;
        height: 30px;
    }
`