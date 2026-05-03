import { create } from 'zustand'
import { FormData, ExpenseBreakdown } from '@/types'

const defaultExpenses: ExpenseBreakdown = {
  food: '',
  transport: '',
  date: '',
  telecom: '',
  housing: '',
  other: '',
}

interface FormStore {
  formData: FormData
  setIncome: (v: string) => void
  setExpense: (key: keyof ExpenseBreakdown, value: string) => void
  setSavings: (v: string) => void
  setUnexpected: (v: string) => void
  setGoal: (v: string) => void
  isComplete: () => boolean
  reset: () => void
}

export const useFormStore = create<FormStore>((set, get) => ({
  formData: {
    income: '',
    expenses: { ...defaultExpenses },
    savings: '',
    unexpected: '',
    goal: '',
  },

  setIncome: (v) =>
    set((s) => ({ formData: { ...s.formData, income: v } })),

  setExpense: (key, value) =>
    set((s) => ({
      formData: {
        ...s.formData,
        expenses: { ...s.formData.expenses, [key]: value },
      },
    })),

  setSavings: (v) =>
    set((s) => ({ formData: { ...s.formData, savings: v } })),

  setUnexpected: (v) =>
    set((s) => ({ formData: { ...s.formData, unexpected: v } })),

  setGoal: (v) =>
    set((s) => ({ formData: { ...s.formData, goal: v } })),

  isComplete: () => {
    const { formData } = get()
    return !!(formData.income || Object.values(formData.expenses).some(Boolean))
  },

  reset: () =>
    set({
      formData: {
        income: '',
        expenses: { ...defaultExpenses },
        savings: '',
        unexpected: '',
        goal: '',
      },
    }),
}))
