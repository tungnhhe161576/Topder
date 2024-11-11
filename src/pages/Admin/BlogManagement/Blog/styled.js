import styled from "styled-components";

export const BlogContainer = styled.div`
	width: 100%;

	.menu_search .ant-select-selector {
		border-radius: 25px !important;
		padding: 10px 20px;
		border: 1px solid #ddd !important;
		width: 100%;
		height: 40px !important;
	}

	.search-text {
		margin-bottom: 15px;
	}

	.ant-input-affix-wrapper {
		border-radius: 25px;
	}
	:where(.css-dev-only-do-not-override-14qglws).ant-input-outlined:focus-within {
		border-color: #ddd;
	}
	:where(.css-dev-only-do-not-override-14qglws).ant-input-outlined:hover {
		border-color: #bfbdbd;
	}
	
	
	.btn {
		background-color: #20c997;
		color: white;
		font-weight: bold;
		border-radius: 20px;
		padding: 5px 20px;
	}
	.btn:hover {
		background-color: #46c29d !important ;
	}
`;
