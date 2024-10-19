import { Col, Pagination, Row } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { WhishlistContainer } from "./styled";
import RestaurantItem from "../../../../components/RestaurantItem";
import { useEffect, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import SpinCustom from "../../../../components/Common/SpinCustom";

const Whishlist = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useSelector(userInfor)

    const getData = async () => {
        try {
            setLoading(true);
            const res = await UserService.getWishLish(user?.uid)
            setData(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const total = data?.length;
    const itemPerPage = 2;
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
                            data?.length === 0 
                                ? <span className="fw-500 fs-20 m-auto w-90" style={{color: 'red'}}>Không có dữ liệu</span>
                                : (
                                    <>
                                        <SpinCustom spinning={loading}>
                                            {data?.map((r, index) =>
                                                <Col key={index} xs={24} sm={24} md={20} lg={12} xl={9}>
                                                    <RestaurantItem data={r}  setText={''} isWishlist={true}/>
                                                </Col>
                                            )}
                                        </SpinCustom>
                                        
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
                                    </>
                                )
                        }
                    </Row>
                </div>
            </WhishlistContainer>
        </ProfileUserLayout>
    );
}
 
export default Whishlist;