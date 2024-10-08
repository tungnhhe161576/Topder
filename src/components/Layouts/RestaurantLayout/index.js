import Header from "./Header.js";
import LeftSide from "./LeftSide";
import { RestaurantLayoutContainer } from "./styled";

const RestaurantLayout = ( {children} ) => {
    return (  
        <RestaurantLayoutContainer>
            <Header/> 
            <div className="body-layout">
                <LeftSide/> 
                <div className="children"> 
                    {children} 
                </div>
            </div>
        </RestaurantLayoutContainer>
    );
}
 
export default RestaurantLayout;