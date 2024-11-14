import { Search, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Component() {
    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="bg-muted p-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">EsoCare</h1>
                <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                        <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <span>Apridian saputra</span>
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </header>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left sidebar */}
                <Card className="w-1/4 m-4 overflow-hidden">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Total Pasien</h2>
                        {/* Add content for total patients here */}
                    </CardContent>
                </Card>

                {/* Center panel */}
                <Card className="flex-1 m-4 flex flex-col items-center justify-center">
                    <CardContent className="text-center">
                        <h2 className="text-xl font-semibold mb-2">Periksa Pasien Baru</h2>
                        <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet consectetur.</p>
                        <Button variant="secondary">Lorem Ipsum</Button>
                    </CardContent>
                </Card>

                {/* Right sidebar */}
                <Card className="w-1/3 m-4 overflow-hidden">
                    <CardContent className="p-4">
                        <h2 className="text-lg font-semibold mb-4">Daftar Pasien</h2>
                        <div className="relative mb-4">
                            <Input type="text" placeholder="Cari Pasien" className="pl-10" />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex space-x-2 mb-4">
                            <Button variant="secondary" size="sm">
                                Semua
                            </Button>
                            <Button variant="outline" size="sm">
                                Filter
                            </Button>
                            <Button variant="outline" size="sm">
                                Filter
                            </Button>
                            <Button variant="outline" size="sm">
                                Filter
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-semibold">Minggu Ini</h3>
                            {[
                                "Keti Azura Siregar",
                                "Shintya Ayu Warung",
                                "Irma Amelia Novianto",
                                "Ikhsanudin Lari Pagi",
                                "Keti Azura Siregar",
                                "Shintya Ayu Warung",
                            ].map((name, index) => (
                                <Card key={index} className="mb-2">
                                    <CardContent className="p-3">
                                        <p className="font-semibold">{name}</p>
                                        <p className="text-sm text-muted-foreground">Perempuan 22 Tahun Stadium 4</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
