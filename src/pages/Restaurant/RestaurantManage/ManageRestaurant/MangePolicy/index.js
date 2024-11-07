import { useEffect, useState } from "react";
import { Button, Table, message } from "antd";
import { MangementPolicyContainer } from "./styled";
import GuestService from "../../../../../services/GuestService";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import ModalUpdatePolicy from "./Modal";

const ManagePolicy = ({user}) => {
	const [openModalUpdate, setOpenModalUpdate] = useState(false)
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([])

	const getData = async () => {
		try {
			setLoading(true)
            const response = await GuestService.getRestaurantFee(user.uid);
            setData([response]);
        } catch (error) {
            message.error("Lỗi tải dữ liệu");
        } finally {
			setLoading(false)
		}
	}
	useEffect(() => {
		if(!!user?.uid) {
			getData()
		}
	}, [user])


	const columns = [
		{
			title: "Chiết khấu của nhà hàng",
			dataIndex: "discountRestaurant",
			key: "discountRestaurant",
			width: 300,
			align: 'center',
			render: (value) => (
				<div className="image-container">
					{value}%
				</div>
			),
		},
		{
			title: "Chiết khấu cho lần đặt bàn đầu tiên",
			dataIndex: "firstFeePercent",
			key: "firstFeePercent",
			width: 300,
			align: 'center',
			render: (value) => (
				<div className="image-container">
					{value}%
				</div>
			),
		},
		{
			title: "Chiết khấu cho lần hủy bàn",
			dataIndex: "cancellationFeePercent",
			key: "cancellationFeePercent",
			width: 300,
			align: 'center',
			render: (value) => (
				<div className="image-container">
					{value}%
				</div>
			),
		},
		{
			title: "Chiết khấu từ lần đặt thứ 2",
			dataIndex: "returningFeePercent",
			key: "returningFeePercent",
			width: 300,
			align: 'center',
			render: (value) => (
				<div className="image-container">
					{value}%
				</div>
			),
		},
	];


	return (
		<MangementPolicyContainer>
			<div>
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<Button
						type="primary"
						style={{ height: 40 }}
						onClick={() => setOpenModalUpdate(data)}
					>
						Chỉnh Sửa Chính Sách
					</Button>
				</div>
				<SpinCustom spinning={loading}>
					<Table
						dataSource={data}
						columns={columns}
						rowKey="key"
						pagination={false}
					/>
				</SpinCustom>
			</div>

			{
				!!openModalUpdate && (
					<ModalUpdatePolicy
						open={openModalUpdate}
						onCancel={() => setOpenModalUpdate(false)}
						onOk={getData}
						userId={user?.uid}
					/>
				)
			}
		</MangementPolicyContainer>
	);
};

export default ManagePolicy;
