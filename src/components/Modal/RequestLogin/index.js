import React from 'react'
import CustomModal from '../../Common/ModalCustom'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RequestLoginContainer } from './styled'


const ModalRequestLogin = ({open, onCancel, text}) => {
    const nav = useNavigate()
    console.log("text:", text);
    
    
    const footer = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button className="mr-10 fw-600" onClick={() => onCancel()}>
                    Đóng
                </Button>
                <Button className="mr-10 fw-600" type='primary' onClick={() => nav('/login')}>
                    Đồng ý
                </Button>
            </div>
        )
    }
    
    return (
        <RequestLoginContainer>
            <CustomModal
                open={!!open}
                onCancel={onCancel}
                width={600}
                footer={footer}
                style={{marginTop: '150px'}}
            >
                <div className='fs-22 fw-600 d-flex justify-content-center'>
                    {text}
                </div>
            </CustomModal>
        </RequestLoginContainer>
    )
}

export default ModalRequestLogin