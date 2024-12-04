import styled from 'styled-components'

export const MassageRestaurantContainer = styled.div `
    width: 80%;
    margin: auto;
    height: 80vh;
    display: flex;
    background: #ebebeb;

    .left {
        height: 100%;
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
        position: relative;
        max-height: 100%;
        min-height: 100%;
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
            display: flex;
            flex-direction: column;

            .mysefl {
                display: flex;
                align-items: center;
                align-self: flex-end;
            }
            .yours {
                align-self: flex-start;
            }
        }
    }
`