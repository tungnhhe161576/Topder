const Policy = ({restaurantDetail}) => {
    return (  
        <div>
            {
                restaurantDetail?.firstFeePercent === 0 && restaurantDetail?.returningFeePercent === 0 && restaurantDetail?.cancellationFeePercent === 0
                ? <div className="fw-500 fs-18 red">Nhà hàng không có chính sách nào: </div>
                : <div className="fw-500 fs-18">Chính sách: </div>
            }
            {
                restaurantDetail?.firstFeePercent !== 0
                ? <div>
                    Ưu đãi lần đầu đặt bàn: <span> {restaurantDetail?.firstFeePercent} % </span>
                </div>
                : <></>
            }
            {
                restaurantDetail?.returningFeePercent !== 0
                ? <div>
                    Ưu đãi từ lần đặt bàn thứ 2: <span> {restaurantDetail?.returningFeePercent} % </span>
                </div>
                : <></>
            }
            {
                restaurantDetail?.cancellationFeePercent !== 0
                ? <div>
                    Hoàn tiền khi hủy bàn: <span> {100 - restaurantDetail?.cancellationFeePercent} % giá trị đơn hàng</span>
                </div>
                : <></>
            }
        </div>
    );
}
 
export default Policy;