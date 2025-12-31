import { Hammer, Timer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Maintenance() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
            <Card className="max-w-md w-full border-none shadow-md">
                <CardHeader className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-4 bg-primary/10 rounded-full animate-pulse">
                            <Hammer className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight">
                        Under Maintenance
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-center space-y-6">
                    <p className="text-muted-foreground">
                        We're currently upgrading our systems to provide you with a better experience.
                        We'll be back online shortly!
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary bg-primary/5 py-2 rounded-md">
                        <Timer className="h-4 w-4" />
                        <span>Estimated downtime: ~3 hours</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}