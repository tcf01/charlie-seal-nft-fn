import React, { useCallback } from 'react';

import './index.scss'
import { useAppContext } from '../Context';

interface CommonModalProps {
    /* config: {
        isHideTriggerBtn: boolean
    } */
}

const CommonModal: React.FC<CommonModalProps> = () => {
    const { isModalOpen, modalTitle, modalContent, setIsModalOpen } = useAppContext()

    const closeModal = useCallback(() => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

    return (
        isModalOpen ?
            (<>
                <div className='modal-overlay'>
                    <div className="modal-wrapper">
                        <div className="header-wrapper">
                            <div className="header"> {modalTitle} </div>
                            <div className="close" onClick={closeModal}>X</div>
                        </div>
                        <div className="content-wrapper">
                            <div className="content">
                                {modalContent}
                            </div>
                        </div>
                        <div className="buttons-wrapper">
                            <div className="actions">
                                <button
                                    className="button"
                                    onClick={() => {
                                        closeModal();
                                    }}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>) : null
    )
}

export default CommonModal