import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector    } from 'react-redux';

const ConfirmDeleteModal = ({ isModalDeleteOpen, handleConfirmDelete, onCancel }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const user = useSelector((state) => state.user)
   
    return (
        <Modal
            title="Confirm Deletion"
            visible={isModalDeleteOpen}
            onOk={handleConfirmDelete}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
            confirmLoading={isDeleting}
        >
            <p>Are you sure you want to delete this product?</p>
        </Modal>
    );
};

export default ConfirmDeleteModal;
