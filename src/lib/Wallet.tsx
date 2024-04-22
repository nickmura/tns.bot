import { TonConnectUIProvider, TonConnectButton } from "@tonconnect/ui-react";


export default function TONWallet() {
    return (
        <> 
            <TonConnectUIProvider manifestUrl="https://f004.backblazeb2.com/file/trxmini-games-/tonconnect-mainfest.json">
                <TonConnectButton />
            </TonConnectUIProvider>
        </>
    )

}