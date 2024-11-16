class Registration {
    name: string
    gender: string
    age: number
    height: number
    weight: number

    constructor(values: { name: string; gender: string; age: number; height: number; weight: number }) {
        this.name = values.name
        this.gender = values.gender
        this.age = values.age
        this.height = values.height
        this.weight = values.weight
    }
}
