import { PolicyManagementContainer } from "./styled";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { Button, Table } from "antd";
import SpinCustom from "../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import AdminService from "../../../services/AdminService";
import {formatNumberToK} from '../../../lib/stringUtils'
import dayjs from "dayjs";
import ModalDelete from "./Modal/ModalDelete";
import ModalCreateOrUpdate from "./Modal/ModalCreate";
import { useSelector } from "react-redux";
import { userInfor } from "../../../redux/Slice/userSlice";

const PolicyManage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModaldelete, setOpenModalDelete] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const user = useSelector(userInfor)

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
                    Từ {formatNumberToK(record?.minOrderValue)} {!!record?.maxOrderValue ? <span>- Đến: {formatNumberToK(record?.maxOrderValue)}</span>: null}
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
		{
			title: "",
			dataIndex: "a",
			key: "a",
			align: 'center',
			render: (_, record) => (
				<div className="d-flex align-items-center">
                    <Button type="primary" className="mr-10" onClick={() => {setOpenModalUpdate(record); setIsEdit(true)}}>Chỉnh sửa chính sách</Button>
                    <Button type="primary" danger onClick={() => setOpenModalDelete(record)}>Xóa chính sách</Button>
                </div>
			),
		},
	];
    
    
    return (  
        <AdminLayout>
            <PolicyManagementContainer>
                <div>
                    <div className="title-type-1 mb-30">Chính sách thu tiền của trang web</div>
                    <div className="d-flex justify-content-space-between mb-20">
                        <div className=""  onClick={() => {setOpenModalCreate(true); setIsEdit(false)}}>
                            <Button type="primary">Tạo chính sách</Button>
                        </div>
                    </div>
                    <div>
                        <SpinCustom spinning={loading}>
                            <Table
                                dataSource={data}
                                columns={columns}
                                // rowKey="key"
                                pagination={false}
                            />
                        </SpinCustom>
                    </div>
                </div>
            </PolicyManagementContainer>

            {
                !!openModaldelete && (
                    <ModalDelete
                        open={openModaldelete}
                        onCancel={() => setOpenModalDelete(false)}
                        onOk={(getData)}
                    />
                )
            }
            {
                !!openModalCreate && (
                    <ModalCreateOrUpdate
                        open={openModalCreate}
                        onCancel={() => setOpenModalCreate(false)}
                        onOk={(getData)}
                        isEdit={isEdit}
                        userId={user?.uid}
                    />
                )
            }
            {
                !!openModalUpdate && (
                    <ModalCreateOrUpdate
                        open={openModalUpdate}
                        onCancel={() => setOpenModalUpdate(false)}
                        onOk={(getData)}
                        isEdit={isEdit}
                        userId={user?.uid}
                    />
                )
            }
        </AdminLayout>
    );
}
 
export default PolicyManage;