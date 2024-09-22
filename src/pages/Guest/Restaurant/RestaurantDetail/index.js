import React, { useState } from 'react'
import CommonLayout from '../../../../components/Layouts/CommonLayout'
import { RestaurantDetailContainer } from './styled'
import { Button, Col, DatePicker, Divider, Form, Image, Input, InputNumber, Rate, Row, Segmented } from 'antd'
import RestaurantDescription from './Description/RestaurantDescription'
import RestaurantRate from './Description/RestaurantRate'
import { getRegexPhoneNumber } from '../../../../lib/stringUtils'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import RelatedRestaurant from './RelatedRestaurant'


const RestaurantDetail = () => {
    const [selectedOption, setSelectedOption] = useState('description');
    const [loading, setLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    const [form] = Form.useForm();

    const options = [
        { label: 'Mô Tả', value: 'description' },
        { label: 'Đánh giá', value: 'rate' }
    ];

    const handleSubmitFormBooking = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            const date = {
                ...values,
                date: dayjs(values?.date?.$d).format('DD-MM-YYYY'),
                time: dayjs(values?.time?.$d).format('HH:mm')
            }
            console.log("form: ", values);
            console.log("data: ", date);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }


    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    };

    const images = [
        "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/Cup-Of-Creamy-Coffee.png",
        "https://simexcodl.com.vn/wp-content/uploads/2023/11/cac-loai-ca-phe-o-viet-nam-8.jpg",
        "https://cdnphoto.dantri.com.vn/Y67ZaA06rd6lm6txCSx7gMLriD4=/zoom/1200_630/2022/08/06/caphe-crop-1659747953858.jpeg",
    ];


    return (
        <CommonLayout>
            <RestaurantDetailContainer>
                <div className='information'>
                    <div className="fs-26 fw-700 mb-20"> Thông tin cửa hàng </div>
                    <Row gutter={[16, 16]}>
                        <Col xs={20} sm={20} md={9} lg={9} xl={9}>
                            <div className='image-container'>
                                <img src={images[currentIndex]} alt='restaurant-image'/>
                            </div>
                            <div className='album-image'>
                                <div className='prev mr-5' onClick={prevImage}> 
                                    <button> {'<'} </button> 
                                </div>
                                <Row gutter={[5,0]} className='row w-100'>
                                    {images.map((_, index) => (
                                        <Col span={5} key={index}>
                                            <div className='image-item' style={currentIndex === index ? {border: '5px #ef7d22 solid'} : {}}>
                                                <Image className="img" src={images[index]} />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                <div className='next' onClick={nextImage}> 
                                    <button> {'>'} </button> 
                                </div>
                            </div>
                        </Col>

                        <Col xs={15} sm={15} md={15} lg={15} xl={15}>
                            <div className='pl-20'>
                                <div className='name fw-700 fs-26 mb-16'> Mer.Coffee & Tea</div>
                                <div className='rate mb-10'>
                                    <Rate className='primary fs-14' value={5} disabled/> - (5 đánh giá)
                                </div>
                                <div className='action-time mb-20'>
                                    <div className='fs-16 fw-600 mb-5'>Giờ hoạt động</div>
                                    <div>Mở cửa: 08:00</div>
                                    <div>Đóng cửa: 23:00</div>
                                </div>
                                <div className='address mb-20'>
                                    <div className='fs-16 fw-600 mb-5'>Địa chỉ</div>
                                    <div>A3-15 KDG Cổng Chung, Tân Hội, Đan Phượng, Hà Nội</div>
                                </div>
                                <div className='short-des mb-20'>
                                    <div className='fs-16 fw-600 mb-5'>Mô tả ngắn gọn:</div>
                                    <div style={{fontStyle: 'italic'}}>Menu 4 món bánh kem hương vị, nhiệt đới mới toanh tại <span className='fw-600'>Mer</span>. cả nhà đã update chưa?
                                        Ai thử cũng "nghiện" - vậy mà có Hommies vẫn chưa đu trand Bánh Kem tại <span className='fw-600'>Mer</span> sao ?
                                    </div>
                                </div>
                                <div>
                                    <Button className='bg-primary added-like' shape='round'>
                                        Thêm vào yêu thích
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className='description'>
                    <div className='segment w-20'>
                        <Segmented
                            options={options}
                            block
                            value={selectedOption} 
                            onChange={setSelectedOption} 
                            size="large"
                        />
                    </div>
                    <Divider style={{marginTop: '-2px'}} className='bg-primary mb-20'/>
                    <div>
                        {selectedOption === 'description' 
                            ? <RestaurantDescription description={"Bánh Trà Thêm Quà ..."}/>
                            : <RestaurantRate rateCount={"3"}/>
                        }
                    </div>
                </div>

                <div className='booking mt-50'>
                    <Row>
                        <Col span={12} className='left-side'></Col>
                        <Col span={12} className='form-booking'>
                            <div className="p-5">
                                <div className="pt-40 pl-20 white fs-24 fw-700">Đặt bàn</div>
                                <Divider className='bg-white mt-10 mb-20'/>
                                <Form form={form} layout="vertical" className=''>
                                    <Row gutter={[24,0]} className='d-flex justify-content-center'>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='name'
                                                label={<span className='fs-16 white ml-8'> Tên người nhận bàn  </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy nhập tên của bạn!</span> },
                                                ]}
                                            >
                                                <Input className='input' placeholder='Nhập tên'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='phonenumber'
                                                label={<span className='fs-16 white ml-8'> Số điện thoại người nhận  </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy nhập số điện thoại của bạn!</span> },
                                                    { pattern: getRegexPhoneNumber(), message: <span style={{color: 'black', marginLeft: '15px'}}>Số điện thoại sai định dạng</span> },
                                                ]}
                                                >
                                                <Input className='input' placeholder='Nhập số điện thoại'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='date'
                                                label={<span className='fs-16 white ml-8'> Ngày nhận </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy chọn ngày nhận!</span> },
                                                ]}
                                            >
                                                <DatePicker className='input' placeholder='Chọn ngày'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='time'
                                                label={<span className='fs-16 white ml-8'> Chọn giờ đặt bàn </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy chọn giờ cụ thể!</span> },
                                                ]}
                                            >
                                                <DatePicker picker='time' placeholder='Chọn giờ'  className="input" format="HH:mm" showTime={{ format: 'HH:mm' }}> </DatePicker>
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='numberAdult'
                                                label={<span className='fs-16 white ml-8'> Số người lớn </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy nhập số người lớn!</span> },
                                                ]}
                                            >
                                                <InputNumber min={0} className='input w-100' placeholder='Nhập số người lớn'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={10}>
                                            <Form.Item 
                                                name='numberChildren'
                                                label={<span className='fs-16 white ml-8'> Số trẻ em </span>}
                                                rules={[
                                                    { required: true, message: <span style={{color: 'black', marginLeft: '15px'}}>Hãy nhập số trẻ em!</span> },
                                                ]}
                                                >
                                                <InputNumber min={0} className='input w-100' placeholder='Nhập số trẻ em'/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={20}>
                                            <Form.Item 
                                                name='require'
                                                label={<span className='fs-16 white ml-8'> Yêu cầu </span>}
                                            >
                                                <TextArea rows={6} placeholder="Yêu cầu" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={20}>
                                            <Button 
                                                className='button-submit w-100'
                                                htmlType="submit"
                                                onClick={handleSubmitFormBooking}
                                            >
                                                Đặt bàn
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="related-restaurant">
                    <div className="fs-26 fw-700"> Cửa hàng liên quan </div>                   
                    <div>
                        <Row gutter={[24, 24]} className='d-dlex justify-content-center'>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <RelatedRestaurant/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <RelatedRestaurant/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <RelatedRestaurant/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </RestaurantDetailContainer>
        </CommonLayout>   
    )
}

export default RestaurantDetail