// pages/_app.tsx
import type { AppProps } from "next/app"
import { Poppins } from "next/font/google"

// Configure the Poppins font
const poppins = Poppins({
    weight: ["400", "500", "700"], // Add the weights you need
    subsets: ["latin"],
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={poppins.className}>
            <Component {...pageProps} />
        </main>
    )
}
