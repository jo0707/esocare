"use client"

import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PredictionResultDialog ({
    open = true,
    onOpenChange,
    data,
}: {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    data: Patient
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Prediction Results</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6">
                    <Card className="border-purple-100">
                        <CardContent className="pt-6">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Patient Name</p>
                                        <p className="font-medium">{data.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Age</p>
                                        <p className="font-medium">{data.age} years</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Gender</p>
                                        <p className="font-medium">{data.gender === "1" ? "Male" : "Female"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">BMI</p>
                                        <p className="font-medium">{data.bmi.toFixed(1)}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Prediction Results */}
                    <div className="grid gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Cancer Stage</h4>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-900">
                                            {data.stage}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">Treatment Response</h4>
                                    <Badge variant="outline" className="border-purple-200">
                                        {data.treatmentResponse}
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Survival Rate</h4>
                                        <span className="text-sm text-muted-foreground">
                                            {(data.survival * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <Progress value={data.survival * 100} className="h-2 bg-purple-100" />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Recurrence Rate</h4>
                                        <span className="text-sm text-muted-foreground">
                                            {(data.recurrence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <Progress value={data.recurrence * 100} className="h-2 bg-purple-100" />
                                </div>
                            </div>
                        </div>

                        {/* Warning Note */}
                        <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                            <AlertCircle className="h-4 w-4" />
                            <p>
                                This prediction is based on statistical models and should be used as a reference only.
                                Please consult with your healthcare provider for medical decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
