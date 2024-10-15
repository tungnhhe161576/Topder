import { Button } from "antd";
import CustomModal from "../../../../../components/Common/ModalCustom";

const ModalChooseFood = ({open, onCancel, setFoods}) => {
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => {
                        onCancel(); 
                        setFoods(prev => [...prev, 3])
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
                    Choose Food
                </div>
            </CustomModal>
        </div>
    );
}
 
export default ModalChooseFood;