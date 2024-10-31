import styled from 'styled-components'

export const TransactionHistoryContainer = styled.div `
    padding: 20px 40px 0 40px;
    
    :where(.css-dev-only-do-not-override-14qglws).ant-table-wrapper .ant-table-thead >tr>th {
        background-color: #4bac4f;
    }

    .success,.fail,.pending {
        width: 100px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        border-radius: 25px;
    }
    
    .success {
        background-color: #ff7f0e;

    }
    .pending {
        background-color: #9e9e9e;
    }
    .fail {
        background-color: red;
    }

    .select {
        width: 150px;

        :where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
            border: none;
        }
        .ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 25px !important;
        }
    }
    

    :where(.css-dev-only-do-not-override-14qglws).ant-table-wrapper .ant-table-thead th.ant-table-column-has-sorters:hover {
        background-color: rgb(75, 172, 79) !important;
    }
`