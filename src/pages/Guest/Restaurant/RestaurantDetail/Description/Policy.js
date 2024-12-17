import { useEffect, useState } from "react"
import GuestService from "../../../../../services/GuestService"
import SpinCustom from "../../../../../components/Common/SpinCustom"

const Policy = ({restaurantId, restaurantDetail}) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()

    const getDataPolicy = async () => {
        try {
            setLoading(true)
            const res = await GuestService.getActivePolicy(restaurantId)
            setData(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getDataPolicy()
    }, [restaurantId])
    
    return (  
        <SpinCustom spinning={loading} >
            <div>
                {
                    !!data 
                        ? <div>
                            <div className="fw-500 fs-18 mb-10">Chính sách: </div>
                            <div>
                                Ưu đãi lần đầu đặt bàn: <span> {data?.firstFeePercent} % </span>
                            </div>
                            <div>
                                Ưu đãi từ lần đặt bàn thứ 2: <span> {data?.returningFeePercent} % </span>
                            </div>
                            <div>
                                Hoàn tiền khi hủy bàn: <span> {100 - data?.cancellationFeePercent} % giá trị đơn hàng</span>
                            </div>
                        </div>
                        : <div className="fs-18 fw-500 red">Nhà hàng chưa thêm chính sách nào</div> 
                }
            </div>
        </SpinCustom>
    );
}
 
export default Policy;