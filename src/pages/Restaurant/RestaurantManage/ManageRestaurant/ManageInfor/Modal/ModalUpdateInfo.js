import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, TimePicker, Upload } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import axios from "axios";
import GuestService from "../../../../../../services/GuestService";
import { ModalUpdateContainer } from "./styled";
import { getRegexNumber, getRegexPhoneNumber } from "../../../../../../lib/stringUtils";
import dayjs from "dayjs";
import { Editor } from '@tinymce/tinymce-react';
import UserService from '../../../../../../services/UserService';
import { updateUserInformation } from "../../../../../../redux/Slice/userSlice";
import { useDispatch } from "react-redux";
const { Option } = Select;

const ModalUpdateInfo = ({open, onCancel}) => {
    const [loading, setLoading] = useState(false)
    const [cities, setCities] = useState([])
	const [districts, setDistricts] = useState([])
	const [communes, setCommunes] = useState([])
    const [category, setCategory] = useState([])
    const [subDescription, setSubDescription] = useState(open?.subdescription);
    const [description, setDescription] = useState(open?.description);
    const [form] = Form.useForm()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            await getAllRestaurantCategory();
            await getCities();
        };
        
        fetchData();
    }, []);

    const getAllRestaurantCategory = async () => {
        try {
            const res = await GuestService.getAllCategory();
            setCategory(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getCities = async () => {
        try {
            const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
            setCities(response?.data?.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách thành phố:", error);
        }
    }

    const getDistricts = async (cityId) => {
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`);
            setDistricts(res.data.data);
            form.setFieldsValue({ district: undefined, commune: undefined })
            setCommunes([]); 
        } catch (error) {
            console.error("Lỗi khi lấy danh sách huyện:", error);
        }
    };

    const getCommune = async (districtId) => {
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            setCommunes(res.data.data);
            form.setFieldsValue({commune: undefined });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách xã:", error);
        }
    };

    const handleCityChange = (value) => {
        getDistricts(value);
    };

    const handleDistrictChange = (value) => {
        getCommune(value);
    };

    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                ...open,
                openTime: open.openTime ? dayjs(open.openTime, "HH:mm") : null,
                closeTime: open.closeTime ? dayjs(open.closeTime, "HH:mm") : null,
            });
            
            getDistricts(open.provinceCity).then(() => {
                form.setFieldsValue({
                    district: open.district,
                });
                getCommune(open.district).then(() => {
                    form.setFieldsValue({
                        commune: open.commune,
                    });
                });
            });
        }
    }, [open, form]);


    const handelUpdate = async () => {
        try {
            setLoading(true);
            const formValues = await form.validateFields();
            console.log("form", formValues);
            const categoryName = category.find(i => i.categoryRestaurantId === formValues.categoryRestaurantId).categoryRestaurantName
            

            const updateUser = {
                ...formValues,
                categoryRestaurantName: categoryName,
                uid: open?.uid,
                logo: open?.logo,
                openTime: dayjs(formValues?.openTime?.$d).format('HH:mm:ss'),
                closeTime: dayjs(formValues?.closeTime?.$d).format('HH:mm:ss'),
                subdescription: subDescription,
                description: description,
            }

            await UserService.updateRestaurantProfile(updateUser)  
            message.open({
                content: 'Cập nhật thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            dispatch(updateUserInformation(updateUser));
            onCancel()
        } catch (error) {
            message.open({
                content: 'Cập nhật thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false);
        }
    }
    
    const handleEditorChange = (newContent) => {
        setSubDescription(newContent);
    };
    const handleEditorChange2 = (newContent) => {
        setDescription(newContent);
    };
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600 bg-gray" type="primary" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' loading={loading} onClick={() => handelUpdate()}>
                    Đồng ý
                </Button>
            </div>
        )
    }

    const formatNumber = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={1400}
            style={{marginTop: '-50px'}}
        >
            <ModalUpdateContainer>
                <div className="title-type-1">
                    Chỉnh sửa thông tin nhà hàng
                </div>
                <div>
                    <Form form={form} layout="vertical">
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item
                                    name="nameRes"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Tên nhà hàng
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Hãy nhập tên nhà hàng" },
                                    ]}
                                    className="form-item"
                                >
                                    <Input className="input fs-16" placeholder="Tên nhà hàng" />
                                </Form.Item>
                                <Form.Item
                                    name="nameOwner"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Tên chủ nhà hàng
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Hãy nhập tên chủ nhà hàng" },
                                    ]}
                                    className="form-item"
                                >
                                    <Input className="input fs-16" placeholder="Tên chủ nhà hàng" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Số điện thoại
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Hãy nhập số điện thoại!" },
                                        { pattern: getRegexPhoneNumber(), message: "Số điện thoại sai định dạng" },
                                    ]}
                                    className="form-item"
                                >
                                    <Input className="input fs-16" placeholder="Số điện thoại" />
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Địa chỉ
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Nhập địa chỉ cụ thể!" },
                                    ]}
                                    className="form-item"
                                >
                                    <Input className="input fs-16" placeholder="Địa chỉ" />
                                </Form.Item>
                                <Form.Item
                                    name="maxCapacity"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Sức chứa
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Nhập sức chứa!" },
                                    ]}
                                    className="form-item"
                                >
                                    <InputNumber className="input fs-16" placeholder="Sức chứa" />
                                </Form.Item>
                                <Form.Item
                                    name="price"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Giá đặt bàn
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Hãy nhập số tiền đặt bàn!" },
                                        { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                        { 
                                            validator: (_, value) => 
                                                value < 0
                                                    ? Promise.reject("Số tiền phải lớn hơn 0đ!")
                                                    : Promise.resolve(),
                                        },
                                        { 
                                            validator: (_, value) => 
                                                value && value < 10000
                                                    ? Promise.reject("Hãy nhập số tiền từ 0đ trở lên!")
                                                    : Promise.resolve(),
                                        }
                                    ]}
                                    className="form-item"
                                >
                                    <InputNumber className='input fs-16 w-100' formatter={(value) => formatNumber(value.toString())} parser={(value) => value.replace(/\./g, '')} defaultValue={10000} min={10000} placeholder="Nhập số tiền"/>
                                </Form.Item>
                            </Col>


                            <Col span={12}>
                                <Form.Item
                                    name="categoryRestaurantId"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Loại nhà hàng
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Chọn loại nhà hàng" },
                                    ]}
                                    className="form-item select"
                                >
                                    <Select className="mb-9 w-100" allowClear placeholder="Chọn loại nhà hàng">
                                        {
                                            category?.map(c => (
                                                <Option key={c?.categoryRestaurantId} value={c?.categoryRestaurantId} >
                                                    {c?.categoryRestaurantName}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="openTime"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Giờ mở cửa
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Vui lòng chọn giờ mở cửa" },
                                    ]}
                                    className="form-item"
                                >
                                    <TimePicker format='HH:mm' />
                                </Form.Item>
                                <Form.Item
                                    name="closeTime"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Giờ đóng cửa
                                        </span>
                                    }
                                    rules={[
                                        { required: true, message: "Vui lòng chọn giờ đóng cửa" },
                                    ]}
                                    className="form-item"
                                >
                                    <TimePicker format='HH:mm' />
                                </Form.Item>
                                <Form.Item
                                    name="provinceCity"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Thành phố/Tỉnh thành
                                        </span>
                                    }
                                    rules={[{ required: true, message: "Chọn thành phố/tỉnh thành" }]}
                                    className="form-item select mb-18"
                                >
                                    <Select allowClear onChange={handleCityChange} className="mb-9 w-100">
                                        {cities.map(c => (
                                            <Option key={c.id} value={c.id}>{c.full_name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="district"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Huyện
                                        </span>
                                    }
                                    rules={[{ required: true, message: "Chọn huyện" }]}
                                    className="form-item select mb-15"
                                >
                                    <Select allowClear onChange={handleDistrictChange} className="mb-9 w-100">
                                        {districts.map(d => (
                                            <Option key={d.id} value={d.id}>{d.full_name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="commune"
                                    label={
                                        <span className="fs-17 fw-600 d-flex justify-content-start">
                                            Xã
                                        </span>
                                    }
                                    rules={[{ required: true, message: "Chọn xã" }]}
                                    className="form-item select"
                                >
                                    <Select allowClear className="mb-9 w-100">
                                        {communes.map(c => (
                                            <Option key={c.id} value={c.id}>{c.full_name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    labelCol={0}
                                >
                                    <div className="pl-20 fw-500 fs-18 mb-10">
                                        Mô tả chi tiết 
                                    </div>
                                    <Editor
                                        onEditorChange={handleEditorChange2}
                                        apiKey='mbse8bnylyttkkcul3b8wf174fumv1dwoe7romoif6cirr9f'
                                        init={{
                                            height: 300,
                                            width: '100%',
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            // eslint-disable-next-line no-multi-str
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help'
                                        }}
                                        initialValue={open?.description}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </ModalUpdateContainer>
        </CustomModal>
    );
}
 
export default ModalUpdateInfo;