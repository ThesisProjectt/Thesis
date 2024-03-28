import * as Network from "expo-network"
import { useState } from "react"

export default async function getIP () {
    const ip = await Network.getIpAddressAsync()
    console.log(ip);
    return ip
}