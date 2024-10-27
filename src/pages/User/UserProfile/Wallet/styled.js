import styled from 'styled-components'

export const WalletContainer = styled.div `
    padding: 20px 60px 0 40px;

    .button-submit {
        background-color: #ff7c08;
        color: black;
        width: 100px;
        font-weight: 500;
        border: none;
    }

    .button-submit:hover {
        background-color: #f59139 !important;
        color: black !important;
    }

    .wallet-info {
        background-color: #ebecef;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 600px;

        .info {
            color: #64748b,
        }
        .info2 {
            background-color: #d3d7e0;
            width: 400px;
            height: 30px;
            display: flex;
            align-items: center;
            font-size: 12px;
        }
    }

    .edit {
    }
    .withdraw {
        margin-right: 10px;
        background-color: #8BC34A;
        border: none;
    }
    .withdraw:hover {
        background-color: rgb(159 217 92) !important;
        color: black !important;
    }
    .deposit {
        background-color: #ff7c08;
        border: none;
    }
    .deposit:hover {
        background-color: #ff9800 !important;
        color: black !important;
    }
    .cancel-edit {
        background-color: rgb(121 121 121);
        color: white;
        border: none;
    }
    .cancel-edit:hover {
        background-color: #9E9E9E !important;
        color: white !important;
    }
`