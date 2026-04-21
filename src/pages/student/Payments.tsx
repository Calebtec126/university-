import React, { useState } from 'react';
import { User, Payment } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Receipt, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  History,
  ShieldCheck,
  Wallet,
  ArrowRight
} from 'lucide-react';

export default function Payments({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<'pay' | 'history'>('pay');
  const [selectedFee, setSelectedFee] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const feeTypes = [
    { id: 'school_fees', name: 'School Fees (Tuition)', amount: 154500, icon: Wallet, color: 'text-primary', bg: 'bg-primary/5' },
    { id: 'departmental_fee', name: 'Departmental Levy', amount: 5000, icon: ShieldCheck, color: 'text-accent', bg: 'bg-accent/5' },
    { id: 'faculty_fee', name: 'Faculty Dues', amount: 3500, icon: Receipt, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'id_card', name: 'ID Card Processing', amount: 2500, icon: CreditCard, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const paymentHistory: Payment[] = [
    { id: 'p1', studentId: user.id, type: 'school_fees', amount: 145000, date: '2023-01-15', session: '2022/2023', status: 'paid', reference: 'PAY-OCI-8821' },
    { id: 'p2', studentId: user.id, type: 'id_card', amount: 2500, date: '2023-01-16', session: '2022/2023', status: 'paid', reference: 'PAY-OCI-8822' },
  ];

  const handlePay = () => {
    if (!selectedFee) return;
    setIsProcessing(true);
    // Simulate payment gateway
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const selectedFeeData = feeTypes.find(f => f.id === selectedFee);

  if (paymentSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12 text-center"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-50">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Payment Successful!</h2>
        <p className="text-slate-500 mt-2">Your receipt has been generated and sent to your university email.</p>
        
        <div className="mt-10 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-left">
          <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-4">
            <h3 className="font-bold text-slate-900">Payment Receipt</h3>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">OFFICIAL</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Transaction Ref</span>
              <span className="font-mono font-bold text-slate-900">OCI/7721/PAY/{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Fee Type</span>
              <span className="font-bold text-slate-900">{selectedFeeData?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount Paid</span>
              <span className="font-bold text-primary">₦{selectedFeeData?.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date</span>
              <span className="text-slate-900 font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <Download size={18} /> Download Receipt
          </button>
          <button 
            onClick={() => { setPaymentSuccess(false); setSelectedFee(null); }}
            className="px-8 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50"
          >
            Back to Payments
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Financial Services</h2>
        <p className="text-slate-500">Manage your tuition, levies, and view payment history.</p>
      </div>

      <div className="flex p-1 bg-slate-200/50 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('pay')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'pay' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
        >
          <Wallet size={18} /> Make Payment
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-primary'}`}
        >
          <History size={18} /> Payment History
        </button>
      </div>

      {activeTab === 'pay' ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feeTypes.map((fee) => (
                <div 
                  key={fee.id}
                  onClick={() => setSelectedFee(fee.id)}
                  className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group ${
                    selectedFee === fee.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className={`${fee.bg} ${fee.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <fee.icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{fee.name}</h3>
                  <p className="text-xl font-bold text-primary">₦{fee.amount.toLocaleString()}</p>
                  
                  {selectedFee === fee.id && (
                    <div className="absolute top-4 right-4 text-primary">
                      <CheckCircle2 size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
              <AlertCircle size={20} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <span className="font-bold">Important:</span> Partial payments are currently not supported for School Fees. Ensure your card limit allows for the selected transaction amount.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Checkout Summary</h3>
              
              <div className="space-y-6">
                {selectedFeeData ? (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Fee Item</span>
                        <span className="font-bold text-slate-900">{selectedFeeData.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Session</span>
                        <span className="font-bold text-slate-900">2023/2024</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-500">Conv. Charge</span>
                        <span className="font-bold text-slate-900">₦300.00</span>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Amount</span>
                        <span className="text-2xl font-bold text-primary">₦{(selectedFeeData.amount + 300).toLocaleString()}</span>
                      </div>
                      
                      <button 
                        onClick={handlePay}
                        disabled={isProcessing}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                          isProcessing 
                          ? 'bg-slate-100 text-slate-400 cursor-wait' 
                          : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02]'
                        }`}
                      >
                        {isProcessing ? 'Processing Securely...' : 'Pay Now'}
                        {!isProcessing && <ArrowRight size={18} />}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Wallet size={48} className="mx-auto text-slate-200 mb-4" />
                    <p className="text-sm text-slate-400">Select a fee from the left to continue to checkout</p>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <ShieldCheck size={14} /> Secured by Interswitch Webpay
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Fee Description</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paymentHistory.map((p) => (
                  <tr key={p.id}>
                    <td className="px-8 py-5 text-sm font-medium text-slate-500">{p.date}</td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-900 uppercase">{p.type.replace('_', ' ')}</p>
                      <p className="text-xs text-slate-400">Session: {p.session} • Ref: {p.reference}</p>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-900">₦{p.amount.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">PAID</span>
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-primary hover:underline text-xs font-bold flex items-center gap-1">
                        <Download size={14} /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
