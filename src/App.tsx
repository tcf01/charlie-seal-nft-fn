import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './fonts/FatFrank.ttf'

// Components
import Home from "./components/Home";
import Header from "./components/Header";
import Collection from "./components/Collection";
import { useWallet } from "./hooks/useWallet";
import { ContextProvider as AppContext } from './components/Context';
import CommonModal from './components/Modal';

//from https://medium.com/@stevelukis/integrating-react-website-to-ethereum-network-with-web3-js-case-study-nft-minting-website-ae94c4107adc

function App() {
    const { currentAccount, setCurrentAccount } = useWallet();


    return (
        <AppContext>
            <CommonModal />
            <Router>
                <Header
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                />
                <Routes>
                    <Route path='/' element={<Home currentAccount={currentAccount} />} />
                    <Route
                        path='/my-token'
                        element={<Collection
                            currentAccount={currentAccount}
                        />}
                    />
                </Routes>
            </Router>
        </AppContext>
    );
}

export default App;
