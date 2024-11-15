import type { Metadata } from "next"
import "./globals.css"
import { Inter, Poppins } from "next/font/google"

export const metadata: Metadata = {
    title: "Esocare",
    description: "",
}

// Configure the Poppins font
const poppins = Poppins({
    weight: ["400", "500", "700"], // Add the weights you need
    subsets: ["latin"],
})

const inter = Inter({
    weight: ["400", "500", "700"], // Add the weights you need
    subsets: ["latin"],
})

// Configure the Poppins font

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    )
}
