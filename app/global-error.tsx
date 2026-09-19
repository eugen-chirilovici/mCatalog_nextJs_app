"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError(
    {
        error,
        retry,
    }: {
        error: Error & { digest?: string }
        retry: () => void
    }
) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center mt-10 border-4 bg-red-400 rounded-3xl">
                    <h1>Upsss, seems that you got a error</h1>
                    <div>
                        <p>This is a global error page.</p>
                        <p>To generate a flow which throws an error like that, just add 5 products of the same type to the basket and access the basket page.</p>
                    </div>
                    <Button onClick={() => retry()}>Try again</Button>
                </div>
            </body>
        </html>
    )
}