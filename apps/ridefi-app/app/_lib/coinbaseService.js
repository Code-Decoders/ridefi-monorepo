"use server"
import { Coinbase, Wallet } from '@coinbase/coinbase-sdk'
import { SystemAddress, TokenAddress, TokenAbi } from '../api/abi';

export async function createWallet() {
    try {
        // Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

        Coinbase.configure({ apiKeyName: "organizations/f4c1400c-fa4b-4bb6-af81-193276c8d230/apiKeys/a595a4b5-5626-41c6-92ef-d420728c6bee", privateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIA7RllWHxLmhV3ck12EhAbrJE11Aj/76UGw7WKVxsubwoAoGCCqGSM49\nAwEHoUQDQgAEK3CePrHwqnf/NdbaOCBzanmUKX5hsg7NtEjXNPelMc168xmKB6Um\nfILb9Ng6KieTIaF4TDRMgnM3CwSk4k6rBg==\n-----END EC PRIVATE KEY-----\n" })
        console.log("Creating Wallet")

        const wallet = await Wallet.create();

        console.log("Wallet Created")

        const faucetTransaction = await wallet.faucet()

        await faucetTransaction.wait()

        console.log("Facuet Transaction")

        const address = await wallet.listAddresses()

        console.log(address[0].getId())

        await wallet.invokeContract({
            contractAddress: TokenAddress,
            method: "mint",
            args: {
                recipient: address[0].getId(),
                amount: "50"
            },
            abi: TokenAbi
        })

        console.log("Airdrop Transaction")

        await wallet.invokeContract({
            contractAddress: TokenAddress,
            method: "approve",
            args: {
                spender: SystemAddress,
                value: "50"
            },
            abi: TokenAbi
        })

        console.log("Approve Transaction")


        const data = wallet.export();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function getWallet({ walletId, seed }) {
    console.log(walletId, seed)
    // Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })
    Coinbase.configure({ apiKeyName: "organizations/f4c1400c-fa4b-4bb6-af81-193276c8d230/apiKeys/a595a4b5-5626-41c6-92ef-d420728c6bee", privateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIA7RllWHxLmhV3ck12EhAbrJE11Aj/76UGw7WKVxsubwoAoGCCqGSM49\nAwEHoUQDQgAEK3CePrHwqnf/NdbaOCBzanmUKX5hsg7NtEjXNPelMc168xmKB6Um\nfILb9Ng6KieTIaF4TDRMgnM3CwSk4k6rBg==\n-----END EC PRIVATE KEY-----\n" })

    const wallet = await Wallet.import({
        walletId,
        seed
    });

    return wallet;
}