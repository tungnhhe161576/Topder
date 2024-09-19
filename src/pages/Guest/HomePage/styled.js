import styled from 'styled-components'

export const HomeContainer = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 20px;

    .title {
        font-size: 30px;
        font-weight: 800;
        color: #231f40;
    }

    .heading {
        color: #f57d21;
        font-size: 24px; 
        font-weight: 700; 
        font-style: italic; 
        font-family: Nerko One;
    }

    .session1 {
        display: flex;
        flex-direction: column;
        margin-bottom: 100px;
    }

    .session2 {
        margin-bottom: 100px;
        
        .session2-image {
            border-radius: 25px;
            display: inline-block;
            position: relative;

            .image-container {
                border-radius: 25px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);;
            }

            img {
                background-size: cover;
                background-position: center;
                width: 100%;
                z-index: 1;
            }

            .content {
                z-index: 2;
                width: 50%;
                position: absolute;
                transform: translate(10%);
                top: 15%;
            }

            .booking {
                width: 180px;
                margin-top: 20px;
                border-bottom: 2px solid black ;
                text-align: center;
                font-size: 22px;
                font-weight: bold;
                cursor: pointer;
            }

            .booking:hover {
                color: #f57d21;
                border-bottom: 2px solid #f57d21 ;
            }
        }
    }

    .session3 {
        margin-bottom: 100px;
    }

    .session4 {
        margin-bottom: 100px;
    }

    .session5 {

    }
`