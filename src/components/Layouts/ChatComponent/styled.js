import styled from 'styled-components'

export const ChatComponentContainer = styled.div `
    width: 100%;
    z-index: 100;

    .ant-drawer-body {
        padding: 0 !important;
    }
    :where(.css-dev-only-do-not-override-14qglws).ant-drawer .ant-drawer-body {
        padding: 0;
    }
`

export const BodyChat = styled.div `
    width: 100%;
    display: flex;
    background: #ebebeb;

    .left {
        height: 100vh;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            cursor: pointer;
        }
        .item:hover {
            background-color: #a39e9e;
        }
        .noread {
            /* font-weight: 500; */
        }
        .read {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #ff5722;
            margin-right: 15px;
        }
        .selected {
            background-color: rgb(193 185 185);
        }
    }

    .right {
        /* padding: 10px ; */
        position: relative;
        max-height: 100vh;
        min-height: 100vh;
        background-color: white;
        
        .header {
            /* cursor: pointer; */
        }
        
        .send-mess {
            position: absolute;
            bottom: 10px;
            right: 0;
            left: 0;
        }
        
        .list-message {
            max-height: 78vh;
            min-height: 78vh;
            overflow: auto;
            display: flex;
            flex-direction: column;

            .mysefl {
                align-self: flex-end;
            }
            .yours {
                align-self: flex-start;
            }
        }

    }
`