import { useEffect, useState } from "react";
import { CategoryRestauranContainer } from "./styled";
import SpinCustom from "../../../../components/Common/SpinCustom";
import { Button, Table } from "antd";
import GuestService from "../../../../services/GuestService";
import ModalUpdateOrCreate from "./Modal";
// import { useSelector } from "react-redux";
// import { userInfor } from "../../../../redux/Slice/userSlice";

const CategoryRestaurant = ({loading, setLoading}) => {
    const [data, setData] = useState([])
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    // const user = useSelector(userInfor)

    const getData = async () => {
        try {
            setLoading(true)
            const res = await GuestService.getAllCategory()
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
			dataIndex: 'number',
			key: 'number',
			align: 'center',
			render: (_, __, index) => <span className="fs-15"> {index + 1} </span>,
		},
        {
            title: "Tên",
            dataIndex: "categoryRestaurantName",
            key: "categoryRestaurantName",
            width: 150,
			align: 'center',
        },
		{
			title: "",
			dataIndex: "",
			key: "action",
			align: 'center',
			render: (value, record) => (
				<div className='d-flex flex-column align-items-center'>
					<div className="d-flex mb-3">
						<Button
							type="primary"
							shape="round"
							className="mr-3"
							onClick={() => {setOpenModalUpdate(record); setIsEdit(true)}}
						>
							Cập nhật
						</Button>
					</div>
				</div>
			),
		},
	];
    return (  
        <CategoryRestauranContainer>
            <div className="mt-20 ml-30 fw-500 fs-20">
                Các loại nhà hàng
            </div>
            <div className="w-100 d-flex justify-content-flex-end">
                <Button className="mb-20" type="primary" onClick={() => {setOpenModalCreate(true); setIsEdit(false)}}>
                    Thêm loại nhà hàng
                </Button>
            </div>
            <div className="mt-20">
                <SpinCustom spinning={loading}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        rowKey="key"
                        pagination={{ pageSize: 5 }}
                    />
                </SpinCustom>
            </div>
            {
                !!openModalCreate && (
                    <ModalUpdateOrCreate
                        open={openModalCreate}
                        onCancel={() => setOpenModalCreate(false)}
                        onOk={getData}
                        isEdit={isEdit}
                    />
                    )
                }
            {
                !!openModalUpdate && (
                    <ModalUpdateOrCreate
                        open={openModalUpdate}
                        onCancel={() => setOpenModalUpdate(false)}
                        onOk={getData}
                        isEdit={isEdit}
                    />
                )
            }
        </CategoryRestauranContainer>
    );
}
 
export default CategoryRestaurant;