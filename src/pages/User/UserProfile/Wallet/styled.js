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
`