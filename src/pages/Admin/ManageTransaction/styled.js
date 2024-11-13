import styled from 'styled-components'

export const ManageTransactionContainer = styled.div `
    width: 100%;
    height: 100vh;

    .success {
        color: #17a589
    }
    .cacncel {
        color: #ddd;
    }
    .pending {
        color: #17a589
    }

    .select {
		width: 200px;

		:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
			border: 1px solid #ff7c08;
		}
		.ant-select:not(.ant-select-customize-input) .ant-select-selector {
			border-radius: 25px !important;

		}
		.ant-select-focused:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
			border-color: #ff7c08 !important;
		}
		:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover .ant-select-selector {
			border-color: #ff7c08 !important;
		}
	}
`