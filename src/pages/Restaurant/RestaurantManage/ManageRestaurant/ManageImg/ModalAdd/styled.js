import styled from 'styled-components'

export const ModalUploadImageContainer = styled.div `
    width: 100%;

    .ant-upload-list {
        display: flex;
        flex-wrap: wrap;
    }

    .ant-upload-list-item-container {
        width: 30%;
        margin-right: 10px;
    }
    .ant-upload-list-item-error {
        color: black !important;
        border-color: #ddd !important;
    }


`