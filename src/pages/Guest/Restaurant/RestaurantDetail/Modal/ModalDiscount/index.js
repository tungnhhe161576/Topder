import { Button, Col, Dropdown, Radio, Row, Tabs } from "antd";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import dayjs from "dayjs";
import { ModalDiscountContainer } from "./styled";

const ModalDiscount = ({open, onCancel, setSelectedVoucher, selectedVoucher}) => {
    const itemsDropdown = (discount) => {
        return discount?.discountMenuDtos?.slice(0, 3).map(d => {
            return {
                key: d?.discountMenuId,
                label: (
                    <div className="d-flex align-items-center">
                        <div className="image mr-10">
                            <img src={d?.image} alt="menu" style={{ width: '30px', height: '30px' }} />
                        </div>
                        <div>
                            {d?.dishName}
                        </div>
                    </div>
                ),
            };
        });
    };

    const items = [{
            key: '1',
            label: 'Voucher',
            children: 
                <div>
                    <Radio.Group 
                        block 
                        optionType="button" 
                        buttonStyle="solid"
                        value={selectedVoucher} 
                        onChange={(e) => setSelectedVoucher(e.target.value)}
                    >
                        <Row gutter={[16, 16]}> 
                        {open?.map(d => (
                            <Col key={d?.discountId} span={12}>
                                <div className="d-flex flex-column item w-100" style={{flex: 1}}>
                                    <Radio 
                                        value={d}
                                        style={{height: '180px', textAlign: 'left'}}
                                    >
                                        <div className="item">
                                            <div className="discount-name" style={{display: 'flex', alignItems: 'center'}}>
                                                <div className="name fw-500 fs-16"> {d?.discountName} </div>
                                                <div className="dropdown" style={{flex: 1, textAlign: 'right', marginBottom: '5px'}}>
                                                    {
                                                        d?.scope === "Per Service" 
                                                        ? <Dropdown
                                                            menu={{items: itemsDropdown(d)}}
                                                        >
                                                            <span className="fs-18 fw-500"> ... </span>
                                                        </Dropdown>
                                                        : <></>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <div className="fw-500 text-center"> 
                                                    {d?.scope === "Per Service" ? "Giảm giá từng món ăn" : `Giảm ${d?.discountPercentage}%`} 
                                                </div>
                                                <div className="discount-description">
                                                    {d?.description}
                                                </div>
                                                <div className="discount-date">
                                                    <div className="start-date">  
                                                        <span className="fw-500">Ngày bắt đầu:</span> {" "}
                                                        {dayjs(d?.startDate).format('DD-MM-YYYY HH-mm')} 
                                                    </div>
                                                    <div className="end-date"> 
                                                        <span className="fw-500">Ngày kết thúc:</span> {" "}
                                                        {dayjs(d?.endDate).format('DD-MM-YYYY HH-mm')} 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Radio>
                                </div>
                            </Col>
                        ))} 
                        </Row>
                    </Radio.Group>
                </div>
    }]

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
        <ModalDiscountContainer>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={800}
                footer={footer}
            >
                <div className="discount">
                    <Tabs items={items} />
                </div>
            </CustomModal>
        </ModalDiscountContainer>
    );
}
 
export default ModalDiscount;