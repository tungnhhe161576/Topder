import { useSelector } from "react-redux";
import ProfileUserLayout from "../../../../components/Layouts/ProfileUserLayout";
import UserService from "../../../../services/UserService";
import { WalletContainer } from "./styled";
import { userInfor } from "../../../../redux/Slice/userSlice";
import { useEffect, useState } from "react";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { Button, Form, Input, message, Select } from "antd";
import { formatNumberToK, getRegexNumber } from "../../../../lib/stringUtils";
import axios from "axios";
import ModalWithDraw from "./Modal/Withdraw";
import ModalDeposit from "./Modal/Deposit";
const { Option } = Select;

const Wallet = () => {
    const [loading, setLoading] = useState(false)
    const [wallet, setWallet] = useState()
    const [bankCodes, setBankCodes] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [openModalWithdraw, setOpenModalWithdraw] = useState(false)
    const [openModalDeposit, setOpenModalDeposit] = useState(false)
    const [verifiedOTP, setVerifiedOTP] = useState(false);
    const user = useSelector(userInfor)
    const [form] = Form.useForm()
    
    const getWalletInfo = async () => {
        try {
            setLoading(true)
            const res = await UserService.getWalletInfo(user?.uid)
            setWallet(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (!!user?.uid) {
            getWalletInfo()
        }
    }, [user])

    const getBankCode = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://api.vietqr.io/v2/banks")
            setBankCodes(res?.data?.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getBankCode()
    }, [])

    const handleCreateOTP = async () => {
        try {
            setLoading(false)
            const formValue = await form.validateFields()
            await UserService.addOTP({
                walletId: wallet?.walletId,
                uid: user?.uid,
                otpCode: formValue?.otp
            })
            message.open({
                content: 'Tạo mã PIN thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            getWalletInfo()
        } catch (error) {
            message.open({
                content: 'Tạo mã PIN thất bại',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
            form.resetFields()
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const formValues = await form.validateFields()
            await UserService.createOrUpdateBank({
                walletId: wallet?.walletId,
                uid: user?.uid,
                bankCode: formValues?.bankCode,
                accountNo: formValues?.accountNo,
                accountName: formValues?.accountName
            })
            message.open({
                content: isEdit ? 'Cập nhật tài khoản thành công' : 'Tạo tài khoản thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            getWalletInfo()
            form.resetFields()
            setIsEdit(false)
            setVerifiedOTP(false)
        } catch(error) {
            message.open({
                content: 'Tạo tài khoản thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
        }
    }

    const changeStatusEdit = () => {
        setIsEdit(true)
        form.setFieldsValue({
            bankCode: wallet?.bankCode,
            accountNo: wallet?.accountNo,
            accountName: wallet?.accountName
        })
    }
    

    return (  
        <ProfileUserLayout>
            <SpinCustom spinning={loading}>
                <WalletContainer>
                    {
                        wallet?.bankCode 
                        ? <div className="d-flex flex-column align-items-center">
                            <div className="mt-20 text-center fw-500 fs-20 mb-30">
                                Ví của bạn
                            </div>
                            <div className="d-flex justify-content-space-between wallet-info">
                                
                                {
                                    isEdit 
                                    ? <div>
                                        {/* chinh sua */}
                                        <div className="pt-30 pl-10 pb-30">
                                            <Form 
                                                form={form} 
                                                layout="horizontal" 
                                                labelCol={{span: 4}}
                                                wrapperCol={{span: 16}}
                                                style={{minWidth: 700, maxWidth: '100%'}}
                                            >
                                                {!verifiedOTP && (
                                                    <>
                                                        <Form.Item 
                                                            name="otp"
                                                            rules={[
                                                                { required: true, message: "Hãy nhập mã PIN!" },
                                                                { pattern: getRegexNumber(), message: "Mã PIN phải là số!" },
                                                            ]}
                                                            label={<span className="fw-600 ml-10"> Tạo Mã PIN </span>}
                                                        >
                                                            <Input.OTP
                                                                type="password" 
                                                                onChange={(e) => {
                                                                    if (e === wallet?.otpCode) {
                                                                        setVerifiedOTP(true)
                                                                    }
                                                                }}
                                                                className="ml-40" 
                                                                length={6} 
                                                            />
                                                        </Form.Item>
                                                        <div className="d-flex pl-40 pb-20">
                                                            <Button onClick={() => {setIsEdit(false); setVerifiedOTP(false)}} shape="round" className="ml-10 cancel-edit">
                                                                Thoát
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                                {verifiedOTP && (
                                                    <>
                                                        <Form.Item
                                                            name="bankCode"
                                                            rules={[{ required: true, message: "Hãy chọn mã Bank Code!" }]}
                                                            label={<span className="fw-600 ml-10"> Bank Code </span>}
                                                        >
                                                            <Select
                                                                allowClear
                                                                placeholder="Chọn ngân hàng"
                                                                showSearch
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) => 
                                                                    option?.children.toLowerCase().includes(input.toLowerCase()) 
                                                                }
                                                            >
                                                                {bankCodes?.map(b => (
                                                                    <Option key={b?.id} value={b?.code}>
                                                                        {b?.shortName}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="accountNo"
                                                            rules={[
                                                                { required: true, message: "Hãy nhập số tài khoản!" },
                                                                { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                                            ]}
                                                            label={<span className="fw-600 ml-10"> Số tài khoản </span>}
                                                        >
                                                            <Input placeholder="Số tài khoản"/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            name="accountName"
                                                            rules={[{ required: true, message: "Hãy nhập chủ tài khoản!" }]}
                                                            label={<span className="fw-600 ml-10"> Chủ tài khoản </span>}
                                                        >
                                                            <Input placeholder="Nhập chủ tài khoản"/>
                                                        </Form.Item>
                                                        <div className="d-flex pl-40 pb-20">
                                                            <Button type="primary" shape="round" onClick={() => handleSubmit()}>
                                                                Đồng ý
                                                            </Button>
                                                            <Button onClick={() => {setIsEdit(false); setVerifiedOTP(false)}} shape="round" className="ml-10 cancel-edit">
                                                                Thoát
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </Form>
                                        </div>
                                    </div>
                                    : <>
                                        {/* thong tin vi */}
                                        <div className="pt-30 pl-10 pb-30">
                                            <div className="fw-500 fs-16 info mb-5">Ngân hàng</div>
                                            <div className="info2 mb-12"> 
                                                <span className="pl-10">{wallet?.bankCode}</span> 
                                            </div>

                                            <div className="fw-500 fs-16 info mb-5">Số tài khoản</div>
                                            <div className="info2 mb-12"> 
                                                <span className="pl-10"> {wallet?.accountNo} </span>
                                            </div>

                                            <div className="fw-500 fs-16 info mb-5">Chủ tài khoản</div>
                                            <div className="info2"> 
                                                <span className="pl-10">{wallet?.accountName} </span>
                                            </div>

                                            <div className="mt-20 d-flex justify-content-space-between">
                                                <div>
                                                    <Button className="edit" type="primary" shape="round" onClick={() => changeStatusEdit()}>
                                                        Chỉnh sửa
                                                    </Button>
                                                </div>    
                                                <div>
                                                    <Button className="withdraw" shape="round" onClick={() => setOpenModalDeposit(true)}>
                                                        Nạp tiền
                                                    </Button>
                                                    <Button className="deposit" shape="round" onClick={() => setOpenModalWithdraw(true)}>
                                                        Rút tiền
                                                    </Button>
                                                </div>    
                                            </div>
                                        </div>
                                        <div className="pt-30 pr-10">
                                            <div className="fw-500 fs-16">Số dư hiện tại</div>
                                            <div className="pl-20">{wallet?.walletBalance ? formatNumberToK(wallet?.walletBalance) : '0đ'}</div>
                                        </div>
                                    </>
                                }
                                
                            </div>
                        </div> 
                        //nhap thong tin vi
                        : wallet?.otpCode 
                            ? <div>
                                <div className="mt-20 text-center fw-500 fs-18 mb-30">
                                    Tạo tài khoản của bạn
                                </div>
                                <div className="wallet d-flex justify-content-center">
                                    <Form 
                                        form={form} 
                                        layout="horizontal" 
                                        labelCol={{
                                            span: 4,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        style={{
                                            minWidth: 800,
                                            maxWidth: 1000,
                                        }}
                                    >
                                        <Form.Item
                                            name="bankCode"
                                            rules={[
                                                { required: true, message: "Hãy chọn mã Bank Code!" },
                                            ]}
                                            label={<span className="fw-600 ml-10"> Bank Code </span>}
                                        >
                                            <Select
                                                allowClear
                                                placeholder="Chọn ngân hàng"
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) => 
                                                    option?.children.toLowerCase().includes(input.toLowerCase()) 
                                                }
                                            >
                                                {
                                                    bankCodes?.map(b => (
                                                        <Option key={b?.id} value={b?.code}>
                                                            {b?.shortName}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="accountNo"
                                            rules={[
                                                { required: true, message: "Hãy nhập số tài khoản!" },
                                                { pattern: getRegexNumber(), message: "Ký tự không hợp lệ!" },
                                            ]}
                                            label={<span className="fw-600 ml-10"> Số tài khoản </span>}
                                        >
                                            <Input placeholder="Số tài khoản"/>
                                        </Form.Item>
                                        <Form.Item
                                            name="accountName"
                                            rules={[
                                                { required: true, message: "Hãy nhập chủ tài khoản!" },
                                            ]}
                                            label={<span className="fw-600 ml-10"> Chủ tài khoản </span>}
                                        >
                                            <Input placeholder="Nhập chủ tài khoản"/>
                                        </Form.Item>
                                        <Form.Item className="d-flex justify-content-center">
                                            <Button
                                                className="button-submit"
                                                htmlType="submit"
                                                shape="round"
                                                onClick={() => handleSubmit()}
                                            >
                                                Gửi
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                            //otp
                            : <div className="otp">
                                <div className="mt-20 text-center fw-500 fs-18 mb-30">
                                    Tạo mã PIN cho ví của bạn
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Form 
                                        form={form} 
                                        layout="horizontal" 
                                        labelCol={{
                                            span: 9,

                                            
                                        }}
                                        wrapperCol={{
                                            span: 14,
                                        }}
                                        style={{
                                            minWidth: 800,
                                            maxWidth: 1000,
                                        }}
                                    >
                                        <Form.Item 
                                            name="otp"
                                            rules={[
                                                { required: true, message: "Hãy nhập mã PIN!" },
                                                { pattern: getRegexNumber(), message: "Mã PIN phải là số!" },
                                            ]}
                                            label={<span className="fw-600 ml-10"> Tạo Mã PIN </span>}
                                        >
                                            <Input.OTP type="password" length={6}  />
                                        </Form.Item>
                                        <Form.Item
                                            name="confirmOTP"
                                            rules={[
                                                { required: true, message: "Nhập lại mã PIN" },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                    if (!value || getFieldValue('otp') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Mã PIN chưa đúng!'));
                                                    },
                                                }),
                                            ]}
                                            dependencies={['otp']}
                                            label={<span className="fw-600 ml-10"> Nhập lại Mã PIN </span>}
                                        >
                                            <Input.OTP type="password" length={6}  />
                                        </Form.Item>
                                        <Form.Item className="d-flex justify-content-center"> 
                                            <Button
                                                className="button-submit"
                                                htmlType='submit'
                                                shape="round"
                                                onClick={handleCreateOTP}
                                            >
                                                Tạo
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                    }
                </WalletContainer>
                {!!openModalDeposit && (
                    <ModalDeposit
                        open={openModalDeposit}
                        onCancel={() => {setOpenModalDeposit(false); setVerifiedOTP(false)}}
                        customerId={user?.uid}
                        walletId={wallet?.walletId}
                        verifiedOTP={verifiedOTP}
                        setVerifiedOTP={setVerifiedOTP}
                        wallet={wallet}
                    />
                )}
                {!!openModalWithdraw && (
                    <ModalWithDraw
                        open={openModalWithdraw}
                        onCancel={() => {setOpenModalWithdraw(false); setVerifiedOTP(false)}}
                        customerId={user?.uid}
                        verifiedOTP={verifiedOTP}
                        setVerifiedOTP={setVerifiedOTP}
                        wallet={wallet}
                        getWalletInfo={getWalletInfo}
                    />
                )}
            </SpinCustom>
        </ProfileUserLayout>
    );
}
 
export default Wallet;