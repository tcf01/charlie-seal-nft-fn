import React from 'react';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { style } from './Header.styles'
import { Link } from "react-router-dom";
import { useAppContext } from '../Context';

type Props = {
    currentAccount?: string,
    setCurrentAccount: React.Dispatch<React.SetStateAction<string | undefined>>
}

const Header: React.FC<Props> = ({ currentAccount, setCurrentAccount }) => {
    const { ethereum } = window;
    const { handleModalOpen } = useAppContext()

    const connectWallet = async () => {
        if (!ethereum) {
            handleModalOpen("Info", "No metamask wallet plugin found, please install first!")

            return;
        }

        try {
            const [account] = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(account);
        } catch (err: any) {
            const errorMsgMapping: Record<string, string> = {
                "Already processing eth_requestAccounts. Please wait.": "Please login to your wallet first",
                "unknown": "please contact us for help"
            }
            handleModalOpen("Error", errorMsgMapping[err?.message ? err.message : "unknown"])
        }
    }

    return (
        <Navbar bg="#ff1">
            {style}
            <Container>
                <Navbar.Brand>
                    <Link to="/">
                        Charlie Seal
                    </Link>
                </Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link>
                        <Link to="/my-token">
                            Your Token
                        </Link>
                    </Nav.Link> */}
                    {/* <Nav.Link>
                        <Link to="/#faq">
                            FAQ
                        </Link>
                    </Nav.Link> */}
                </Nav>
                <Nav>
                    {!currentAccount &&
                        <Button className="btn-rounded connect-button" variant="flat" onClick={() => connectWallet()}>
                            Connect to wallet
                        </Button>
                    }
                    {currentAccount &&
                        <Navbar.Text>
                            Address: {currentAccount.slice(0, 5)}...{currentAccount.slice(currentAccount.length - 5)}
                        </Navbar.Text>
                    }
                </Nav>

            </Container>
        </Navbar>
    )
}

export default Header;