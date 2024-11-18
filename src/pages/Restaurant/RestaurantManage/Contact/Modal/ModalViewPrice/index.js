import { Button, Table } from "antd";
import CustomModal from '../../../../../../components/Common/ModalCustom'
import SpinCustom from '../../../../../../components/Common/SpinCustom'
import { useEffect, useState } from "react";
import AdminService from "../../../../../../services/AdminService";
import { formatNumberToK } from "../../../../../../lib/stringUtils";

const ModalViewPrice = ({open, onCancel}) => {
    const [loading, setLoading] = useState(false)
    const [listPrice, setListPrice] = useState([])


    const getAllAdsPrice = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getAddAdvertisement()
            setListPrice(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllAdsPrice()
    }, [])

    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
            </div>
        )
    }

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
            // render: (_, record) => (
            //     <div className="d-flex">
            //         <Button
            //             type="primary"
            //             shape="round"
            //             className="mr-3"
            //             onClick={() => setOpenModalUpdate(record)}
            //         >
            //             Cập nhật
            //         </Button>
            //         <Button
            //             type="primary"
            //             shape="round"
            //             danger
            //             className="mr-3"
            //             onClick={() => setOpenModalDelete(record)}
            //         >
            //             Xóa
            //         </Button>
            //     </div>
            // ),
        },
    ];
    
    
    return (  
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={footer}
            width={900}
        >
            <SpinCustom spinning={loading}>
                <div className='title-type-1'>
                    Bảng giá
                </div>
                <div className="mb-20 mt-20">
                    <Table
                        dataSource={listPrice}
                        columns={columns}
                    />
                </div>
            </SpinCustom>
        </CustomModal>
    );
}
 
export default ModalViewPrice;