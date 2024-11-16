"use client"

import { useRouter } from "next/navigation"

export default function PeriksaPage() {
    const router = useRouter()
    return router.push("/periksa/register")
}
