import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Image, Row } from "react-bootstrap";
import { buyNFT, getMaxSupply, getTotalSupply } from "../../network/ethereum";
import { style } from "./Home.styles";
import Logo from '../../images/Logo.jpg';
import MintPanel from '../MintPanel';
import { basename } from 'path';
import LoadingOverlay from 'react-loading-overlay';

type Props = {
    currentAccount?: string;
}

const Home: React.FC<Props> = ({ currentAccount }) => {
    const [isLoadingOpen, setIsLoadingOpen] = useState(false)
    const [allSupply, setAllSupply] = useState(0)
    const [tokenLeft, setTokenLeft] = useState<number | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSupply = async () => {
            const totalSupply = await getTotalSupply();
            const maxSupply = await getMaxSupply();


            setAllSupply(totalSupply)
            setTokenLeft(maxSupply - totalSupply);
        }
        fetchSupply();
    }, []);

    const onBuyClick = async (mintNum: number) => {
        try {
            setError(false);
            setIsLoadingOpen(true)

            if (!currentAccount) {
                alert("You haven't connect your wallet yet!")

                return
            } else {
                await buyNFT(mintNum);
            }
        } catch (error) {
            setError(true);
        } finally {
            setIsLoadingOpen(false)
        }
    }

    return (
        <LoadingOverlay
            active={isLoadingOpen}
            spinner
            text={`Minting... Don't refresh the page`}
            styles={{
                wrapper: (base) => ({
                    ...base,
                    position: "inherit",
                })
            }}
        >
            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col lg={6} md={12} className='d-flex justify-content-center align-items-center'>
                        <Row>
                            <Image src={Logo} />
                        </Row>
                    </Col>
                    <Col lg={6} md={12} className="text-center">
                        <Row>
                            <h1 className="text-black">Charlie Seal</h1>
                        </Row>
                        <Row className="mt-3">
                            <p className="text-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis earum veniam voluptate inventore enim laudantium porro, totam quod unde consequuntur explicabo nam sint sequi error aperiam vero ullam commodi facere.</p>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col lg={6} md={12}>
                        <Row>
                            <Col className="d-flex justify-content-md-center">
                                {tokenLeft && tokenLeft === 0 &&
                                    <h1>Sold out!</h1>
                                }
                                {tokenLeft && tokenLeft > 0 &&
                                    <h1>{tokenLeft} token{tokenLeft > 1 && 's'} left!</h1>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <MintPanel allSupply={allSupply} tokenLeft={tokenLeft || 0} submitBtnText={"Mint"} handleMint={(e: any) => onBuyClick(e)} />
                            {error &&
                                <Col className="mt-3 d-flex justify-content-md-center"
                                    lg={12}>
                                    <Alert variant="danger">
                                        Transaction failed!
                                    </Alert>
                                </Col>
                            }
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <h1 id="faq">Roadmap</h1>
                    <p>TBC</p>
                    {/* <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>What is Cafe NFT?</Accordion.Header>
                            <Accordion.Body>
                                We are a revolution to food and beverage businesses. We release NFTs that are backed up
                                by a big business and have real life benefits.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>How much is the cost of a token?</Accordion.Header>
                            <Accordion.Body>
                                A token will cost you 0.05 eth.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>How do I buy Cafe NFTs?</Accordion.Header>
                            <Accordion.Body>
                                Install Metamask plugin to your browser first. Then open this website click the connect
                                wallet button. After your address appear on the navigation bar, you can now click the
                                buy button. Make sure you have enough ether to pay for the token and the gas fee.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What is the benefits of owning a Cafe NFT?</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    <li>20% discounts in all of our franchises.</li>
                                    <li>Special role in our discord server.</li>
                                    <li>A long term investments.</li>
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}
                </Row>
            </Container>
        </LoadingOverlay>
    )
}

export default Home;