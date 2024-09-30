import { Pagination } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { HistoryContainer } from "./styled";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetail from "./OrderDetail";

const HistoryBooking = () => {
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);

    const total = 11;
    const itemPerPage = 5;
    const startIndex = (currentPage - 1) * itemPerPage;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCancelBooking = async () => {
        try {
            setLoading(true)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    return (  
        <ProfileUserLayout>
            <HistoryContainer>
                <div className="title fs-22 fw-600 mb-20">
                    {isDetail === false ? 'Danh sách đặt bàn' : 'Chi tiết đơn đặt bàn'}
                </div>

                {
                    isDetail === false 
                        ? <div className="table">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Tên Cửa Hàng</th>
                                        <th className="d-flex justify-content-center">SDT Cửa Hàng</th>
                                        <th>Thời Gian Đặt</th>
                                        <th>Trạng Thái</th>
                                        <th className="d-flex justify-content-center">Chi Tiết</th>
                                    </tr>
                                </thead>
                                {
                                    Array(total).fill().slice(startIndex, startIndex + itemPerPage).map((_, index) => 
                                        <tbody key={index}>
                                            <tr>
                                                <td className="fs-16 fw-600">Mer. coffee & tea</td>
                                                <td className="d-flex justify-content-center"><span className="phone-number">0386630141</span></td>
                                                <td className="fs-16">14/06/2024</td>
                                                <td>
                                                    {
                                                        index % 3 === 1 
                                                            ? <span className="status pending">Đang Chờ</span>
                                                            : (
                                                                index % 3 === 2 
                                                                    ? <span class="status accepted">Chấp Nhận</span>
                                                                    : <span class="status completed">Hoàn thành</span>
                                                            )
                                                    }
                                                    
                                                </td>
                                                <td className="d-flex justify-content-center">
                                                    <button onClick={() => setIsDetail(true)} className="btn detail-btn">Chi Tiết</button>
                                                    {
                                                        index % 3 === 1 && <button onClick={handleCancelBooking} className="btn cancel-btn">Hủy</button>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                        : <OrderDetail setIsDetail={setIsDetail}/>
                }

                {
                    !isDetail && <div className="pagination">
                        <Pagination
                            className="custom-pagination pb-20"
                            itemRender={(page, type, originalElement) => {
                                if (type === "prev") {
                                    return <LeftOutlined />;
                                }
                                if (type === "next") {
                                    return <RightOutlined />;
                                }
                                return originalElement;
                            }}
                            defaultCurrent={1}
                            current={currentPage}
                            pageSize={itemPerPage}
                            total={total}
                            onChange={onPageChange}
                        />
                    </div>
                }
                
            </HistoryContainer>
        </ProfileUserLayout>
    );
}
 
export default HistoryBooking;