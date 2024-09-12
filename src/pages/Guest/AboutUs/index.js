import React from 'react'
import CommonLayout from '../../../components/Layouts/CommonLayout'
import { AboutUsContainer } from './styled'

const AboutUs = () => {
    return (
        <CommonLayout>
            <AboutUsContainer>
                <div className='session1'>
                    <div className='session1-left'>
                        <div className='content'>
                            <img src='/logo-topder-full.png' alt='logo'/>
                        </div>
                    </div>
                    <div className='session2-right'>
                        <span style={{color: '#f57d21', fontSize: '24px', fontWeight: '700', fontStyle: 'italic', fontFamily: 'Nerko One'}}> Về Topder</span> <br/>
                        <div className='mt-10 mb-15' style={{fontWeight: '700', fontSize: '30px'}}> Nền Tảng Đặt Bàn Nhanh Việt Nam</div> <br/>
                        <div> Chúng tôi mang đến giải pháp tiện lợi và hiệu quả cho người udngf trong việc tìm kiếm và đặt chỗ tại các 
                            nhà hàng, quán ăn,... Với mục tiêu cải thiện trải nghiệm ẩm thực và tiết kiệm thời gian
                            cho người dungfm Topder không chỉ đơn giản hóa quá trình đặt bàn mà còn cung cấp nhiều ưu đãi và lợi tích độc quyền
                        </div> 
                        <div className='d-flex flex-column mt-30'>
                            <div className='d-flex mb-20 justify-content-center align-items-center'>
                                <div className='check'>
                                    <img src='https://e7.pngegg.com/pngimages/871/912/png-clipart-check-mark-computer-icons-blog-others-miscellaneous-angle-thumbnail.png' alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'>Đặt bàn nhanh chóng</div>
                                    <span>Chỉ với vài thao tác đơn giản, người dùng có thể dễ dàng tìm kiếm và đặt bàn tại các quán hàng và quán ăn</span>
                                </div>
                            </div>
                            <div className='d-flex mb-20 justify-content-center align-items-center'>
                            <div className='check'>
                                    <img src='https://e7.pngegg.com/pngimages/871/912/png-clipart-check-mark-computer-icons-blog-others-miscellaneous-angle-thumbnail.png' alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'> Ưu đãi hấp dẫn </div>
                                    <span> Hợp tác với nhiều nhà hàng uy tín, Topder mang đến cho người dùng các chương trình khuyến mãi, giảm giá đặc biệt và những ưu đãi dành riêng cho thành viên</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='check'>
                                    <img src='https://e7.pngegg.com/pngimages/871/912/png-clipart-check-mark-computer-icons-blog-others-miscellaneous-angle-thumbnail.png' alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'>Đánh giá và phản hồi</div>
                                    <span>Người dùng có thể xem đánh giá từ cộng đồng, cũng như để lại phản hồi sau khi trải nghiệm, góp phần nâng chất lượng dịch vụ của các nhà hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='session2'>
vgeswdvg
                </div>

                <div className='session3'>

                </div>
            </AboutUsContainer>
        </CommonLayout>
    )
}

export default AboutUs