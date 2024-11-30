import { Button, message } from "antd"
import AdminService from "../../../../services/AdminService"
import { useState } from "react"
import CustomModal from "../../../../components/Common/ModalCustom"
import ModalDelete from "./ModalDeleteFeedbackOrOrder"

const ModalHandleReport = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)
    const [openModalDeleteFeedback, setOpenModalDeleteFeedback] = useState(false)

    const handleReport = async (type) => {
        try {
            setLoading(true)
            await AdminService.handleReport({
                    reportId: open?.reportId,
                    reportedBy: open?.reportedBy,
                    reportedOn: open?.reportedOn,
                    feedbackId: open?.feedbackId,
                    orderId: open?.orderId,
                    handleReportType: type,
                    content: type === 'Warning' ? 'Tài khoản của bạn đã vi phạm 1 số quy tắc, nếu vẫn tiếp tục vi phạm, tài khoản của bạn sẽ bị khóa!' : 'Tài khoản đã vi phạm 1 số quy tắc, hệ thống sẽ khóa tài khoản của bạn!'
                })
            message.open({
                content: 'Xử lý thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Xử lý thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
        }
    }
    
    // const footer = () => {
    //     return (
    //         <div className="d-flex justify-content-center">
    //             <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
    //                 Đóng
    //             </Button>
    //             <Button className="mr-10 fw-600" shape='round' type="primary" loading={loading} onClick={() => handleReport()}>
    //                 Xác nhận
    //             </Button>
    //         </div>
    //     )
    // }

    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={null}
            width={600}
            style={{marginTop: '100px'}}
        >
            <div className="title-type-1 mb-20">
                Xử lý báo cáo
            </div>
            <div className="mb-30">
                {
                    open?.reportType === 'Restaurant'
                        ? <div>
                            <div>
                                Nội dung: {open?.description}
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button shape='round' type="primary" danger className="mr-10" onClick={() => {handleReport('Ban');}} loading={loading}>Khóa tài khoản</Button>
                                <Button shape="round" type="primary" onClick={() => {handleReport('Warning')}} loading={loading}>Cảnh cáo</Button>
                            </div>
                        </div>
                        : open?.reportType === 'Feedback'
                            ? <div>
                                <div>
                                    Nội dung: {open?.description}
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button shape='round' type="primary" danger className="mr-10" onClick={() => {handleReport('Ban');}} loading={loading}>Khóa tài khoản</Button>
                                    <Button shape="round" type="primary" className="mr-10" onClick={() => {handleReport('Warning') }} loading={loading}>Cảnh cáo</Button>
                                    <Button shape="round" type="primary" onClick={() => setOpenModalDeleteFeedback(open)}>Xử lý phản hồi</Button>
                                </div>
                            </div>
                            : <div>
                                 <div>
                                    Nội dung: {open?.description}
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <Button shape='round' type="primary" danger className="mr-10" onClick={() => {handleReport('Ban'); }} loading={loading}>Khóa tài khoản</Button>
                                    <Button shape="round" type="primary" className="mr-10" onClick={() => {handleReport('Warning')}} loading={loading}>Cảnh cáo</Button>
                                    <Button shape="round" type="primary" onClick={() => setOpenModalDeleteFeedback(open)}>Xử lý đơn hàng</Button>
                                </div>
                            </div>
                }
            </div>

            {
                !!openModalDeleteFeedback && (
                    <ModalDelete
                        open={openModalDeleteFeedback}
                        onCancel={() => setOpenModalDeleteFeedback(false)}
                        onOk={onOk}
                    />
                )
            }
        </CustomModal>
    );
}
 
export default ModalHandleReport;