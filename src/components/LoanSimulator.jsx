import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, DollarSign } from 'lucide-react';
import { useLoanStore } from '../store/loanStore';

const LoanSimulator = () => {
  const navigate = useNavigate();
  const { loanAmount, loanDays, setLoanAmount, setLoanDays } = useLoanStore();
  
  // Local state for input handling
  const [amount, setAmount] = useState(loanAmount);
  
  // Calculation logic
  const dailyRate = 0.02; // 2% daily
  const totalAmount = amount * (1 + (dailyRate * loanDays));
  const dailyPayment = totalAmount / loanDays;
  
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const numValue = parseInt(value) || 0;
    setAmount(numValue);
    setLoanAmount(numValue);
  };
  
  const handleDaySelect = (days) => {
    setLoanDays(days);
  };
  
  const handleApply = () => {
    navigate('/aplicar');
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-background-lighter bg-background-light">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-primary">Cuota Día</h1>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {/* Headline */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold tracking-tight mb-4 text-text-primary">
              Liquidez inmediata.<br />
              Pagos diarios simples.
            </h2>
            <p className="text-xl text-text-secondary max-w-xl mx-auto">
              Solicitá el monto que necesitás y devolvelo en cuotas diarias flexibles.
            </p>
          </div>
          
          {/* Simulator Card */}
          <div className="card shadow-glow">
            {/* Amount Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-secondary mb-3">
                ¿Cuánto necesitás?
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                  <DollarSign size={24} strokeWidth={1.5} />
                </div>
                <input
                  type="text"
                  value={amount === 0 ? '' : amount.toLocaleString('es-AR')}
                  onChange={handleAmountChange}
                  placeholder="50.000"
                  className="w-full pl-14 pr-4 py-4 text-3xl font-semibold bg-background 
                           border border-background-lighter rounded-md text-text-primary
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary 
                           transition-all"
                />
              </div>
              <div className="mt-3 flex gap-2">
                {[20000, 50000, 100000, 200000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAmount(preset);
                      setLoanAmount(preset);
                    }}
                    className="px-3 py-1.5 text-sm bg-background border border-background-lighter 
                             rounded-md hover:border-primary hover:text-primary transition-all"
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Days Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Plazo de devolución
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[15, 20, 30, 45].map((days) => (
                  <button
                    key={days}
                    onClick={() => handleDaySelect(days)}
                    className={`py-4 px-4 rounded-md font-medium transition-all ${
                      loanDays === days
                        ? 'bg-primary text-white shadow-glow'
                        : 'bg-background border border-background-lighter hover:border-primary hover:text-primary'
                    }`}
                  >
                    {days} días
                  </button>
                ))}
              </div>
            </div>
            
            {/* Divider */}
            <div className="border-t border-background-lighter my-8"></div>
            
            {/* Results - Daily Payment Highlight */}
            <div className="text-center mb-8">
              <div className="text-sm text-text-secondary mb-2">Tu cuota diaria sería</div>
              <div className="text-6xl font-bold tracking-tight mb-1 text-primary">
                {formatCurrency(dailyPayment)}
              </div>
              <div className="text-sm text-text-muted">
                durante {loanDays} días
              </div>
            </div>
            
            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-background rounded-md mb-8 border border-background-lighter">
              <div>
                <div className="text-sm text-text-secondary mb-1">Recibís</div>
                <div className="text-2xl font-semibold text-text-primary">{formatCurrency(amount)}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Total a devolver</div>
                <div className="text-2xl font-semibold text-text-primary">{formatCurrency(totalAmount)}</div>
              </div>
            </div>
            
            {/* CTA */}
            <button
              onClick={handleApply}
              disabled={amount === 0}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
            >
              Solicitar ahora
              <ArrowRight size={20} />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-8 text-center text-sm text-text-muted">
            <p>Sin costos ocultos • Respuesta en 24hs • 100% online</p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-background-lighter bg-background-light py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-text-muted">
          © 2024 Cuota Día. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default LoanSimulator;