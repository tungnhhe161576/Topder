import styled from 'styled-components'

export const ContactContainer = styled.div `
    width: 100%;
    height: 100vh;

    .status {
        border-radius : 25px;
        height: 30px;
        width: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        border: 1px solid #20c997;
        color: #20c997;
    }
    .in-active {
        border: 1px solid #1e283d;
        color: #1e283d;
    }
    .cancel {
        border: 1px solid red;
        color: red;
    }

    .pending {
        border: 1px solid #1e283d;
        color: #1e283d;
    }
    .paid {
        border: 1px solid #20c997;
        color: #20c997;
    }
    .cancel {
        border: 1px solid red;
        color: red;
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