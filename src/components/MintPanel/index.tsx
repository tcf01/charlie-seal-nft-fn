import React, { useCallback, useState } from 'react'
import { ProgressBar, Form, Button } from "react-bootstrap";
import moment from 'moment';

import './index.scss'


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
        const numToMint = e.target.value
        const maxNumToMint = 2
        const isLarger = numToMint > maxNumToMint
        const isSmallerThanZero = numToMint < 0

        function determineFinalVal() {
            if (isLarger) {
                return 2
            } else if (isSmallerThanZero) {
                return 1
            } else {
                return numToMint
            }
        }

        setNum(determineFinalVal())
    }

    const onClickMint = () => {
        handleMint(Number(num))
    }

    return (
        <>
            <div className="mint-panel-wrapper">
                {isStartMintBegin ? <div>Minting is now available</div> : <div>Mint will started on {moment(mintStartDate).format(/* "YYYYMMDD HH:mm z" */"LLL")} in HKG time(GMT+8)</div>}
                <ProgressBar max={allSupply} now={tokenLeft} style={{ "paddingRight": "0px", "paddingLeft": "0px" }} />
                <br />

                <Form className='d-flex justify-content-center align-items-center flex-column' >
                    <Form.Group className="mb-3" style={{ "width": "50%" }}>
                        <Form.Control value={num} type='number' onChange={handleOnChange} min={0} max={2} className={"mint-panel-input"} />
                    </Form.Group>
                    <div className='submit-btn' onClick={onClickMint}> {submitBtnText} </div>
                </Form>

                <br />

                <div className='warning-text-wrapper'>
                    <div className="warning-text">*  You are free to mint but you still have to pay the gas fee on blockchain. The gas price is fluctuating due to the conjestion on the chain. Please prepare sufficient eth in metamask wallet, otherwise you might be fail during the minting process.
                    </div>
                    <div className="warning-text">*  Each address can only mint 2 NFT in maximum.  </div>
                </div>
            </div>
        </>
    )
}

export default MintPanel
