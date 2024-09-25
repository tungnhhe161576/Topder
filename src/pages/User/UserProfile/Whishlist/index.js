import { Col, Pagination, Row } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { WhishlistContainer } from "./styled";
import RestaurantItem from "../../../../components/RestaurantItem";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const Whishlist = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const total = 3;
    const itemPerPage = 2;
    const startIndex = (currentPage - 1) * itemPerPage;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    
    return (  
        <ProfileUserLayout>
            <WhishlistContainer>
                <div className="title fs-22 fw-600 mb-30">
                    Yêu thích   
                </div>
                <div className="list-wishlist">
                    <Row gutter={[30, 20]} className="d-flex justify-content-start">
                        {
                        Array(total).fill().slice(startIndex, startIndex + itemPerPage).map((_, index) =>
                            <Col xs={24} sm={24} md={20} lg={12} xl={9}>
                                <RestaurantItem  setText={''} isWishlist={true}/>
                            </Col>
                        )
                        }
                    </Row>

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
            </WhishlistContainer>
        </ProfileUserLayout>
    );
}
 
export default Whishlist;