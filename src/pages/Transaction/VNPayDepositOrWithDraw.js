import { Button, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import { useEffect } from "react";

const VNPayDepositOrWithdraw = () => {
    const location = useLocation();
    const nav = useNavigate()
    const {transactionId} = useParams()

    const queryParams = new URLSearchParams(location.search);
    const statusTransaction = queryParams.get("vnp_TransactionStatus");
    const statusResponse = queryParams.get("vnp_ResponseCode");

    // vnp_ResponseCode == "00" && vnp_TransactionStatus == "00" ---- thanh cong

    const deposit = async () => {
        try {
            if (statusTransaction === '00' && statusResponse === '00') {
                await UserService.checkRecharge({
                    transactionId, 
                    status: 'Successful'
                })
                message.open({
                    content: 'Nạp tiền thành công.',
                    type: 'success',
                    style: {
                        marginTop: '10vh',
                    },
                })
            } else {
                await UserService.checkRecharge({
                    transactionId, 
                    status: 'Cancelled'
                })
                message.open({
                    content: 'Nạp tiền thất bại.',
                    type: 'error',
                    style: {
                        marginTop: '10vh',
                    },
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        deposit()
    })
    
    return (  
        <div className="mt-40 pl-40">
            {(statusTransaction !== '00' || statusResponse !== '00')
                ? <div>
                    <div>
                        <Button onClick={() => nav('/user-profile/user-wallet')} type="primary" shape="round" style={{width: '200px'}}>
                            Quay trở lại ví
                        </Button>
                    </div>
                    <div>Giao dịch thất bại</div>
                </div>
                : <div>
                    <div> 
                        <Button onClick={() => nav('/user-profile/user-wallet')} type="primary" shape="round" style={{width: '200px'}}>
                            Quay trở lại ví
                        </Button>
                    </div>
                    <div>Giao dịch thành công</div>
                </div>
            }
        </div>
    );
}
 
export default VNPayDepositOrWithdraw;