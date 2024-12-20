const RestaurantDescription = ( {restaurantDetail} ) => {
    // .map-frame {
    //     margin-top: 20px;
    //     width: 100%;
    //     height: 400px;
    //     border: none;
    //     border-radius: 8px;
    // }
    
    return (  
        <div>
            <div className="des" style={{maxHeight: '500px', overflowY: 'auto'}}>
                {restaurantDetail?.description ? (
                    <div dangerouslySetInnerHTML={{ __html: restaurantDetail?.description }} />
                ) : (
                    'Nhà hàng chưa có mô tả'
                )}
            </div>
            <div className="map mt-20 w-100">
                <div className="mb-10 fs-22 fw-500">Địa chỉ nhà hàng</div>
                <iframe 
                    style={{height: '400px', border: 'none', borderRadius: '8px'}}
                    id="mapFrame" 
                    title="map"
                    className="map-frame w-100" 
                    src={`https://www.google.com/maps?q=${restaurantDetail?.address}&output=embed`}>
                </iframe>
            </div>
        </div>
    );
}
 
export default RestaurantDescription;