import styled from 'styled-components'

export const ModalUpdateContainer = styled.div `
    width: 100%;
    margin-bottom: 30px;

    .ant-form-item-required {
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .ant-input-disabled {
        background-color: #fff !important;
        color: black !important;
    }

    .input {
        border: none;
    }

    .form-item {
        border-bottom: 2px solid #d8d8d8;
    }
`