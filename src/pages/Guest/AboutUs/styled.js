import styled from 'styled-components'

export const AboutUsContainer = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    .session1 {
        margin-top: 30px;
        flex: 1;
        display: flex;

        .session1-left {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center; 

            .content {
                width: 68%;
                height: 80%;
                background-color: white;
                border-top-right-radius: 20%;
                border-bottom-right-radius: 20%;
                overflow: hidden; 
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }

            .content img {
                width: 100%;
                height: 100%;
                border-radius: inherit;
                object-fit: cover;
            }
        }
        
        .session2-right {
            flex: 1;

            .check {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ffeedf;
            }

            .check img {
                width: 40px;
                height: 40px;
                border-radius: inherit;
            }
        }
    }

    .session2 {
        flex: 1;
    }

    .session3 {
        flex: 1;
    }
`