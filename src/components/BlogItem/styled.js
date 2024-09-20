import styled from 'styled-components'

export const BlogItemContainer = styled.div `
    width: 100%;
    height: 440px;
    background: #fff;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    
    .blog-image {
        padding: 10px;
        .image-container {
            overflow: hidden;
            height: 200px;
            
            img {
                background-size: cover;
                background-position: center;
                width: 100%;
                height: 100%;
                cursor: pointer;
                transition: transform 0.3s;
                border-radius: 10px;
            }

            img:hover {
                transform: scale(1.1);
            }
        }
    }

    .blog-content {
        .blog-category {
            width: 100px;
            background: #ff7c08;
            color: white;
            height: 8%;
            position: absolute;
            font-size: 16px;
            font-weight: bold;
            font-style: italic;
            top: 43%;
            right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            cursor: pointer;
        }
        .blog-category:hover {
            background: #ed821e;
        }
    
        .blog-owner {
            display: flex;
            align-items: center;
            margin-top: 20px;
            margin-left: 30px;
            cursor: pointer;
            
            .blog-owner-avatar {
                
            }
    
            .blog-owner-detail {
                display: flex;
                flex-direction: column;
                margin-left: 20px;

                .name {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
    
                .created-date {
                    font-size: 13px;
                    color: #ff7c08;
                }
            }
        }
    
        .blog-name {
            margin-top: 20px;
            margin-left: 30px;
            margin-bottom: 10px;
            width: 70%;
            line-height: 1.5em;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;

        }
    
        .blog-added {
            margin-top: 10px;
            margin-left: 30px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
        }

        .blog-added:hover {
            color: #ff7c08;
        }
    }

`