import { Button, DatePicker, Form, Input, Radio } from "antd";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import { ProfileContainer } from "./styled";
import { getRegexEmail, getRegexPhoneNumber } from "../../../../lib/stringUtils";
import { useState } from "react";
import dayjs from "dayjs";

const Profile = () => {
    const [form] = Form.useForm()
    const [isEdit, setIsEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    let data = {
        name: 'Đỗ Văn Đạt',
        email: 'datdvhe161664@fpt.edu.vn',
        phoneNumber: '0968519615',
        date: dayjs('2002/11/16').format('DD-MM-YYYY'),
        gender: 1,
    }
    
    const handleEditInfo = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()
            data = {
                ...values,
                name: values?.name,
                email: values?.email,
                phoneNumber: values?.email,
                date: dayjs(values?.date?.$d).format('DD-MM-YYYY'),
                gender: values?.gender,
            }

            console.log("after data", data);
            
            setIsEdit(false)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (  
        <ProfileUserLayout>
            <ProfileContainer>
                <div className="title d-flex justify-content-space-between align-items-center fw-600 fs-24">
                    <div>Thông tin cá nhân</div>
                    <div className="">
                        <Button className="bg-primary white button" shape="round" 
                            onClick={() => {
                                setIsEdit(true)
                                form.setFieldsValue({
                                    name: data.name,
                                    email: data.email,
                                    phoneNumber: data.phoneNumber,
                                    date: dayjs(data.date, 'DD-MM-YYYY'),
                                    gender: data.gender,
                                })
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
                <div className="form">
                    <Form 
                        form={form} 
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 18 }}
                        className="p-40"
                    >
                        <Form.Item
                            name='name'
                            label= { <span className='fs-17 fw-600 d-flex justify-content-start'> Tên </span> }
                            rules={[
                                { required: true, message: "Hãy nhập tên của bạn" },
                            ]}
                            className="form-item"
                        >
                            <Input className="input fs-16" defaultValue={data?.name} placeholder="Tên" disabled={!isEdit ? true : false}/>
                        </Form.Item>

                        <Form.Item
                            name='email'
                            label= { <span className='fs-17 fw-600 d-flex justify-content-start'> Email: </span> }
                            rules={[
                                { required: true, message: "Hãy nhập email của bạn" },
                                { pattern: getRegexEmail(), message: "Email sai định dạng" },
                            ]}
                            className="form-item"
                        >
                            <Input className="input fs-16" defaultValue={data.email} placeholder="Email" disabled={!isEdit ? true : false}/>
                        </Form.Item>

                        <Form.Item
                            name='phoneNumber'
                            label= { <span className='fs-17 fw-600 d-flex justify-content-start'> Số điện thoại </span> }
                            rules={[
                                { required: true, message: "Hãy nhập số điện thoại của bạn" },
                                { pattern: getRegexPhoneNumber(), message: "Số điện thoại sai định dạng" },
                            ]}
                            className="form-item"
                        >
                            <Input className="input fs-16" defaultValue={data?.phoneNumber} placeholder="Tên" disabled={!isEdit ? true : false}/>
                        </Form.Item>
                        
                        {
                            isEdit === false ? 
                                (
                                    <Form.Item
                                        name='gender'
                                        label= { <span className='fs-17 fw-600 d-flex justify-content-start'> Giới tính </span> }
                                        rules={[
                                            { required: true, message: "Hãy chọn giới tính của bạn" },
                                        ]}
                                        className="form-item"
                                    >
                                        <Input className="input fs-16" defaultValue={data?.gender === 1 ? 'Nam' : data?.gender === 2 ? 'Nữ' : 'Khác'}  placeholder="Giới tính" disabled/>
                                    </Form.Item>
                                ) : 
                                (
                                    <Form.Item
                                        name="gender"
                                        rules={[
                                            { required: true, message: "Hãy chọn giới tính" },
                                        ]}
                                        label={<span className='fs-17 fw-600 d-flex justify-content-start'> Giới tính </span>}
                                    >
                                        <Radio.Group>
                                            <Radio value={1}>Nam</Radio>
                                            <Radio value={2}>Nữ</Radio>
                                            <Radio value={3}>Khác</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                )
                        }

                        {
                            isEdit === false ? 
                                (
                                    <Form.Item
                                        name='date'
                                        label= { <span className='fs-17 fw-600 d-flex justify-content-start'> Ngày sinh </span> }
                                        rules={[
                                            { required: true, message: "Hãy chọn ngày sinh của bạn" },
                                        ]}
                                    >
                                        <Input className="input fs-16" defaultValue={data?.date} placeholder="Ngày sinh" disabled/>
                                    </Form.Item>
                                ) : 
                                (
                                    <Form.Item
                                        name="date"
                                        rules={[
                                            { required: true, message: "Hãy chọn ngày sinh" },
                                        ]}
                                        label={<span className='fs-17 fw-600 d-flex justify-content-start'> Ngày sinh </span>}
                                    >
                                        <DatePicker/>
                                    </Form.Item>
                                )
                        }

                        {
                            isEdit && (
                                <Form.Item>
                                    <div className="d-flex justify-content-start">
                                        <Button className="bg-primary save mr-15" shape="round" onClick={handleEditInfo}>
                                            Lưu
                                        </Button>
                                        <Button shape="round" className="cancel" onClick={() => setIsEdit(false)}>
                                            Thoát
                                        </Button>
                                    </div>
                                </Form.Item>
                            )
                        }
                    </Form>
                </div>
            </ProfileContainer>
        </ProfileUserLayout>
    );
}
 
export default Profile;