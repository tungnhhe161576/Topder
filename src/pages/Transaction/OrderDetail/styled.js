import styled from 'styled-components'

export const OrderDetailContainer = styled.div `
    width: 100%;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    height: 100vh;

    .container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề */
.title {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.title .highlight {
  color: #ff8800;
}

/* Thông tin đặt bàn */
.booking-info, .room-info {
  margin-bottom: 20px;
}

.booking-info h4, .room-info h4 {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #555;
}

.info-item {
  margin-bottom: 10px;
}

.info-item strong {
  display: inline-block;
  min-width: 150px;
  color: #222;
}

.info-item span {
  color: #555;
}

/* Danh sách phòng và bàn */
ul {
  list-style: none;
  padding-left: 20px;
}

ul li {
  margin-bottom: 5px;
  font-weight: bold;
}

ul li ul li {
  font-weight: normal;
  list-style-type: disc;
  margin-left: 20px;
}

/* Responsive */
    @media (max-width: 768px) {
    .container {
        padding: 15px;
    }
    .info-item strong {
        min-width: 120px;
    }
    }

    @media (max-width: 480px) {
    .info-item strong {
        display: block;
        margin-bottom: 5px;
    }
    .title {
        font-size: 1em;
    }
    }
`