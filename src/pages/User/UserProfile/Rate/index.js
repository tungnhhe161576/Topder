import { useEffect, useState } from "react";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import RateItem from "./RateItem";
import { RateContainer } from "./styled";
import {Pagination} from 'antd'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import UserService from "../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../redux/Slice/userSlice";
import SpinCustom from "../../../../components/Common/SpinCustom";

const Rate = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] =  useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const user = useSelector(userInfor)

    const getFeedbacks = async () => {
        try {
            setLoading(true)
            const res = await UserService.getFeedbacks(user?.uid)
            setFeedbacks(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFeedbacks()
    }, [])

    const total = feedbacks.length;
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
                    <SpinCustom spinning={loading}>
                        <div className="list">
                            {
                                feedbacks.length === 0 
                                    ? <div className="red fs-18 fw-500 d-flex justify-content-center"> Không có dữ liệu </div>
                                    : <>
                                        <div style={{minHeight: '380px'}}>
                                            {
                                                feedbacks.slice(startIndex, startIndex + itemPerPage).map((rate, index) => 
                                                    <div key={index}>
                                                        <RateItem rate={rate}/>
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
                                    </>
                            }
                        </div>
                    </SpinCustom>
                </div>
            </RateContainer>
        </ProfileUserLayout>
    );
}
 
export default Rate;