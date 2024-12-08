"use server"
import { Coinbase, Wallet } from '@coinbase/coinbase-sdk'
import { SystemAddress, SystemAbi, TokenAddress, TokenAbi } from '../api/abi';
import BigNumber from 'bignumber.js';

export async function createWallet() {
    try {
        Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

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
    Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

    const wallet = await Wallet.import({
        walletId,
        seed
    });

    return wallet;
}