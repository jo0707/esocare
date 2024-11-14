class Registration {
    name: string
    age: number
    height: number
    weight: number

    constructor(values: { name: string; age: number; height: number; weight: number }) {
        this.name = values.name
        this.age = values.age
        this.height = values.height
        this.weight = values.weight
    }
}
