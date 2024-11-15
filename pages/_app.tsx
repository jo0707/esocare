// pages/_app.tsx
import type { AppProps } from "next/app"
import { Inter, Poppins } from "next/font/google"

// Configure the Poppins font
const poppins = Poppins({
    weight: ["400", "500", "700"], // Add the weights you need
    subsets: ["latin"],
})

const inter = Inter({
    weight: ["400", "500", "700"], // Add the weights you need
    subsets: ["latin"],
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={inter.className}>
            <Component {...pageProps} />
        </main>
    )
}
