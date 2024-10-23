import { Button, Tabs } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../services/UserService";
import { ModalChooseTableContainer } from "./styled";
import SpinCustom from "../../../../../../components/Common/SpinCustom";

const ModalChooseTable = ({open, onCancel, setTables, tables, restaurantId}) => {
    const [table, setTable] = useState([])
    const [loading, setLoading] = useState(false)

    const getTable = async () => {
        try {
            setLoading(true)
            const res = await UserService.getTable(restaurantId)
            setTable(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    console.log("tables: ", table);


    useEffect(() => {
        getTable()
    }, [])
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => {
                        onCancel(); 
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
                <ModalChooseTableContainer>
                    <div className='fs-22 fw-600 d-flex justify-content-center'>
                        Chọn bàn
                    </div>
                    <SpinCustom spinning={loading}>
                        <div className="menu mb-40">
                            {/* <Tabs defaultActiveKey="1" items={items} /> */}
                        </div>
                    </SpinCustom>
                </ModalChooseTableContainer>
            </CustomModal>
        </div>
    );
}
 
export default ModalChooseTable;