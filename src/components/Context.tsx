
import React, { useState, SetStateAction, Dispatch, useContext } from 'react'

interface ContextProviderProps {
    children: any
}

type ContextDefaultValues = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<any>>,
    modalTitle: string,
    setModalTitle: Dispatch<SetStateAction<any>>,
    modalContent: string,
    setModalContent: Dispatch<SetStateAction<any>>,
    handleModalOpen: (modalTitle: string, modalContent: string) => void,
    availableTokenNum: number
    setAvailableTokenNum: Dispatch<SetStateAction<any>>,
}

const defaultValues: ContextDefaultValues = {
    isModalOpen: false,
    setIsModalOpen: () => null,
    modalTitle: "",
    setModalTitle: () => "",
    modalContent: "",
    setModalContent: () => "",
    handleModalOpen: (modalTitle: string, modalContent: string) => null,
    availableTokenNum: 0,
    setAvailableTokenNum: () => null,
}



const AppContext = React.createContext<ContextDefaultValues>(defaultValues)


export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState("")
    const [availableTokenNum, setAvailableTokenNum] = useState(0)

    const handleModalOpen = (modalTitle: string, modalContent: string) => {
        setIsModalOpen(true)
        setModalTitle(modalTitle)
        setModalContent(modalContent)
    }

    return (
        < AppContext.Provider value={{
            isModalOpen,
            setIsModalOpen,
            modalTitle,
            setModalTitle,
            modalContent,
            setModalContent,
            handleModalOpen,
            availableTokenNum,
            setAvailableTokenNum
        }}>
            {children}
        </AppContext.Provider >
    )
}


export const useAppContext = () => {
    const value = useContext(AppContext)

    return value
}