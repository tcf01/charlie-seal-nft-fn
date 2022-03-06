import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import './fonts/FatFrank.woff2'

// Components
import Home from "./components/Home";
import Header from "./components/Header";
import Collection from "./components/Collection";
import { useWallet } from "./hooks/useWallet";
import { ContextProvider as AppContext } from './components/Context';
import CommonModal from './components/Modal';


function App() {
    const { currentAccount, setCurrentAccount } = useWallet();

    useEffect(() => {
        console.log('the app is running', process.env.REACT_APP_CONTRACT_ADDRESS)
    }, [])

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
