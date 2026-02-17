import { create } from 'zustand';

export const useLoanStore = create((set) => ({
  // Loan simulation state
  loanAmount: 50000,
  loanDays: 30,
  dailyRate: 0.02, // 2% daily
  
  setLoanAmount: (amount) => set({ loanAmount: amount }),
  setLoanDays: (days) => set({ loanDays: days }),
  
  // Calculated values
  getTotalAmount: (state) => {
    const { loanAmount, loanDays, dailyRate } = state;
    return loanAmount * (1 + (dailyRate * loanDays));
  },
  
  getDailyPayment: (state) => {
    const totalAmount = state.getTotalAmount(state);
    return totalAmount / state.loanDays;
  },
  
  // Application form state
  applicantData: {
    // Step 1: Personal data
    fullName: '',
    dni: '',
    email: '',
    phone: '',
    
    // Step 2: Economic data
    occupation: '',
    dailyIncome: '',
  },
  
  currentStep: 1,
  
  setApplicantData: (data) => set((state) => ({
    applicantData: { ...state.applicantData, ...data }
  })),
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  resetApplication: () => set({
    currentStep: 1,
    applicantData: {
      fullName: '',
      dni: '',
      email: '',
      phone: '',
      occupation: '',
      dailyIncome: '',
    }
  }),
}));
