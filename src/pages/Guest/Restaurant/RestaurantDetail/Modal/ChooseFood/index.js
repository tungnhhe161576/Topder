import { Avatar, Button, Input, InputNumber, Radio, Tabs } from "antd";
import { ModalChooseFoodContainer } from "./styled";
import CustomModal from "../../../../../../components/Common/ModalCustom";
import { useEffect, useState } from "react";
import UserService from "../../../../../../services/UserService";
import { formatNumberToK } from "../../../../../../lib/stringUtils";
import SpinCustom from "../../../../../../components/Common/SpinCustom";

const ModalChooseFood = ({open, onCancel, foods, setFoods, restaurantId}) => {
    const [menu, setMenu] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedFoods, setSelectedFoods] = useState(foods);

    const getMenu = async () => {
        try {
            setLoading(true)
            const res = await UserService.getMenu(restaurantId)
            setMenu(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getMenu()
    }, [])

    const handleSelectFood = (food) => {
        setSelectedFoods((prev) => {
            const exists = prev.find(f => f.menuId === food.menuId);
            if (exists) {
                return prev.filter(f => f.menuId !== food.menuId); 
            } else {
                return [...prev, { ...food, quantity: 1 }];
            }
        });
    }

    const handleQuantityChange = (foodId, quantity) => {
        setSelectedFoods(prev =>
            prev.map(f => 
                f.menuId === foodId ? { ...f, quantity } : f
            )
        );
    };


    const items = menu?.map(m => {
        return {
            key: m?.categoryMenuId,
            label: <div className="fs-18 fw-500">
                    {m?.categoryMenuName}
                </div>,
            children: 
                <div>
                    <Radio.Group 
                        block optionType="button" 
                        buttonStyle="solid"
                        value={selectedFoods.map(f => f.menuId)} 
                        onChange={(e) => handleSelectFood(e.target.value)}
                    >
                        {m?.menusOfCategoryMenu?.map(f => (
                            <div className="d-flex flex-column" style={{flex: 1}} key={f?.menuId}>
                                <div className="item">
                                    <Radio 
                                        className={`ml-5 mb-10 ${selectedFoods?.find(i => i?.menuId === f?.menuId) ? 'selected' : ''}`} 
                                        value={f} 
                                        // key={f?.menuId} 
                                        style={{height: '120px'}}
                                    >
                                        <div className="food-detail w-100">
                                            <div className="food-img"> 
                                                <Avatar size={110} src={<img src={f?.image} alt="food" />} />
                                            </div>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-space-between pt-20 mb-10">
                                                    <div className="food-name"> {f?.dishName} </div>
                                                    <div className="food-price"> {formatNumberToK(f?.price)} </div>
                                                </div>
                                                <div className="food-des"> {f?.description} </div>
                                            </div>
                                        </div>
                                    </Radio>
                                </div>
                                <div className="pl-30">
                                    {
                                        selectedFoods?.some(i => i?.menuId === f?.menuId) 
                                        ? <div>
                                            <div>Số lượng</div>
                                            <InputNumber 
                                                className="d-flex align-items-center" 
                                                min={1} 
                                                value={selectedFoods.find(i => i?.menuId === f?.menuId)?.quantity || 1} 
                                                onChange={(value) => handleQuantityChange(f.menuId, value)}
                                            />
                                        </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        ))} 
                    </Radio.Group>
                </div>
        }
    })
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' 
                    onClick={() => {
                        onCancel(); 
                        setFoods(selectedFoods); 
                    }}
                >
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (  
        <div>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={800}
                footer={footer}
                style={{marginTop: '150px'}}
            >
                <ModalChooseFoodContainer>
                    <div className='fs-22 fw-600 d-flex justify-content-center'>
                        Chọn món ăn
                    </div>
                    <SpinCustom spinning={loading}>
                        <div className="menu mb-40">
                            <Tabs items={items} />
                        </div>
                    </SpinCustom>
                </ModalChooseFoodContainer>
            </CustomModal>
        </div>
    );
}
 
export default ModalChooseFood;