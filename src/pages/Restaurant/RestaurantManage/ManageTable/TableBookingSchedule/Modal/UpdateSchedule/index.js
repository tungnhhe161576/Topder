import { Button, Col, DatePicker, Form, Input, message, Radio, Row, Tabs } from "antd";
import table1 from "../../../../../../../assets/images/table1.jpg" 
import table2 from "../../../../../../../assets/images/table2.jpg" 
import CustomModal from "../../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../../services/UserService";
import dayjs from "dayjs";
import { ModalUpdateScheduleContainer } from "./styled";
const { RangePicker } = DatePicker;

const ModalUpdateSchedule = ({open, onCancel, onOk, userId}) => {
    const [loading, setLoading] = useState(false);
    const [selectedTable, setSelectedTable] = useState(open?.tableId)
    const [tableTudo, setTableTodu] = useState([])
    const [tablePhong, setTablePhong] = useState([])
    const [form] = Form.useForm()


    const getTable = async () => {
        try {
            setLoading(true)
            const res = await UserService.getAllTableScheduleList(userId)
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

    useEffect(() => {
        const dateField = [dayjs(open.startTime, "YYYY-MM-DD HH:mm"), dayjs(open.endTime, "YYYY-MM-DD HH:mm")]
        form.setFieldsValue({
            notes: open?.notes,
            date: dateField,
        })
    }, [form, open])

    const handleUpdateSchedule = async () => {
        try {
            setLoading(true);
            const formValues = await form.validateFields()
            console.log(formValues);
            
            await UserService.updateScheduleTable({
                scheduleId: open?.scheduleId,
                tableId: selectedTable,
                restaurantId: userId,
                startTime: dayjs(formValues?.date[0].$d).format(),
                endTime: dayjs(formValues?.date[1].$d).format(),
                notes: formValues?.notes
            })

            message.open({
                content: 'Cập nhật lịch thành công!',
                type: 'success',
                style: {
                    marginTop: '10vh',
                },
            })
            onCancel()
            onOk()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    

    const items = [
        {
            key: '1',
            label: 'Bàn trong phòng',
            children: <div>
            <Radio.Group 
                block 
                optionType="button" 
                value={selectedTable} 
                onChange={(e) => hanleSelectedTable(e.target.value)}
            >
                <Row gutter={[16, 16]} className="w-100">
                    {tablePhong?.map((t, index) => (
                        <Col span={12} key={index} className="w-100">
                            <Radio 
                                className={`w-100 ${selectedTable=== t?.tableId ? 'selected' : ''}`}
                                style={{height: '200px'}}
                                value={t}
                            >
                                <div className="table-item">
                                    <div className="table-image">
                                        {
                                        selectedTable === t?.tableId
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
                value={selectedTable} 
                onChange={(e) => hanleSelectedTable(e.target.value)}
            >
                <Row gutter={[16, 16]} className="w-100">
                    {tableTudo?.map(t => (
                        <Col span={12} key={t?.tableId} className="w-100">
                            <Radio 
                                className={`w-100 ${selectedTable === t?.tableId ? 'selected' : ''}`}
                                style={{height: '200px'}}
                                value={t}
                            >
                                <div className="table-item">
                                    <div className="table-image">
                                        {
                                        selectedTable === t?.tableId
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

    const hanleSelectedTable = (table) => {
        setSelectedTable(table?.tableId)
    }

    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" shape='round' onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type="primary" shape='round' onClick={() => handleUpdateSchedule()} loading={loading}>
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
            width={1000}
            // className='mt-50'
            style={{marginTop: '-80px'}}
        >
            <ModalUpdateScheduleContainer>
                <div>
                    <Form form={form}>
                        <div className='fs-22 fw-600 d-flex justify-content-center'>
                            Chọn bàn
                        </div>
                        <div className="menu mb-40" style={{maxHeight: '500px', overflow: 'scroll'}}>
                            <Form.Item
                                name='table'
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator: (_, value) => 
                                            selectedTable.length === 0
                                                ? Promise.reject("Vui lòng chọn bàn!")
                                                : Promise.resolve(),
                                    }),
                                ]}
                            >
                                <div className="menu mb-40" style={{maxHeight: '500px', overflow: 'scroll'}}>
                                    <Tabs defaultActiveKey="1" items={items} />
                                </div>
                            </Form.Item>
                        </div>
                        <div className="d-flex">
                            <Form.Item
                                name="date"
                                label={
                                    <span className="fs-17 fw-600 d-flex justify-content-start">
                                        Chọn thời gian
                                    </span>
                                }
                                rules={[
                                    { required: true, message: "Vui lòng chọn thời gian!" },
                                ]}
                                className="w-90"
                            >
                                <RangePicker
                                    showTime={{
                                        format: 'HH:mm',
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            </Form.Item>
                        </div>
                        <div>
                        <Form.Item
                                name="notes"
                                label={
                                    <span className="fs-17 fw-600 d-flex justify-content-start">
                                        Ghi chú
                                    </span>
                                }
                            >
                                <Input.TextArea rows={4} placeholder='Nhập lý do'/>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </ModalUpdateScheduleContainer>
        </CustomModal>
    );
}
 
export default ModalUpdateSchedule;