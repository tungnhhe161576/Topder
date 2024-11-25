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
            height: 60px;
            cursor: pointer;
        }
        .item:hover {
            background-color: #a39e9e;
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
                align-self: flex-end;
            }
            .yours {
                align-self: flex-start;
            }
        }
    }
`