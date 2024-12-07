"use server"
import { Coinbase, Wallet } from '@coinbase/coinbase-sdk'

export async function createWallet() {
    Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

    const wallet = await Wallet.create();

    await wallet.faucet()

    const data = wallet.export();

    return data;
}

export async function getWallet({ walletId, seed }) {
    console.log(walletId, seed)
    Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

    const wallet = await Wallet.import({
        walletId,
        seed
    });

    return wallet;
}