import { useEffect, useState } from "react";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { AdsManagementContainer } from "./styled";
import AdminService from "../../../services/AdminService";
import ListAdvertisement from "./ListAdvertisement";
import ManageAdsPrice from "./ManageAdsPrice";
import { Tabs } from "antd";

const AdsManagement = () => {
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([])
    const [ads, setAds] = useState([])
    const [status, setStatus] = useState('In-Active')
    const [statusPayment, setStatusPayment] = useState('')

    const getAllAdsPrice = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getAddAdvertisement()
            setPrice(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const getAllAds = async () => {
        try {
            setLoading(true)
            const res = await AdminService.getAllBookingAds()
            status 
                ? statusPayment
                    ? setAds(res.filter((t) => {return t.status === status && t.statusPayment === statusPayment}))
                    : setAds(res.filter((t) => {return t.status === status}))
                : statusPayment
                    ? setAds(res.filter((t) => {return t.statusPayment === statusPayment}))
                    : setAds(res)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllAds()
    }, [status, statusPayment])
    useEffect(() => {
        getAllAdsPrice()
    }, [])



    const items=[
        {
            key: "1",
            label: "Danh sách liên hệ",
            children: <ListAdvertisement loading={loading} ads={ads} getAllAds={getAllAds} setStatus={setStatus} setStatusPayment={setStatusPayment}/>,
        },
        {
            key: "2",
            label: "Giá quảng cáo",
            children: <ManageAdsPrice loading={loading} price={price} getAllAdsPrice={getAllAdsPrice}/>,
        },
    ]

    return (  
        <AdminLayout>
            <AdsManagementContainer>
                <Tabs defaultActiveKey="1" items={items} />
            </AdsManagementContainer>
        </AdminLayout>
    );
}
 
export default AdsManagement;