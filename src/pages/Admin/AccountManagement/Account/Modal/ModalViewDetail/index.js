import { Button, Col, Form, Image, Input, Row } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { Editor } from "@tinymce/tinymce-react";
import { ModalViewDetailContainer } from "./styled";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import GuestService from "../../../../../../services/GuestService";
import { formatNumberToK } from "../../../../../../lib/stringUtils";

const ModalViewDetail = ({open, onCancel}) => {
    const [category, setCategory] = useState([])


    const getAllRestaurantCategory = async () => {
        try {
            const res = await GuestService.getAllCategory();
            setCategory(res);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllRestaurantCategory()
    }, [])

    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
            </div>
        )
    }

    console.log(open);
    
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={1000}
            style={{marginTop: '-70px'}}
        >
            <div className="title-type-1">
                Thông tin nhà hàng
            </div>
            <div className="mt-20 mb-30">
                <Row gutter={[16, 16]} className="">
                    <Col span={8}>
                        <Image src={open?.logo} alt="logo"/>
                    </Col>
                    <Col span={14} className="d-flex flex-column ml-20">
                        <div className="d-flex justify-content-space-between align-items-center w-80 mb-20"> 
                            <div className="fw-600 fs-24">
                                {open?.nameRes} 
                            </div>
                            <div className="fs-16">
                                <span className="fw-500">Chủ: </span>
                                <span className="primary fw-500"> {open?.nameOwner} </span>
                            </div>
                        </div>

                        <div className="fs-16 fw-500">
                            <span style={{color: 'gray'}}>Loại nhà hàng: </span>
                            <span className="primary">{category.find(i => i?.categoryRestaurantId === open?.categoryRestaurantId)?.categoryRestaurantName}</span>
                        </div>

                        <div className="fw-500 fs-16 d-flex justify-content-space-between align-items-center w-90">
                            <div>
                                <span style={{color: 'gray'}}>Số điện thoại: </span>
                                <span className="primary">{open?.phone}</span>
                            </div>
                            <div>
                                <span style={{color: 'gray'}}>Email:  </span>
                                <span className="primary">{open?.email}</span>
                            </div>
                        </div>

                        <div className="fw-500 fs-16 mb-15">
                            <span style={{color: 'gray'}}>Địa chỉ: </span>
                            <span className="primary">{open?.address}</span>
                        </div>

                        <div className="mb-10">
                            <div className="fw-500 fs-16">Giờ hoạt động</div>
                            <div>
                                <div className="fw-500 fs-15">
                                    <span style={{color: 'gray'}}>Mở cửa: </span>
                                    <span className="primary">{open?.openTime}</span>
                                </div>
                                <div className="fw-500 fs-15">
                                    <span style={{color: 'gray'}}>Đóng cửa: </span>
                                    <span className="primary">{open?.closeTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="fw-500 fs-16 mb-10">
                            <span style={{color: 'gray'}}>Giá đặt bàn: </span>
                            <span className="red">{formatNumberToK(open?.price)}</span>
                        </div>
                        
                        <div>
                            <div className="fs-16 fw-500">Mô tả ngắn gọn: </div>
                            <div className="fs-14" style={{fontStyle: "italic"}}>
                                {open?.subdescription ? (
                                    <span dangerouslySetInnerHTML={{ __html: open?.subdescription }} />
                                ) : (
                                    'Nhà hàng chưa có mô tả ngắn gọn'
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="fs-16 fw-500">Mô tả chi tiết: </div>
                        <div className="fs-14" style={{fontStyle: "italic"}}>
                            {open?.description ? (
                                <div dangerouslySetInnerHTML={{ __html: open?.description }} />
                            ) : (
                                'Nhà hàng chưa có mô tả chi tiết'
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </CustomModal>
    );
}
 
export default ModalViewDetail;