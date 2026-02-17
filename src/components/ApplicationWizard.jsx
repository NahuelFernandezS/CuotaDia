import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLoanStore } from '../store/loanStore';

const ApplicationWizard = () => {
  const navigate = useNavigate();
  const { 
    loanAmount, 
    loanDays, 
    currentStep, 
    setCurrentStep, 
    applicantData, 
    setApplicantData 
  } = useLoanStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: applicantData
  });
  
  // Calculation for display
  const dailyRate = 0.02;
  const totalAmount = loanAmount * (1 + (dailyRate * loanDays));
  const dailyPayment = totalAmount / loanDays;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const handleNext = (data) => {
    setApplicantData(data);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };
  
  const handleFinalSubmit = (data) => {
    setApplicantData(data);
    // Here you would send data to your backend
    console.log('Application submitted:', { ...applicantData, ...data });
    alert('¡Solicitud enviada con éxito! Te contactaremos en 24hs.');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-background-light border-b border-background-lighter">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-primary">Cuota Día</h1>
        </div>
      </header>
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-primary">
                Paso {currentStep} de 3
              </span>
              <span className="text-sm text-text-secondary">
                {currentStep === 1 && 'Datos personales'}
                {currentStep === 2 && 'Información económica'}
                {currentStep === 3 && 'Confirmación'}
              </span>
            </div>
            <div className="h-1 bg-background-light rounded-full overflow-hidden border border-background-lighter">
              <div 
                className="h-full bg-primary transition-all duration-300 shadow-glow"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Form Card */}
          <div className="card shadow-glow">
            {/* Step 1: Personal Data */}
            {currentStep === 1 && (
              <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">
                    Contanos sobre vos
                  </h2>
                  <p className="text-text-secondary">
                    Necesitamos algunos datos básicos para procesar tu solicitud.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Nombre completo *
                  </label>
                  <input
                    {...register('fullName', { 
                      required: 'Este campo es obligatorio',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                    })}
                    type="text"
                    placeholder="Juan Pérez"
                    className={`input-field ${errors.fullName ? 'error' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-error">{errors.fullName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    DNI *
                  </label>
                  <input
                    {...register('dni', { 
                      required: 'Este campo es obligatorio',
                      pattern: { value: /^[0-9]{7,8}$/, message: 'DNI inválido' }
                    })}
                    type="text"
                    placeholder="12345678"
                    className={`input-field ${errors.dni ? 'error' : ''}`}
                  />
                  {errors.dni && (
                    <p className="mt-1 text-sm text-error">{errors.dni.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Este campo es obligatorio',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                        message: 'Email inválido' 
                      }
                    })}
                    type="email"
                    placeholder="juan@ejemplo.com"
                    className={`input-field ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Celular *
                  </label>
                  <input
                    {...register('phone', { 
                      required: 'Este campo es obligatorio',
                      pattern: { 
                        value: /^[0-9]{10}$/, 
                        message: 'Formato: 1134567890 (sin espacios)' 
                      }
                    })}
                    type="tel"
                    placeholder="1134567890"
                    className={`input-field ${errors.phone ? 'error' : ''}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                  )}
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    Continuar
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 2: Economic Data */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmit(handleNext)} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">
                    Tu situación económica
                  </h2>
                  <p className="text-text-secondary">
                    Necesitamos entender tu capacidad de pago para ofrecerte las mejores condiciones.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Ocupación *
                  </label>
                  <input
                    {...register('occupation', { 
                      required: 'Este campo es obligatorio',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                    })}
                    type="text"
                    placeholder="Comerciante, freelancer, empleado..."
                    className={`input-field ${errors.occupation ? 'error' : ''}`}
                  />
                  {errors.occupation && (
                    <p className="mt-1 text-sm text-error">{errors.occupation.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Ingreso promedio diario estimado *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      $
                    </span>
                    <input
                      {...register('dailyIncome', { 
                        required: 'Este campo es obligatorio',
                        min: { value: 1000, message: 'Ingreso mínimo: $1.000' }
                      })}
                      type="number"
                      placeholder="5000"
                      className={`input-field pl-8 ${errors.dailyIncome ? 'error' : ''}`}
                    />
                  </div>
                  {errors.dailyIncome && (
                    <p className="mt-1 text-sm text-error">{errors.dailyIncome.message}</p>
                  )}
                  <p className="mt-2 text-sm text-text-muted">
                    Este dato nos ayuda a evaluar tu capacidad de pago. Será tratado con total confidencialidad.
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    Continuar
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
            
            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <form onSubmit={handleSubmit(handleFinalSubmit)} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2 text-text-primary">
                    Confirmá tu solicitud
                  </h2>
                  <p className="text-text-secondary">
                    Revisá los detalles antes de enviar tu solicitud.
                  </p>
                </div>
                
                {/* Loan Summary */}
                <div className="bg-background border border-background-lighter rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-text-primary">Resumen del préstamo</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Monto solicitado</span>
                      <span className="font-semibold text-text-primary">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Plazo</span>
                      <span className="font-semibold text-text-primary">{loanDays} días</span>
                    </div>
                    <div className="border-t border-background-lighter pt-3 mt-3">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-text-primary">Cuota diaria</span>
                        <span className="font-bold text-primary">{formatCurrency(dailyPayment)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total a devolver</span>
                      <span className="font-semibold text-text-primary">{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Personal Data Summary */}
                <div className="bg-background border border-background-lighter rounded-lg p-6">
                  <h3 className="font-semibold mb-4 text-text-primary">Tus datos</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-text-secondary block mb-1">Nombre</span>
                      <span className="font-medium text-text-primary">{applicantData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block mb-1">DNI</span>
                      <span className="font-medium text-text-primary">{applicantData.dni}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block mb-1">Email</span>
                      <span className="font-medium text-text-primary">{applicantData.email}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block mb-1">Celular</span>
                      <span className="font-medium text-text-primary">{applicantData.phone}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block mb-1">Ocupación</span>
                      <span className="font-medium text-text-primary">{applicantData.occupation}</span>
                    </div>
                  </div>
                </div>
                
                {/* Terms acceptance */}
                <div className="flex items-start gap-3">
                  <input
                    {...register('termsAccepted', { required: true })}
                    type="checkbox"
                    id="terms"
                    className="mt-1 accent-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-text-secondary">
                    Acepto los términos y condiciones del servicio. Entiendo que debo devolver 
                    {' '}{formatCurrency(dailyPayment)} por día durante {loanDays} días.
                  </label>
                </div>
                {errors.termsAccepted && (
                  <p className="text-sm text-error -mt-4">Debes aceptar los términos</p>
                )}
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-outline flex items-center gap-2"
                  >
                    <ArrowLeft size={18} />
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    Enviar solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationWizard;