import React from 'react'
import CustomModal from '../../Common/ModalCustom'

const ModalBookingTable = ({open, onCancel, text}) => {
    return (
        <CustomModal
            open={!!open}
            onCancel={onCancel}
            footer={null}
            width={1000}
        >
            <div className='fs-22 fw-600 d-flex justify-content-center'>
                {text}
            </div>
        </CustomModal>
    )
}

export default ModalBookingTable