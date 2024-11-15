export class Stage {
    icd10: string
    icdOSite: string
    histologicalType: string
    histologicalGrade: string
    tnmCategories: string

    constructor() {
        this.icd10 = ""
        this.icdOSite = ""
        this.histologicalType = ""
        this.histologicalGrade = ""
        this.tnmCategories = ""
    }
}

// create StageScaled class
export interface StageScaled {
    icd10: number
    icdOSite: number
    histologicalType: number
    histologicalGrade: number
    tnmCategories: number
}

export interface StageResult {
    icd10: number
    icdOSite: number
    histologicalType: number
    histologicalGrade: number
    tnmCategories: number
    result: number[]
}

export const stages = [
    "Stage I",
    "Stage IA",
    "Stage IB",
    "Stage II",
    "Stage IIA",
    "Stage IIB",
    "Stage III",
    "Stage IIIA",
    "Stage IIIB",
    "Stage IIIC",
    "Stage IV",
    "Stage IVA",
]
