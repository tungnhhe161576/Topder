import styled from 'styled-components'

export const MenuComponentContainer = styled.div `
    width: 100%;

    .select {
			width: 200px;

			:where(.css-dev-only-do-not-override-14qglws).ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
				border: 1px solid #ff7c08;
			}
			.ant-select:not(.ant-select-customize-input) .ant-select-selector {
				border-radius: 25px !important;
			}
		}
`