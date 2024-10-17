import styled from 'styled-components'

export const ProfileContainer = styled.div `
    /* width: 100%; */
    padding: 20px 40px 0 40px;

    .title {
        .button {
            border: none;
            background-color:#ff7c08;
            color: #fff;
        }

        .button:hover {
            background-color: #ff9933 !important;
            color: white !important;
        }
    }

    .form {
        margin-top: 30px;
        border-radius: 10px;
        background-color: #fff;
        /* height: 400px; */

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

        .save{
            border: none;
            background-color: #ff7c08;
            color: white;
            width: 80px;
        }
        .save:hover {
            background-color: #ff9933 !important;
            color: white !important;
        }
        .cancel {
            color: white;
            border: none;
            width: 80px;
            background-color: gray;
        }
        .cancel:hover {
            background-color: #b9b5b5 !important;
            color: white !important;
        }
    }

`