// /Users/kunal/Documents/NextJSProjects/ridefi-monorepo/apps/ridefi-app/app/api/route.js

import { Coinbase, readContract, Wallet } from "@coinbase/coinbase-sdk";
import { NextResponse } from "next/server";
import { SystemAddress, TokenAbi, TokenAddress, SystemAbi } from './abi'


// export async function GET(request) {

//     const params = request.nextUrl.searchParams

//     const walletId = params.get("walletId")
//     const seed = params.get("seed")
//     Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

//     const wallet = await Wallet.import({
//         walletId: walletId,
//         seed: seed
//     })

//     const addresses = await wallet.listAddresses()

//     const address = addresses[0].getId()

//     try {
//         const result = await readContract({
//             networkId: "base-sepholia",
//             abi: SystemAbi,
//             contractAddress: SystemAddress,
//             method: "trips",
//             args: { address: address },
//         });

//         return NextResponse.json({
//             trips: result
//         })
//     } catch (error) {
//         console.log(error)
//     }

// }

export async function POST(request) {

    const { walletId, seed, method, endPosition } = await request.json();


    Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

    const wallet = await Wallet.import({
        walletId: walletId,
        seed: seed
    })


    switch (method) {
        case "startTrip":
            try {
                var contract = await wallet.invokeContract({
                    contractAddress: SystemAddress,
                    method: "startTrip",
                    args: {},
                    abi: SystemAbi,
                });
                await contract.wait();
            } catch (error) {
                console.log(error)
            }
            break;
        case "endTrip":
            await wallet.invokeContract({
                contractAddress: SystemAddress,
                method: "endTrip",
                args: {
                    endPosition: endPosition.toString(),
                },
                abi: SystemAbi,
            });
        default:
            break;
    }

    return NextResponse.json({})

}