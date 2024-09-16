import React from 'react'
import CommonLayout from '../../../components/Layouts/CommonLayout'
import { AboutUsContainer } from './styled'
import logo from '../../../assets/images/mini-logo.jpg';
import checked from '../../../assets/images/checked.jpg';
import image from '../../../assets/images/about-us-image.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faHeadset, faLightbulb, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { TruckOutlined, RedEnvelopeOutlined, RubyOutlined } from '@ant-design/icons';

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
                    <div className='session1-right'>
                        <div className='d-flex'>
                            <span style={{color: '#f57d21', fontSize: '24px', fontWeight: '700', fontStyle: 'italic', fontFamily: 'Nerko One'}}> Về Topder</span> <br/>
                            <span className='ml-10'> <img src={logo} alt='logo'/> </span>
                        </div>
                        <div className='mt-10 mb-15' style={{fontWeight: '700', fontSize: '30px'}}> Nền Tảng Đặt Bàn Nhanh Việt Nam</div> <br/>
                        <div> Chúng tôi mang đến giải pháp tiện lợi và hiệu quả cho người udngf trong việc tìm kiếm và đặt chỗ tại các 
                            nhà hàng, quán ăn,... Với mục tiêu cải thiện trải nghiệm ẩm thực và tiết kiệm thời gian
                            cho người dungfm Topder không chỉ đơn giản hóa quá trình đặt bàn mà còn cung cấp nhiều ưu đãi và lợi tích độc quyền
                        </div> 
                        <div className='d-flex flex-column mt-30'>
                            <div className='d-flex mb-20 justify-content-center align-items-center'>
                                <div className='check'>
                                    <img style={{width: '50px', height: '50px'}} src={checked} alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'>Đặt bàn nhanh chóng</div>
                                    <span>Chỉ với vài thao tác đơn giản, người dùng có thể dễ dàng tìm kiếm và đặt bàn tại các quán hàng và quán ăn</span>
                                </div>
                            </div>
                            <div className='d-flex mb-20 justify-content-center align-items-center'>
                            <div className='check'>
                                    <img style={{width: '50px', height: '50px'}} src={checked} alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'> Ưu đãi hấp dẫn </div>
                                    <span> Hợp tác với nhiều nhà hàng uy tín, Topder mang đến cho người dùng các chương trình khuyến mãi, giảm giá đặc biệt và những ưu đãi dành riêng cho thành viên</span>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className='check'>
                                    <img style={{width: '50px', height: '50px'}} src={checked} alt='check'/>
                                </div>
                                <div className='ml-20'>
                                    <div className='fw-700 fs-18 mb-7'>Đánh giá và phản hồi</div>
                                    <span>Người dùng có thể xem đánh giá từ cộng đồng, cũng như để lại phản hồi sau khi trải nghiệm, góp phần nâng chất lượng dịch vụ của các nhà hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='session2 mt-40'>
                    <div className='d-flex flex-column background' style={{background: `url(${image})`}}>
                        <div className='vision d-flex'>
                            <div className='icon'>
                                <FontAwesomeIcon className='white fs-25 fw-600' icon={faMagnifyingGlass} />
                            </div>
                            <div className='ml-30'>
                                <div className='white fw-600 fs-17 mb-5'>Tầm nhìn</div>
                                <div className='fs-13 pr-30' style={{color: '#FBFFDD'}}> Trở thành một trong những nền tảng đặt bàn và cộng đồng ẩm thực hàng đầu Việt Nam </div>
                            </div>
                        </div>
                        <div className='vision d-flex mt-20 mb-20'>
                            <div className='icon'> 
                                <FontAwesomeIcon className='white fs-25 fw-600' icon={faLightbulb} />
                            </div>
                            <div className='ml-30'>
                                <div className='white fw-600 fs-17 mb-5'>Sứ mệnh</div>
                                <div className='fs-13 pr-30' style={{color: '#FBFFDD'}}> Mang đến cho thực khách Việt Nam những trải nghiệm ẩm thực trọn vẹnh và tiện lợi </div>
                            </div>
                        </div>
                        <div className='vision d-flex'>
                            <div className='icon'> 
                                <RubyOutlined className='white fs-25 fw-600'/> 
                            </div>
                            <div className='ml-30'>
                                <div className='white fw-600 fs-17 mb-5'>Giá trị cốt lõi</div>
                                <div className='fs-13 pr-30' style={{color: '#FBFFDD'}}> Là nền tảng tư vấn và hỗ trợ đặt bàn nhanh đồng thời cung cấp cộng đồng tìm kiếm, chia sẻ, đánh giá ẩm thực tại Việt Nam </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='session3'>
                    <div className='d-flex'>
                        <span style={{color: '#f57d21', fontSize: '24px', fontWeight: '700', fontStyle: 'italic', fontFamily: 'Nerko One'}}>Topder</span> <br/>
                        <span className='ml-10'> <img src={logo} alt='logo'/> </span>
                    </div>
                    <div style={{color: '#16123a', fontSize: '26px', fontWeight: '800'}} className='mt-5'>
                        Tại Sao Nên Chọn Chúng Tôi
                    </div>
                    <div className='mt-15 d-flex'>
                        <div className='left-side-session3'> 
                            Topder là lựa chọn hàng đầu cho những ai muốn có một trải nghiệm đặt bàn ăn uống thuận tiện, hiệu quả và đáng nhớ 
                            <div className='item mt-30'>
                                <div className='child-item'>
                                    <div className='round-icon'>
                                        <FontAwesomeIcon className='white fs-25' icon={faBurger} />
                                    </div>
                                    <div className='content'>
                                        <div className='pl-40 pt-20 pb-20 pr-20' style={{transform: 'skew(15deg)'}}>
                                            <div className='fs-18 fw-600 mb-5 ml-10'> Nhanh chóng </div>
                                            <div> Chỉ vài cú nhấp chuột, bạn có thể dễ đang đặt bàn mà không cần phải gọi điện hay chờ đợi </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='child-item ml-20'>
                                    <div className='round-icon'>
                                        <TruckOutlined className='white fs-25'/>
                                    </div>
                                    <div className='content'>
                                        <div className='pl-40 pt-20 pb-20 pr-20' style={{transform: 'skew(15deg)'}}>
                                            <div className='fs-18 fw-600 mb-5 ml-10'> Thông tin chi tiết </div>
                                            <div> Cung cấp đầy đủ thông tin về nhà hàng, giúp bạn có cái nhìn toàn diện trước khi quyết định. </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='child-item mt-10'>
                                    <div className='round-icon'>
                                        <RedEnvelopeOutlined className='white fs-25' />
                                    </div>
                                    <div className='content'>
                                        <div className='pl-40 pt-20 pb-20 pr-20' style={{transform: 'skew(15deg)'}}>
                                            <div className='fs-18 fw-600 mb-5 ml-10'> Ưu đãi hấp dẫn </div>
                                            <div> Topder mang đến cho bạn những ưu đãi, giảm giá đặc biệt dành riêng cho bạn </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='child-item ml-20 mt-10'>
                                    <div className='round-icon'>
                                        {/* <CustomerServiceOutlined className='white fs-25' /> */}
                                        <FontAwesomeIcon className='white fs-25' icon={faHeadset} />
                                    </div>
                                    <div className='content'>
                                        <div className='pl-40 pt-20 pb-20 pr-20' style={{transform: 'skew(15deg)'}}>
                                            <div className='fs-18 fw-600 mb-5 ml-10'> Hỗ trợ 24/7 </div>
                                            <div> Sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn trong quá tình sử dụng dịch vụ </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='right-side-session3'></div>
                    </div>
                </div>
            </AboutUsContainer>
        </CommonLayout>
    )
}

export default AboutUs