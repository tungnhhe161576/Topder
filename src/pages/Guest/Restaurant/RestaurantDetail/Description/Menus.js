import { Avatar, Col, Row, Tabs } from "antd";
import SpinCustom from "../../../../../components/Common/SpinCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../services/UserService";
import { formatNumberToK } from "../../../../../lib/stringUtils";

const Menus = ({restaurantId, restaurantDetail}) => {
    const [loading, setLoading] = useState(false)
    const [menu, setMenu] = useState([]);

    const getMenu = async () => {
		try {
			setLoading(true);
			const res = await UserService.getMenu(restaurantId);
			setMenu(res);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenu();
	}, []);


    
	const items = menu?.map((m) => {
		return {
			key: m?.categoryMenuId,
			label: <div className="fs-18 fw-500">{m?.categoryMenuName}</div>,
			children: (
				<div>
					<Row gutter={[16, 16]}>
                        {m?.menusOfCategoryMenu?.map((f) => (
                            <Col span={8} key={f?.menuId}>
                                <div className="item">
                                    <div className='ml-5 mb-10' style={{ height: "120px" }}>
                                        <div className="w-100 d-flex align-items-center">
                                            <div className="food-img">
                                                <Avatar
                                                    size={110}
                                                    src={<img src={f?.image} alt="food" />}
                                                />
                                            </div>
                                            <div className="w-100 d-flex flex-column align-items-center pl-10">
                                                <div className="d-flex align-items-center pt-20 mb-10">
                                                    <div className="food-name fs-16 fw-500 mr-10">
                                                        {f?.dishName}
                                                    </div>
                                                    <div className="food-price primary fw-500">
                                                        {formatNumberToK(f?.price)}
                                                    </div>
                                                </div>
                                                <div className="food-des">
                                                    {f?.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
					</Row>
				</div>
			),
		};
	});
    
    
    return (  
        <>
            <div>
                <SpinCustom spinning={loading}>
                    <div className="menu mb-40">
                        <Tabs items={items} />
                    </div>
                </SpinCustom>
            </div>
        </>
    );
}
 
export default Menus;