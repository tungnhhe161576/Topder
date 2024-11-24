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
            height: 60px;
            cursor: pointer;
        }
        .item:hover {
            background-color: #a39e9e;
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
            max-height: 90vh;
            min-height: 90vh;
            overflow: auto;
        }
    }
`