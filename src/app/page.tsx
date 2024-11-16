"use client"

import { FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const validateLogin = (event: any) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        if (username === "dokter" && password === "dokter") {
            router.push("/dashboard")
        } else {
            setError("Invalid username or password")
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100"
            style={{ fontFamily: "Poppins, sans-serif" }}
        >
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center text-violet-500">
                        <h1>
                            <b>Eso</b>Care
                        </h1>
                    </CardTitle>
                    <p className="text-center text-gray-600">Login to your account</p>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={validateLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="dokter" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="dokter"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button type="submit" className="w-full bg-violet-500">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
