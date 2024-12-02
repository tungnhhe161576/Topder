import { useEffect, useState } from "react"
import SpinCustom from "../../../../../components/Common/SpinCustom"
import { Button, Table } from "antd"
import dayjs from "dayjs"
import { formatNumberToK } from "../../../../../lib/stringUtils"
import CustomModal from "../../../../../components/Common/ModalCustom"
import AdminService from '../../../../../services/AdminService'

const ModalViewPrice = ({open, onCancel}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getData = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getPolicySystem()
            setData(res)
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [])


    const columns = [
        {
            title: 'STT',
            key: "number",
            width: 80,
			align: 'center',
			render: (_, __, index) => (
				<div className="fw-500 fs-16">
					{index + 1}
				</div>
			),
        },
		{
			title: "Khoảng giá trị đơn hàng",
			dataIndex: "minMax",
			key: "minMax",
			// width: 300,
			align: 'center',
			render: (_, record) => (
				<div>
                    Từ {formatNumberToK(record?.minOrderValue)} {record?.minOrderValue ? <span>- Đến: {formatNumberToK(record?.maxOrderValue)}</span>: null}
                </div>
			),
		},
		{
			title: "Phí",
			dataIndex: "feeAmount",
			key: "feeAmount",
			// width: 300,
			align: 'center',
			render: (value) => (
				<div >
					{formatNumberToK(value)}
				</div>
			),
		},
		{
			title: "Ngày tạo",
			dataIndex: "createDate",
			key: "createDate",
			align: 'center',
			render: (value) => (
				<div>
					{dayjs(value).format('DD-MM-YYYY')}
				</div>
			),
		},
		// {
		// 	title: "",
		// 	dataIndex: "a",
		// 	key: "a",
		// 	align: 'center',
		// 	render: (_, record) => (
		// 		<div className="d-flex align-items-center">
        //             <Button type="primary" className="mr-10" onClick={() => {setOpenModalUpdate(record); setIsEdit(true)}}>Chỉnh sửa chính sách</Button>
        //             <Button type="primary" danger onClick={() => setOpenModalDelete(record)}>Xóa chính sách</Button>
        //         </div>
		// 	),
		// },
	];

    const footer = () => {
		return (
			<div className="d-flex justify-content-center">
				<Button
					className="mr-10 fw-600 bg-gray"
					type="primary"
					shape="round"
					onClick={() => onCancel()}
				>
					Đóng
				</Button>
			</div>
		);
	};
    
    return (  
        <CustomModal
			open={!!open}
			onCancel={onCancel}
			footer={footer}
			width={1000}
            style={{marginTop: '50px'}}
		>
            <div className="title-type-1 mb-10">
                Bảng giá
            </div>
            <div className="mb-30">
                <SpinCustom spinning={loading}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        // rowKey="key"
                        pagination={false}
                    />
                </SpinCustom>
            </div>
        </CustomModal>
    );
}
 
export default ModalViewPrice;