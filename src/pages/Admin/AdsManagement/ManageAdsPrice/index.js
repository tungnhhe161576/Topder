import { Button, Table } from "antd";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { useState } from "react";
import { formatNumberToK } from '../../../../lib/stringUtils'
import ModalCreate from "./Modal/ModalCreate";
import ModalUpdate from "./Modal/ModalUpdate";
import ModalDelete from "./Modal/ModalDelete";

const ManageAdsPrice = ({loading, price, getAllAdsPrice}) => {
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)


    const columns = [
        {
            title: 'STT',
            dataIndex: 'number',
            key: 'number',
            align: 'center',
            width: 150,
            render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
        },
        {
            title: "Tên",
            dataIndex: "pricingName",
            key: "pricingName",
            align: 'center',
            // width: 150,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: 'center',
            render: (value) => (<div>{value}</div>),
        },
        {
            title: "Khoảng giờ",
            dataIndex: "durationHours",
            key: "durationHours",
            // width: 150,
            align: 'center',
            render: (value) => <span> {value} </span>
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            width: 150,
            align: 'center',
            render: (value) => <span> {formatNumberToK(value)} </span>
        },
        {
            title: "",
            dataIndex: "status",
            key: "status",
            align: 'center',
            render: (_, record) => (
                <div className="d-flex">
                    <Button
                        type="primary"
                        shape="round"
                        className="mr-3"
                        onClick={() => setOpenModalUpdate(record)}
                    >
                        Cập nhật
                    </Button>
                    <Button
                        type="primary"
                        shape="round"
                        danger
                        className="mr-3"
                        onClick={() => setOpenModalDelete(record)}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];
    
    
    return (  
        <div>
            <SpinCustom spinning={loading}>
                <div className="mt-20">
                    <div className="mb-30">
                        <Button type="primary" onClick={() => setOpenModalCreate(true)}>
                            Tạo giá quảng cáo
                        </Button>
                    </div>
                    <div>
                        <Table
                            dataSource={price}
                            columns={columns}
                            pagination={{ pageSize: 8 }}
                        />
                    </div>
                </div>
            </SpinCustom>

            {
                !!openModalCreate && (
                    <ModalCreate
                        open={openModalCreate}
                        onCancel={() => setOpenModalCreate(false)}
                        onOk={getAllAdsPrice}
                    />
                )
            }
            {
                !!openModalUpdate && (
                    <ModalUpdate
                        open={openModalUpdate}
                        onCancel={() => setOpenModalUpdate(false)}
                        onOk={getAllAdsPrice}
                    />
                )
            }
            {
                !!openModalDelete && (
                    <ModalDelete
                        open={openModalDelete}
                        onCancel={() => setOpenModalDelete(false)}
                        onOk={getAllAdsPrice}
                    />
                )
            }
        </div>
    );
}
 
export default ManageAdsPrice;