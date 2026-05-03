import { create } from 'zustand'
import { FormData, FormField } from '@/types'

const emptyForm: FormData = {
  age: '',
  assets: '',
  debt: '',
  goalEndOfYear: '',
  goalIn4Years: '',
  goalAt30: '',
  expenses: '',
  housing: '',
  parentSupport: '',
  income: '',
  freeTime: '',
  etc: '',
}

interface FormStore {
  formData: FormData
  setField: (field: FormField, value: string) => void
  isComplete: () => boolean
  reset: () => void
}

export const useFormStore = create<FormStore>((set, get) => ({
  formData: { ...emptyForm },

  setField: (field, value) =>
    set((s) => ({ formData: { ...s.formData, [field]: value } })),

  isComplete: () => {
    const { formData } = get()
    const required: FormField[] = ['age', 'assets', 'debt', 'expenses']
    return required.some((f) => formData[f].trim().length > 0)
  },

  reset: () => set({ formData: { ...emptyForm } }),
}))
