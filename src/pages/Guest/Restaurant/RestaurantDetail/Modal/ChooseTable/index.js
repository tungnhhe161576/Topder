import { Button, Col, Radio, Row, Tabs } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useEffect, useRef, useState } from "react";
import UserService from "../../../../../../services/UserService";
import { ModalChooseTableContainer } from "./styled";
import SpinCustom from "../../../../../../components/Common/SpinCustom";
import table1 from "../../../../../../assets/images/table1.jpg" 
import table2 from "../../../../../../assets/images/table2.jpg" 
import dayjs from "dayjs";

const ModalChooseTable = ({open, onCancel, setTables, tables, restaurantId, date, time, numberPerson}) => {
    const [tableTudo, setTableTodu] = useState([])
    const [tablePhong, setTablePhong] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedTable, setSelectedTable] = useState(tables)
    const [text, setText] = useState(false)
    

    const dateChooseTable = dayjs(date?.$d).format('YYYY-MM-DD')
    const timeChooseTable = dayjs(time?.$d).format('HH:mm')

    
    const getTable = async () => {
        try {
            setLoading(true)
            const res = await UserService.getTable(restaurantId, timeChooseTable, dateChooseTable)
            const room1 = res?.filter(item => item?.roomId !== null)
            const room2 = res?.filter(item => item?.roomId === null)
            setTableTodu(room2)
            setTablePhong(room1)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getTable()
    }, [])
    
    
    const handleSelectTable = (table) => {
        setSelectedTable((prev) => {
            const exists = prev.find(f => f.tableId === table.tableId);
            if (exists) {
                return prev.filter(f => f.tableId !== table.tableId); 
            } else {
                return [...prev, { ...table }];
            }
        });
    }

    const items = [
        {
            key: '1',
            label: 'Bàn trong phòng',
            children: <div>
            <Radio.Group 
                block 
                optionType="button" 
                value={selectedTable.map(t => t.tableId)} 
                onChange={(e) => handleSelectTable(e.target.value)}
            >
                <Row gutter={[16, 16]} className="w-100">
                    {tablePhong?.map((t, index) => (
                        <Col span={12} key={index} className="w-100">
                            <Radio 
                                className={`w-100 ${selectedTable?.find(i => i?.tableId === t?.tableId) ? 'selected' : ''}`}
                                style={{height: '200px'}}
                                value={t}
                                // disabled={t?.maxCapacity < numberPerson ? true : false}
                            >
                                <div className="table-item">
                                    <div className="table-image">
                                        {
                                        selectedTable?.find(i => i?.tableId === t?.tableId) 
                                            ? <img src={table2} alt="table2"/> 
                                            : <img src={table1} alt="table1"/>
                                        }
                                    </div>
                                    <div className="des">
                                        <div className="fs-18 fw-500"> Tên phòng: {t?.roomName} </div>
                                        <div className="fs-16 fw-500"> Tên bàn: {t?.tableName} </div>
                                        <div className="quantity"> Sức chứa: {t?.maxCapacity} người</div>
                                        <div className="description"> {t?.description} </div>
                                    </div>
                                </div>
                            </Radio>
                        </Col>
                    ))} 
                </Row>
            </Radio.Group>
        </div>
        },
        {
            key: '2',
            label: 'Bàn tự do',
            children: <div>
            <Radio.Group 
                block 
                optionType="button" 
                value={selectedTable.map(t => t.tableId)} 
                onChange={(e) => handleSelectTable(e.target.value)}
            >
                <Row gutter={[16, 16]} className="w-100">
                    {tableTudo?.map(t => (
                        <Col span={12} key={t?.tableId} className="w-100">
                            <Radio 
                                className={`w-100 ${selectedTable?.find(i => i?.tableId === t?.tableId) ? 'selected' : ''}`}
                                style={{height: '200px'}}
                                value={t}
                                // disabled={t?.maxCapacity < numberPerson ? true : false}
                            >
                                <div className="table-item">
                                    <div className="table-image">
                                        {
                                        selectedTable?.find(i => i?.tableId === t?.tableId) 
                                            ? <img src={table2} alt="table2"/> 
                                            : <img src={table1} alt="table1"/>
                                        } 
                                    </div>
                                    <div className="des">
                                        <div className="name"> Tên bàn: {t?.tableName} </div>
                                        <div className="quantity"> Sức chứa: {t?.maxCapacity} người</div>
                                        <div className="description"> {t?.description} </div>
                                    </div>
                                </div>
                            </Radio>
                        </Col>
                    ))} 
                </Row>
            </Radio.Group>
        </div>
        }
    ]
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => {
                        if (selectedTable.reduce((acc, curr) => acc + curr.maxCapacity, 0) - numberPerson  < 0 && selectedTable.length !== 0) {
                            setText(true)
                        } else {
                            setText(false)
                            onCancel(); 
                            setTables(selectedTable); 
                        }
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
                width={1000}
                footer={footer}
            >
                <ModalChooseTableContainer>
                    <div className='title-type-1 mb-20'>
                        Chọn bàn
                    </div>
                    <SpinCustom spinning={loading}>
                        <div className="menu" style={{maxHeight: '500px', overflow: 'scroll'}}>
                            <Tabs defaultActiveKey="1" items={items} />
                        </div>
                    </SpinCustom>
                    {
                        text && <div className="mt-20 mb-30">Sức chứa của bàn không đủ! Vui lòng chọn thêm bàn hoặc đổi lại số người</div>
                    }
                </ModalChooseTableContainer>
            </CustomModal>
        </div>
    );
}
 
export default ModalChooseTable;