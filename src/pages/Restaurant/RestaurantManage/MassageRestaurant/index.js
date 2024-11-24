import { useEffect } from "react";
import RestaurantLayout from "../../../../components/Layouts/RestaurantLayout";
import { MassageRestaurantContainer } from "./styled";
import { createChat } from "../../../../hub";

const MassageRestaurant = () => {

    useEffect(() => {
        // if(!!item) {
            // const createChat = (data) => {
                // console.log('data', data);
                // if (data?.chatBoxId === item?.chatBoxId) {
                //     setChatList(prev => [...prev, data]);
                // }
            // };
            createChat(data => {
                console.log(data);
            });
        // }
    }, []);
    
    return (  
        <RestaurantLayout>
            <MassageRestaurantContainer>
                Massage
            </MassageRestaurantContainer>
        </RestaurantLayout>
    );
}
 
export default MassageRestaurant;