
export async function GET(request) {

    const params = request.nextUrl.searchParams

    const walletId = params.get("walletId")
    const seed = params.get("seed")
    Coinbase.configure({ apiKeyName: "organizations/f4c1400c-fa4b-4bb6-af81-193276c8d230/apiKeys/a595a4b5-5626-41c6-92ef-d420728c6bee", privateKey: "-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIA7RllWHxLmhV3ck12EhAbrJE11Aj/76UGw7WKVxsubwoAoGCCqGSM49\nAwEHoUQDQgAEK3CePrHwqnf/NdbaOCBzanmUKX5hsg7NtEjXNPelMc168xmKB6Um\nfILb9Ng6KieTIaF4TDRMgnM3CwSk4k6rBg==\n-----END EC PRIVATE KEY-----\n" })

    const wallet = await Wallet.import({
        walletId: walletId,
        seed: seed
    })

    const addresses = await wallet.listAddresses()

    const address = addresses[0].getId()

    return NextResponse.json({
        address: address
    })

}