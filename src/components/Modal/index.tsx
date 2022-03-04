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
                                {/* <Popup
                                trigger={<button className="button"> Trigger </button>}
                                position="top center"
                                nested
                            >
                                <span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                                    magni omnis delectus nemo, maxime molestiae dolorem numquam
                                    mollitia, voluptate ea, accusamus excepturi deleniti ratione
                                    sapiente! Laudantium, aperiam doloribus. Odit, aut.
                                </span>
                            </Popup> */}
                                <button
                                    className="button"
                                    onClick={() => {
                                        console.log('modal closed ');
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