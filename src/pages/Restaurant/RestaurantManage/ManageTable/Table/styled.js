import styled from 'styled-components'

export const TableAllContainer = styled.div ` 
    width: 100%;
    height: 100vh;

    .huy-mo {
        background-color: #bc6b6c !important;
        border: none;
    }
    .huy-mo:hover {
        background-color: #c95557 !important;
        border: none;
    }
    
    .mo {
        background-color: #20c997;
        border: none;
    }
    .mo:hover {
        background-color: #10e4a5 !important;
        border: none;
    }

    .status-mo {
        background-color:  #20c997;
        color: white;
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
    }
    .status-huy-mo {
        background-color: #bc6b6c;
        color: white;
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
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