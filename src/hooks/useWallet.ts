import { useState } from "react";

export const useWallet = () => {
    const { ethereum } = window;
    const [currentAccount, setCurrentAccount] = useState<string | undefined>(ethereum?.selectedAddress || "");

    if (ethereum) {
        // @ts-ignore
        ethereum.on("accountsChanged", ([newAccount]) => {
            console.log("accountsChanged: ", newAccount);
            setCurrentAccount(newAccount);
        })
    } else {
        console.log('ethereum is not init yet')
    }


    return { currentAccount, setCurrentAccount };
}