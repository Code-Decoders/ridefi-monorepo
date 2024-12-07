// /Users/kunal/Documents/NextJSProjects/ridefi-monorepo/apps/ridefi-app/app/api/route.js

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { NextResponse } from "next/server";
export async function GET(request) {
    
    const params = request.nextUrl.searchParams

    const walletId = params.get("walletId")
    const seed = params.get("seed")


    Coinbase.configureFromJson({ filePath: "~/Downloads/cdp_api_key.json" })

    const wallet = await Wallet.import({
        walletId: walletId,
        seed: seed
    })

    console.log(await wallet.getAddress())

    return NextResponse.json(wallet)

}