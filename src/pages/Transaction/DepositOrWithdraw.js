import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const DepositOrWithdraw = () => {
    const location = useLocation();
    const nav = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    const transactionId = parseInt(queryParams.get("transactionId"))

    const deposit = async () => {
        try {
            if (status === "PAID") {
                await UserService.checkRecharge({transactionId, status: 'Successful'})
                message.open({
                    content: 'Nạp tiền thành công.',
                    type: 'success',
                    style: {
                        marginTop: '10vh',
                    },
                })
            } else {
                await UserService.checkRecharge({transactionId, status: 'Cancelled'})
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
            {status === "CANCELLED" 
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
 
export default DepositOrWithdraw;