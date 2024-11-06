import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Col,
	Row,
	Table,
	Form,
	Input,
	Select,
	TimePicker,
	Upload,
	Image,
	InputNumber,
	message,
	Switch,
} from "antd";

import {
	formatNumberToK,
	getRegexEmail,
	getRegexPhoneNumber,
} from "../../../../../lib/stringUtils";
import { ManageInfoContainer } from "./styled";
import img from "../../../../../assets/images/logo.png";
import ModalCustom from "../../../../../components/Common/ModalCustom";
import UserService from "../../../../../services/UserService";
import moment from "moment";
import axios from "axios";
import dayjs from "dayjs";
import ModalUpdateInfo from "./Modal/ModalUpdateInfo";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

const ManageInfomation = ({user}) => {
	const [openModalUpdate, setOpenModalUpdate] = useState(false);


	return (
		<ManageInfoContainer>
			<div>
				<div style={{ marginBottom: "20px", textAlign: "right" }}>
					<Button type="primary" shape="round" onClick={() => setOpenModalUpdate(user)}>
						Chỉnh Sửa Thông Tin
					</Button>
				</div>
				<div className="des mt-20">
					<Row gutter={[16, 16]}>
						<Col span={14}>
							<div className="w-100 d-flex">
								<div className="w-30">
									<div className="image">
										<img src={user?.logo} alt="logo" />
									</div>
									<div> 
										<span>Số dư: </span>
										<span> {formatNumberToK(user?.walletBalance)} </span>
									</div>
								</div>
								<div className="w-60 ml-10">
									<Row>
										<Col span={7}>
											<div> Tên nhà hàng: </div>
											<div> Loại nhà hàng: </div>
											<div> Số điện thoại: </div>
											<div> Địa chỉ: </div>
											<div> Giá đặt bàn: </div>
											<div> Thời gian hoạt động: </div>
										</Col>
										<Col span={17}>
											<div> {user?.nameRes} </div>
											<div> {user?.categoryRestaurantName} </div>
											<div> {user?.phone} </div>
											<div> {user?.address} </div>
											<div> {formatNumberToK(user?.price)} </div>
											<div> 
												<div> Mở cửa: <span> {user?.openTime} </span> </div>
												<div> Đóng cửa: <span> {user?.closeTime} </span> </div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
						<Col span={10}>
							<div> 
								<div className="mt-10">Mô tả chi tiết</div>
								<div className="">
									<div>Mô tả ngắn gọn</div>
									<div>
										{user?.subdescription ? (
											<div dangerouslySetInnerHTML={{ __html: user?.subdescription }} />
										) : (
											'Chưa có mô tả'
										)}
									</div>
									<div>Mô tả chi tiết</div>
									<div>
										{user?.description ? (
											<div dangerouslySetInnerHTML={{ __html: user?.description }} />
										) : (
											'Chưa có mô tả'
										)}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</div>

				{
					!!openModalUpdate && (
						<ModalUpdateInfo
							open={openModalUpdate}
							onCancel={() => setOpenModalUpdate(false)}
						/>
					)
				}
			</div>
		</ManageInfoContainer>
	);
};

export default ManageInfomation;
