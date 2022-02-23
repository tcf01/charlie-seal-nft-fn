import React, { useState } from 'react'
import { ProgressBar, Form, Button } from "react-bootstrap";

interface MintPanelProps {
    submitBtnText: string
    handleMint: any
    allSupply: number
    tokenLeft: number
}

const MintPanel: React.FC<MintPanelProps> = ({ submitBtnText, handleMint, allSupply, tokenLeft }) => {
    const [num, setNum] = useState(1)
    const handleOnChange = (e: any) => {
        console.log(e.target.value)
        setNum(e.target.value)
    }

    return (
        <>
            <ProgressBar animated max={allSupply} now={tokenLeft} />
            <br />
            <Form className='d-flex justify-content-center align-items-center flex-column'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control defaultValue={1} value={num} onChange={handleOnChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => { handleMint(Number(num)) }}> {submitBtnText} </Button>
            </Form>
        </>
    )


}

export default MintPanel
