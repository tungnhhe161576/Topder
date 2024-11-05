import { Button, Card, Typography } from "antd";
import { VerifyAccountContainer } from "./styled";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GuestService from "../../services/GuestService";

const { Title, Text, Link } = Typography;
const VerifyAccount = () => {
	const [verificationSuccess, setVerificationSuccess] = useState(null);
	const { uId } = useParams();
	const verifyAccount = async () => {
		try {
			await GuestService.verifyAccount(uId);
			setVerificationSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		verifyAccount();
	}, [uId]);
	return (
		<VerifyAccountContainer>
			<div className="verification-success-container">
				<Card className="verification-success-card">
					<img
						src={logo}
						alt="Logo"
						className="verification-success-logo"
						style={{ width: 200 }}
					/>
					<Title level={3} className="verification-success-title">
						{verificationSuccess === true
							? "XÁC THỰC THÀNH CÔNG"
							: "XÁC THỰC THẤT BẠI"}
					</Title>

					<Text>
						{verificationSuccess === true
							? "Tài khoản của quý khách đã được xác thực danh tính thành công. Hãy đăng nhập và trải nghiệm nền tảng của chúng tôi."
							: "Tài khoản của quý khách đã được xác thực danh tính trước đó, không cần thực hiện xác thực lại"}
					</Text>
					<br />
					<br />

					<>
						<Text>Để truy cập, vui lòng bấm vào nút bên dưới:</Text>
						{verificationSuccess === true ? (
							<Button
								type="primary"
								className="verification-success-button"
								size="large"
								href="/login"
							>
								Đăng nhập ngay
							</Button>
						) : (
							<Button
								type="primary"
								className="verification-success-button"
								size="large"
								href="/"
							>
								Trở về trang chủ
							</Button>
						)}
					</>
					<div className="verification-success-support">
						<Text>
							Để báo lỗi hoặc cần hỗ trợ hãy liên hệ với chúng tôi
							tại:
						</Text>
						<br />
						<Link href="/contact" style={{ color: "#fa8c16" }}>
							Kênh hỗ trợ khách hàng
						</Link>
					</div>

					<Text className="verification-success-thanks">
						Trân trọng cảm ơn!
					</Text>
				</Card>
			</div>
		</VerifyAccountContainer>
	);
};
export default VerifyAccount;
