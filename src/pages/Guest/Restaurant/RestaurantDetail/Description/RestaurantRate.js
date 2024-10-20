import { Avatar, Button, Col, Dropdown, Form, message, Pagination, Rate, Row } from "antd";
import dat from '../../../../../assets/images/Dat.jpg'
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestService from "../../../../../services/GuestService";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import UserService from "../../../../../services/UserService";
import { useSelector } from "react-redux";
import { userInfor } from "../../../../../redux/Slice/userSlice";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import ModalDeleteFeedback from "../Modal/ModalDeleteFeeback";

const RestaurantRate = ( {restaurantDetail} ) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const [openModalDeleteFeedback, setOpenModalDeleteFeedback] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate()
    const user = useSelector(userInfor)

    const handleSubmitFormDating = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const res = await UserService.createFeedback({
                customerId: user?.uid,
                restaurantId: restaurantDetail?.uid,
                star: values?.rate,
                content: values?.content
            })
            message.open({
                content: res,
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
        } catch (error) {
            
        } finally {
            setLoading(true)
            form.resetFields()
        }
    }

    const getAllFeedback = async () => {
        try {
            setLoading(true)
            const res = await GuestService.getAllFeedBack(restaurantDetail?.uid)
            setFeedbacks(res?.items)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllFeedback()
    }, [form])

    const itemPerPage = 3;
    const startIndex = (currentPage - 1) * itemPerPage;

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const items = (feedback) => [
        { 
            label: <span onClick={() => setOpenModalDeleteFeedback(feedback)}>Xóa</span>, 
            key: '1' 
        },
        { 
            label: <span>Chỉnh sửa</span>, 
            key: '2' 
        },
    ];


    return (  
        <Row gutter={[40, 0]} className="mt-20">
            <SpinCustom spinning={loading}>
                <Col xs={24} sm={24} md={13} lg={13} xl={13} style={{ minWidth: '500px' }}>
                    <div className="fs-22 fw-600 mt-10 mb-15"> {restaurantDetail?.totalFeedbacks} Đánh giá </div>
                    {
                        feedbacks?.length === 0
                            ? <div className="fs-18 red fw-500 d-flex justify-content-center">Không có dữ liệu</div>
                            : (
                                <>
                                    <div style={{minHeight: '520px'}}>
                                        {feedbacks?.slice(startIndex, startIndex + itemPerPage)?.map((feedback, index) => (
                                            <div key={index} className="rating-container mb-20">
                                                <div className="pl-20" style={{cursor: 'pointer'}} onClick={() => nav('/')}>
                                                    <Avatar size={68} src={<img src={feedback?.customerImage} alt="avatar" />} />
                                                </div>
                                                <div className="ml-20 w-100">
                                                    <div className="fs-18 fw-600 mb-5" style={{cursor: 'pointer'}} onClick={() => nav('/')}>{feedback?.customerName}</div>
                                                    <div className="primary fs-13 mb-10">{dayjs(feedback?.createDate).format('DD-MM-YYYY')}</div>
                                                    <div className="mb-15"><Rate className='primary fs-14' value={feedback?.star} disabled/></div>
                                                    <div className="w-70">{feedback?.content}</div>
                                                </div>
                                                {
                                                    user?.uid === feedback?.customerId 
                                                        ? <div className="options">
                                                            <Dropdown
                                                                menu={{items: items(feedback)}}
                                                                trigger={['click']}
                                                            >
                                                                <span className="fs-22 fw-500 pr-20">...</span>
                                                            </Dropdown>
                                                        </div>
                                                        : <></>
                                                }
                                                
                                            </div>
                                        ))}
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
                                            total={feedbacks.length}
                                            onChange={onPageChange}
                                        />
                                    </div>
                                </>
                            )
                    }
                </Col>
            </SpinCustom>

            {
                !!user 
                    ? <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                        <div className="fs-22 fw-600 mt-10 mb-15"> Đánh giá </div>

                        <div className="rating-form">
                            <Form form={form} className="p-20">
                                <Form.Item 
                                    name='rate'
                                    rules={[
                                        { required: true, message: "Hãy chọn số sao!"},
                                    ]}
                                >
                                    <span className="fs-18">Xếp hạng:</span> <Rate className='primary' onChange={(value) => form.setFieldsValue({ rate: value })}/>
                                </Form.Item> 
                                <Form.Item 
                                    name='content'
                                    rules={[
                                        { required: true, message: "Hãy viết đánh giá!" },
                                    ]}
                                >
                                    <TextArea rows={4} placeholder="Đánh giá của bạn" />
                                </Form.Item> 
                                <Form.Item name="button">
                                    <Button 
                                        className="white bg-primary fw-600 fs-16 rating-button w-30"
                                        htmlType="submit"
                                        shape="round"
                                        onClick={handleSubmitFormDating}
                                    >
                                        Đánh giá
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    : <></>
            }
            {!!openModalDeleteFeedback && (
                <ModalDeleteFeedback
                    open={openModalDeleteFeedback}
                    onCancel={() => setOpenModalDeleteFeedback(false)}
                    onOk={getAllFeedback}
                />
            )}
        </Row>

    );
}
 
export default RestaurantRate;