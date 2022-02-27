
import React, { useState, SetStateAction, Dispatch } from 'react'

interface ContextProviderProps {
    children: any
}

type ContextDefaultValues = {
    isModalOpen: boolean,
    setIsModalOpen: () => void /* Dispatch<SetStateAction<any>> */,
    modalText: string,
    setModalText: () => void/* Dispatch<SetStateAction<any>> */
}

const defaultValues: ContextDefaultValues = {
    isModalOpen: false,
    setIsModalOpen: () => null,
    modalText: "",
    setModalText: () => ""
}



const Context = React.createContext<ContextDefaultValues>(defaultValues)


const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    return (
        < Context.Provider value={{
            isModalOpen,
            setIsModalOpen,
            modalText: "",
            setModalText: () => ""
        }}>
            {children}
        </Context.Provider >
    )
}


const useAppContext = () => {
    return
}



export default useAppContext
