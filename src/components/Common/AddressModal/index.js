import React, { useEffect, useState } from "react";
import { Col, Form, Row, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const AddressForm = ({ handleSelect }) => {
	const [cities, setCities] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [wards, setWards] = useState([]);

	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);

	// Lấy danh sách tỉnh/thành phố khi component được mount
	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await axios.get(
					"https://esgoo.net/api-tinhthanh/1/0.htm"
				);
				if (response.data.error === 0) {
					setCities(response.data.data);
				}
			} catch (error) {
				console.error("Error fetching cities:", error);
			}
		};

		fetchCities();
	}, []);

	// Lấy quận/huyện khi người dùng chọn tỉnh/thành phố
	const handleCityChange = async (cityId) => {
		setSelectedCity(cityId);
		setDistricts([]);
		setWards([]);

		try {
			const response = await axios.get(
				`https://esgoo.net/api-tinhthanh/2/${cityId}.htm`
			);
			if (response.data.error === 0) {
				setDistricts(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching districts:", error);
		}
	};

	// Lấy phường/xã khi người dùng chọn quận/huyện
	const handleDistrictChange = async (districtId) => {
		setSelectedDistrict(districtId);
		setWards([]);

		try {
			const response = await axios.get(
				`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
			);
			if (response.data.error === 0) {
				setWards(response.data.data);
			}
		} catch (error) {
			console.error("Error fetching wards:", error);
		}
	};

	// Khi người dùng chọn phường/xã
	const handleWardChange = (wardId) => {
		setSelectedWard(wardId);
	};

	// Khi người dùng xác nhận lựa chọn địa chỉ
	const handleSubmit = () => {
		const city = cities.find((city) => city.id === selectedCity);
		const district = districts.find(
			(district) => district.id === selectedDistrict
		);
		const ward = wards.find((ward) => ward.id === selectedWard);

		handleSelect(city, district, ward); // Truyền dữ liệu về component cha
	};

	return (
		<Form layout="vertical" onFinish={handleSubmit}>
			<Row gutter={16}>
				{/* Tỉnh/Thành phố */}
				<Col span={12}>
					<Form.Item
						label="Chọn Tỉnh Thành"
						name="city"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn tỉnh thành!",
							},
						]}
					>
						<Select
							placeholder="Chọn Tỉnh Thành"
							style={{ width: "100%" }}
							onChange={handleCityChange}
							value={selectedCity}
						>
							{cities.map((city) => (
								<Option key={city.id} value={city.id}>
									{city.full_name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>

				{/* Quận/Huyện */}
				<Col span={12}>
					<Form.Item
						label="Chọn Quận Huyện"
						name="district"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn quận huyện!",
							},
						]}
					>
						<Select
							placeholder="Chọn Quận Huyện"
							style={{ width: "100%" }}
							onChange={handleDistrictChange}
							value={selectedDistrict}
							disabled={!selectedCity} // Chỉ được chọn khi đã chọn Tỉnh
						>
							{districts.map((district) => (
								<Option key={district.id} value={district.id}>
									{district.full_name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				{/* Phường/Xã */}
				<Col span={24}>
					<Form.Item
						label="Chọn Phường Xã"
						name="ward"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn phường xã!",
							},
						]}
					>
						<Select
							placeholder="Chọn Phường Xã"
							style={{ width: "100%" }}
							onChange={handleWardChange}
							value={selectedWard}
							disabled={!selectedDistrict} // Chỉ được chọn khi đã chọn Quận
						>
							{wards.map((ward) => (
								<Option key={ward.id} value={ward.id}>
									{ward.full_name}
								</Option>
							))}
						</Select>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default AddressForm;
