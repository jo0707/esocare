"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    icd10: z.string({
        required_error: "Please select an ICD 10 code",
    }),
    icdOSite: z.string({
        required_error: "Please select an ICD O Site",
    }),
    histologicalType: z.string({
        required_error: "Please select a histological type",
    }),
    histologicalGrade: z.string({
        required_error: "Please select a histological grade",
    }),
    tnmCategories: z
        .string({
            required_error: "TNM categories are required",
        })
        .min(1, "TNM categories cannot be empty"),
})

export default function Component() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Cancer Stage Check</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="icd10"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="ICD 10" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="c15">
                                                        C15 - Malignant neoplasm of esophagus
                                                    </SelectItem>
                                                    <SelectItem value="c16">
                                                        C16 - Malignant neoplasm of stomach
                                                    </SelectItem>
                                                    <SelectItem value="c18">
                                                        C18 - Malignant neoplasm of colon
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="icdOSite"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="ICD O Site" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="c15.3">
                                                        C15.3 - Upper third of esophagus
                                                    </SelectItem>
                                                    <SelectItem value="c15.4">
                                                        C15.4 - Middle third of esophagus
                                                    </SelectItem>
                                                    <SelectItem value="c15.5">
                                                        C15.5 - Lower third of esophagus
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="histologicalType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Primary pathology histological type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="scc">Squamous Cell Carcinoma</SelectItem>
                                                    <SelectItem value="ac">Adenocarcinoma</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="histologicalGrade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Primary pathology neoplasma hitolgical grade" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">Grade 1 - Well differentiated</SelectItem>
                                                    <SelectItem value="2">
                                                        Grade 2 - Moderately differentiated
                                                    </SelectItem>
                                                    <SelectItem value="3">Grade 3 - Poorly differentiated</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tnmCategories"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Stage event tnm categories"
                                                className="resize-none min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700">
                                Predict
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
