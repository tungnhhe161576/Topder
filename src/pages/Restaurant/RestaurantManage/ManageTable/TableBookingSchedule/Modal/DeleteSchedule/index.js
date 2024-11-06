import { Button, message } from "antd";
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useState } from "react";
import UserService from "../../../../../../../services/UserService";

const ModalDeleteSchedule = ({open, onCancel, onOk}) => {
    const [loading, setLoading] = useState(false)

    const handledDelete = async () => {
        try {
            setLoading(true)
            await UserService.deleteScheduleTable(open?.scheduleId)
            message.open({
                content: 'Xóa lịch thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onOk()
            onCancel()
        } catch (error) {
            message.open({
                content: 'Xóa lịch thất bại!',
                type: 'error',
                style: {
                    marginTop: '10vh',
                },
            })
        } finally {
            setLoading(false)
        }
    }
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handledDelete()} loading={loading}>
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={600}
            className='mt-50'
        >
            <div className="fw-500 fs-20">
                Bạn có chắc chắn muốn xóa lịch này hay không ?
            </div>
        </CustomModal>
    );
}
 
export default ModalDeleteSchedule;