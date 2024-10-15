import { Button } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";

const ModalChooseTable = ({open, onCancel, setTableNumber}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => {
                        onCancel(); 
                        setTableNumber(prev => [...prev, 3])
                    }}
                >
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <div>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={600}
                footer={footer}
                style={{marginTop: '150px'}}
            >
                <div className='fs-22 fw-600 d-flex justify-content-center'>
                    Choose Table
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalChooseTable;