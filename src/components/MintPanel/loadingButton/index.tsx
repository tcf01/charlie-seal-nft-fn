import { Spinner } from 'react-bootstrap'
import { useAppContext } from '../../Context'

import './index.scss'


const MintPanelLoading = () => {
    const { mintPanelLoadingWord } = useAppContext()

    return (
        <div className="mint-panel-loading-wrapper">
            <Spinner animation="border" role="status" variant='light' size='sm'>
                {/* <span className="visually-hidden">Loading...</span> */}
            </Spinner>

            <div className="word">{mintPanelLoadingWord}</div>
        </div>
    )
}


export default MintPanelLoading
