import React, { useState } from 'react'
import { ProgressBar, Form, Button } from "react-bootstrap";
import moment from 'moment';


interface MintPanelProps {
    submitBtnText: string
    handleMint: any
    allSupply: number
    tokenLeft: number
    mintStartDate: any
    isStartMintBegin: boolean
}

const MintPanel: React.FC<MintPanelProps> = ({ isStartMintBegin, mintStartDate, submitBtnText, handleMint, allSupply, tokenLeft }) => {
    const [num, setNum] = useState(1)
    const handleOnChange = (e: any) => {
        console.log(e.target.value)
        setNum(e.target.value)
    }

    return (
        <>
            {isStartMintBegin ? <div>Minting is now available</div> : <div>Mint will started on {moment(mintStartDate).format(/* "YYYYMMDD HH:mm z" */"LLL")} in HKG time(GMT+8)</div>}
            <ProgressBar animated max={allSupply} now={tokenLeft} />
            <br />

            <Form className='d-flex justify-content-center align-items-center flex-column'>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control value={num} onChange={handleOnChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={() => { handleMint(Number(num)) }}> {submitBtnText} </Button>
            </Form>

            <br />

            <div>You are free to mint but you still have to pay the gas fee on blockchain. The gas price is fluctating due to the conjestion on the chain. Please prepare sufficient eth in metamask wallet, otherwise you might be fail during the minting process. Each address can only mint 1 NFT in maximum. </div>
        </>
    )


}

export default MintPanel
