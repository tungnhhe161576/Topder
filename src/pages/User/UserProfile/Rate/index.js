import { useState } from "react";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import RateItem from "./RateItem";
import { RateContainer } from "./styled";
import {Pagination} from 'antd'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Rate = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbacks, setFeedbacks] = useState([])

    const total = 10;
    const itemPerPage = 3;
    const startIndex = (currentPage - 1) * itemPerPage;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (  
        <ProfileUserLayout>
            <RateContainer>
                <div className="title fs-22 fw-600">
                    Đánh giá
                </div>

                <div className="rates">
                    <div className="list">
                        {
                            Array(total).fill().slice(startIndex, startIndex + itemPerPage).map((_, index) => 
                                <div key={index}>
                                    <RateItem/>
                                </div>
                            )
                        }
                    </div>

                    <div className="pagination">
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
                </div>
            </RateContainer>
        </ProfileUserLayout>
    );
}
 
export default Rate;