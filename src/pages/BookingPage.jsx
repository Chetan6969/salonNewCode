import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Moon, ArrowLeft, Settings, Mail, MessageSquare, Check, AlertCircle, X } from 'lucide-react';
import { servicesData } from '../components/Services';
import { sendBookingNotifications, getNotificationConfig, saveNotificationConfig } from '../services/notificationService';

const STYLISTS = [
  { id: 'st-lucky', name: 'Lucky Sen', role: 'Head Grooming Expert / Master Stylist', rating: '4.9', exp: '8 yrs exp' },
  { id: 'st-chetan', name: 'Chetan Sen', role: 'Senior Stylist & Hair Care Specialist', rating: '4.9', exp: '6 yrs exp' },
  { id: 'st-kishan', name: 'Kishan Sen', role: 'Senior Colorist & Chemical Expert', rating: '4.8', exp: '5 yrs exp' },
  { id: 'st-chiranjeev', name: 'Chiranjeev Sen', role: 'Beard Design & Detailing Expert', rating: '4.8', exp: '5 yrs exp' },
];

const TIME_SLOTS = [
  { time: '10:00 AM', value: '10:00', isNight: false },
  { time: '11:30 AM', value: '11:30', isNight: false },
  { time: '01:00 PM', value: '13:00', isNight: false },
  { time: '02:30 PM', value: '14:30', isNight: false },
  { time: '04:00 PM', value: '16:00', isNight: false },
  { time: '05:30 PM', value: '17:30', isNight: false },
  { time: '07:00 PM', value: '19:00', isNight: false },
  { time: '08:30 PM', value: '20:30', isNight: true }, // Night surcharge active
  { time: '09:30 PM', value: '21:30', isNight: true }, // Night surcharge active
  { time: '10:00 PM', value: '22:00', isNight: true }, // Night surcharge active
];

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId, faceShape } = location.state || {};

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '' });
  const [bookingRef, setBookingRef] = useState('');

  // Notification States
  const [notificationResult, setNotificationResult] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsConfig, setSettingsConfig] = useState({
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    customWebhookUrl: ''
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Load config on mount
  useEffect(() => {
    setSettingsConfig(getNotificationConfig());
  }, []);

  // Extract all services flat for easy search
  const flatServices = servicesData.reduce((acc, cat) => [...acc, ...cat.items], []);

  // Handle service pre-population from router state
  useEffect(() => {
    if (serviceId) {
      const match = flatServices.find(s => s.id === serviceId);
      if (match && !selectedServices.find(s => s.id === match.id)) {
        setSelectedServices([match]);
      }
    }
  }, [serviceId]);

  // Handle face scanner recommendations pre-population from router state
  useEffect(() => {
    if (faceShape) {
      let recommendedIds = [];
      if (faceShape === 'Oval' || faceShape === 'Diamond') {
        recommendedIds = ['haircut-advance', 'trim-set'];
      } else if (faceShape === 'Round') {
        recommendedIds = ['haircut-advance', 'trim-set'];
      } else if (faceShape === 'Square') {
        recommendedIds = ['haircut', 'clean-shave'];
      }
      const recommendedServices = flatServices.filter(s => recommendedIds.includes(s.id));
      setSelectedServices(recommendedServices);
    }
  }, [faceShape]);

  const toggleService = (service) => {
    const isSelected = selectedServices.some(s => s.id === service.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedServices.length === 0) return;
    if (step === 2 && (!bookingDate || !selectedTimeSlot)) return;
    if (step === 3 && !selectedStylist) return;
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Calculate pricing breakdown
  const rawSubtotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const hasHaircut = selectedServices.some(s => s.id === 'haircut');
  const hasBeard = selectedServices.some(s => s.id === 'trim-set');
  const hasComboDiscount = hasHaircut && hasBeard;
  const comboDiscountAmount = hasComboDiscount ? 50 : 0;
  const basePrice = rawSubtotal - comboDiscountAmount;

  const isNightChargeActive = selectedTimeSlot?.isNight || false;
  const surcharge = isNightChargeActive ? Math.round(basePrice * 0.25) : 0;
  const grandTotal = basePrice + surcharge;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.phone || !clientInfo.email) return;
    
    // Generate simulated booking code
    const randomRef = 'HS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep(5);

    // Call notification service
    const bookingDetails = {
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      clientPhone: clientInfo.phone,
      bookingRef: randomRef,
      bookingDate: bookingDate,
      bookingTime: selectedTimeSlot?.time,
      stylist: selectedStylist?.name,
      services: selectedServices,
      grandTotal: grandTotal
    };

    try {
      const result = await sendBookingNotifications(bookingDetails);
      setNotificationResult(result);
    } catch (err) {
      console.error("Notifications trigger failed:", err);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedServices([]);
    setBookingDate('');
    setSelectedTimeSlot(null);
    setClientInfo({ name: '', email: '', phone: '' });
    setBookingRef('');
    navigate('/services');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#121214]">
      <div className="container max-w-3xl">
        
        {/* Back navigation button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs text-[#a0a0a0] hover:text-white mb-6 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>

        {/* Form Card */}
        <div className="w-full bg-[#18181b] border border-white/10 rounded-lg overflow-hidden shadow-2xl relative flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#222226]">
            <div className="text-left">
              <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                {step === 5 ? 'Booking Confirmed' : 'Book Premium Session'}
              </h3>
              {step < 5 && (
                <span className="text-[0.65rem] tracking-widest text-[#a0a0a0] font-bold uppercase">
                  Step {step} of 4 &bull; {step === 1 ? 'Services' : step === 2 ? 'Schedule' : step === 3 ? 'Stylist' : 'Summary'}
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {step < 5 && (
            <div className="w-full bg-white/5 h-1">
              <div 
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          {/* Body Content */}
          <div className="p-6 md:p-8 text-left">
            
            {/* STEP 1: SELECT SERVICES */}
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h4 className="font-semibold text-sm text-[#a0a0a0] tracking-widest uppercase mb-2">
                  Choose Unisex Treatments
                </h4>
                <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-1">
                  {servicesData.map((category) => (
                    <div key={category.category} className="flex flex-col gap-2">
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1">
                        {category.category}
                      </span>
                      {category.items.map((service) => {
                        const isChecked = selectedServices.some(s => s.id === service.id);
                        return (
                          <div 
                            key={service.id}
                            onClick={() => toggleService(service)}
                            className={`p-3.5 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${
                              isChecked 
                                ? 'bg-white/5 border-white/30' 
                                : 'bg-white/2 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="max-w-[80%]">
                              <span className="text-sm font-semibold text-white block">{service.name}</span>
                              <span className="text-[0.65rem] text-[#a0a0a0]">{service.duration} &bull; {service.desc.substring(0, 70)}...</span>
                            </div>
                            <span className="font-bold text-sm text-white">
                              ₹{service.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SELECT DATE & TIME */}
            {step === 2 && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h4 className="font-semibold text-sm text-[#a0a0a0] tracking-widest uppercase">
                  Select Date & Time Slot
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-xs text-[#a0a0a0] font-semibold tracking-wider block mb-2.5 uppercase">
                      Select Date
                    </label>
                    <input 
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-[#222226] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/35"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-[#a0a0a0] font-semibold tracking-wider block mb-2.5 uppercase">
                      Available Time Slots
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold tracking-wide flex items-center justify-between transition-all ${
                            selectedTimeSlot?.time === slot.time
                              ? 'bg-white text-black border-white'
                              : 'bg-white/2 border-white/5 text-white hover:border-white/15'
                          }`}
                        >
                          <span>{slot.time}</span>
                          {slot.isNight && (
                            <Moon className={`w-3.5 h-3.5 ${
                              selectedTimeSlot?.time === slot.time ? 'text-black' : 'text-indigo-400'
                            }`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic Surcharge alert warning */}
                {isNightChargeActive && (
                  <div className="bg-indigo-950/35 border border-indigo-500/20 p-4 rounded-lg flex items-center gap-3 animate-pulse">
                    <Moon className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-indigo-400">Night Surcharge Active (+25%)</h5>
                      <p className="text-[0.65rem] text-[#a0a0a0] leading-relaxed">
                        Your chosen time is after 8:00 PM. A 25% late shift fee is automatically added to this appointment.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: SELECT STYLIST */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h4 className="font-semibold text-sm text-[#a0a0a0] tracking-widest uppercase">
                  Choose Grooming Specialist
                </h4>
                <div className="flex flex-col gap-4">
                  {STYLISTS.map((stylist) => (
                    <div
                      key={stylist.id}
                      onClick={() => setSelectedStylist(stylist)}
                      className={`p-4 rounded-lg border cursor-pointer flex justify-between items-center transition-all ${
                        selectedStylist?.id === stylist.id
                          ? 'bg-white/5 border-white/30'
                          : 'bg-white/2 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white">
                          {stylist.name.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">{stylist.name}</span>
                          <span className="text-[0.65rem] text-[#a0a0a0]">{stylist.role}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-white font-bold block">{stylist.rating} ★</span>
                        <span className="text-[0.6rem] text-[#666666]">{stylist.exp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT INFO & SUMMARY */}
            {step === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-in">
                
                {/* Contact Info Form */}
                <form onSubmit={handleConfirmBooking} className="md:col-span-7 flex flex-col gap-4">
                  <h4 className="font-semibold text-sm text-[#a0a0a0] tracking-widest uppercase mb-1">
                    Customer Credentials
                  </h4>
                  
                  <div>
                    <label className="text-[0.65rem] text-[#a0a0a0] font-bold tracking-wider block mb-1.5 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your name"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      className="w-full bg-[#222226] border border-white/10 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[0.65rem] text-[#a0a0a0] font-bold tracking-wider block mb-1.5 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      className="w-full bg-[#222226] border border-white/10 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div>
                    <label className="text-[0.65rem] text-[#a0a0a0] font-bold tracking-wider block mb-1.5 uppercase">Mobile Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Enter phone number"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      className="w-full bg-[#222226] border border-white/10 rounded-lg p-2.5 text-white text-xs focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <button type="submit" id="confirm-booking-btn" className="hidden" />
                </form>

                {/* Price Breakdown Panel */}
                <div className="md:col-span-5 bg-white/2 border border-white/5 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-[#a0a0a0] tracking-widest uppercase mb-4 border-b border-white/5 pb-2">
                      Booking Summary
                    </h4>
                    
                    {/* Selected Services mini-list */}
                    <div className="flex flex-col gap-2.5 mb-4">
                      {selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between items-center text-xs">
                          <span className="text-[#a0a0a0]">{s.name}</span>
                          <span className="text-white font-medium">₹{s.price}</span>
                        </div>
                      ))}
                    </div>

                    {/* Date/Stylist Mini Summary */}
                    <div className="border-t border-white/5 pt-3 mb-4 flex flex-col gap-1.5 text-[0.65rem] text-[#666666]">
                      <div>DATE: <span className="text-white font-medium">{bookingDate}</span> AT <span className="text-white font-medium">{selectedTimeSlot?.time}</span></div>
                      <div>ARTIST: <span className="text-white font-medium">{selectedStylist?.name}</span></div>
                    </div>
                  </div>

                  {/* Surcharge details */}
                  <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#a0a0a0]">Subtotal:</span>
                      <span className="text-white font-medium">₹{rawSubtotal}</span>
                    </div>
                    {hasComboDiscount && (
                      <div className="flex justify-between items-center text-xs text-emerald-400">
                        <span>Haircut + Beard Combo:</span>
                        <span className="font-medium">-₹50</span>
                      </div>
                    )}
                    {isNightChargeActive && (
                      <div className="flex justify-between items-center text-xs text-indigo-400">
                        <span className="flex items-center gap-1">Night Charge (25%): <Moon className="w-3 h-3" /></span>
                        <span className="font-medium">+₹{surcharge}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-bold border-t border-white/5 pt-2 text-white">
                      <span>Total Bill:</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 5: BOOKING CONFIRMED */}
            {step === 5 && (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">
                  Booking Reference {bookingRef}
                </h4>
                <p className="text-xs text-[#a0a0a0] max-w-sm mb-6 leading-relaxed">
                  Thank you <span className="text-white font-semibold">{clientInfo.name}</span>. 
                  Your unisex grooming session has been successfully locked for <span className="text-white">{bookingDate}</span> at <span className="text-white font-semibold">{selectedTimeSlot?.time}</span> with <span className="text-white font-semibold">{selectedStylist?.name}</span>.
                </p>

                {/* Digital Premium Ticket design */}
                <div className="w-full max-w-sm bg-[#26262a] border border-white/5 p-5 rounded-lg text-left relative overflow-hidden mb-6">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                  <div className="border-b border-dashed border-white/10 pb-3 mb-3">
                    <span className="text-[0.6rem] tracking-[0.25em] text-[#666666] font-bold block mb-1">HE & SHE SALON</span>
                    <span className="text-xs font-semibold text-white">Grooming Pass</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-[0.65rem] mb-4">
                    <div>
                      <span className="text-[#666666] block">STYLIST</span>
                      <span className="text-white font-medium">{selectedStylist?.name}</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">SERVICES</span>
                      <span className="text-white font-medium">{selectedServices.map(s=>s.name.split(' ')[0]).join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">DATE & TIME</span>
                      <span className="text-white font-medium">{bookingDate} &bull; {selectedTimeSlot?.time}</span>
                    </div>
                    <div>
                      <span className="text-[#666666] block">TOTAL BILL</span>
                      <span className="text-white font-bold">₹{grandTotal}</span>
                    </div>
                  </div>
                  <div className="text-[0.55rem] text-[#a0a0a0] italic text-center border-t border-white/5 pt-2">
                    Please show this digital pass on arrival. Surcharge included where applicable.
                  </div>
                </div>

                {/* Notification Delivery Feedback Panel */}
                {notificationResult && (
                  <div className="w-full max-w-sm bg-white/2 border border-white/10 rounded-lg p-5 text-left mb-8">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                      <span className="text-[0.65rem] tracking-wider text-[#a0a0a0] font-bold uppercase flex items-center gap-1.5">
                        {notificationResult.isSimulated ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                            Notification logs (Simulated)
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Notification status (Live)
                          </>
                        )}
                      </span>
                      <button 
                        onClick={() => setShowSettingsModal(true)} 
                        className="text-[0.6rem] text-white hover:underline flex items-center gap-1 uppercase font-semibold"
                      >
                        <Settings className="w-3 h-3" />
                        Configure APIs
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      {notificationResult.logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs">
                          {log.type === 'email' ? (
                            <Mail className="w-4 h-4 text-zinc-400 mt-0.5" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-zinc-400 mt-0.5" />
                          )}
                          <div>
                            <span className={`font-bold block uppercase text-[0.6rem] ${
                              log.status === 'success' ? 'text-emerald-400' : log.status === 'error' ? 'text-red-400' : 'text-amber-400'
                            }`}>
                              {log.type} notification
                            </span>
                            <p className="text-[0.7rem] text-[#a0a0a0] leading-normal">{log.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={resetForm} 
                  className="btn-primary py-2.5 px-6 text-xs"
                >
                  Done
                </button>
              </div>
            )}

          </div>

          {/* Footer Navigation (Step buttons) */}
          {step < 5 && (
            <div className="p-6 border-t border-white/5 flex justify-between items-center bg-[#222226]">
              {step > 1 ? (
                <button 
                  onClick={handlePrevStep}
                  className="btn-secondary py-2 px-5 text-xs flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button 
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && selectedServices.length === 0) ||
                    (step === 2 && (!bookingDate || !selectedTimeSlot))
                  }
                  className="btn-primary py-2 px-5 text-xs flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button 
                  onClick={() => document.getElementById('confirm-booking-btn')?.click()}
                  disabled={!clientInfo.name || !clientInfo.phone || !clientInfo.email}
                  className="btn-primary py-2 px-5 text-xs flex items-center gap-1 bg-white text-black hover:bg-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirm & Lock Booking
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

        </div>

        {/* API Settings Modal */}
        {showSettingsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#18181b] border border-white/10 rounded-lg max-w-md w-full p-6 text-left shadow-2xl relative">
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-4 right-4 text-[#a0a0a0] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="font-serif text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-zinc-400" />
                Integration Settings
              </h3>
              <p className="text-[0.7rem] text-[#a0a0a0] mb-5 leading-relaxed">
                Connect your salon email via **EmailJS** and client messaging via a **Custom Webhook** to send live confirmations.
              </p>
              
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <label className="text-[0.65rem] font-bold text-[#a0a0a0] block mb-1 uppercase">EmailJS Service ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. service_xxxxxx"
                    value={settingsConfig.emailjsServiceId}
                    onChange={(e) => setSettingsConfig({ ...settingsConfig, emailjsServiceId: e.target.value })}
                    className="w-full bg-[#222226] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-bold text-[#a0a0a0] block mb-1 uppercase">EmailJS Template ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. template_xxxxxx"
                    value={settingsConfig.emailjsTemplateId}
                    onChange={(e) => setSettingsConfig({ ...settingsConfig, emailjsTemplateId: e.target.value })}
                    className="w-full bg-[#222226] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-bold text-[#a0a0a0] block mb-1 uppercase">EmailJS Public Key</label>
                  <input 
                    type="text" 
                    placeholder="e.g. user_xxxxxxxxx"
                    value={settingsConfig.emailjsPublicKey}
                    onChange={(e) => setSettingsConfig({ ...settingsConfig, emailjsPublicKey: e.target.value })}
                    className="w-full bg-[#222226] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-bold text-[#a0a0a0] block mb-1 uppercase">SMS Webhook URL</label>
                  <input 
                    type="url" 
                    placeholder="e.g. https://api.yourdomain.com/sms-webhook"
                    value={settingsConfig.customWebhookUrl}
                    onChange={(e) => setSettingsConfig({ ...settingsConfig, customWebhookUrl: e.target.value })}
                    className="w-full bg-[#222226] border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-white/30"
                  />
                  <span className="text-[0.55rem] text-[#666666] leading-tight block mt-1">
                    Your frontend app will POST the phone number and SMS body to this URL.
                  </span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowSettingsModal(false)}
                  className="btn-secondary py-1.5 px-4 text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setIsSavingSettings(true);
                    saveNotificationConfig(settingsConfig);
                    setTimeout(() => {
                      setIsSavingSettings(false);
                      setShowSettingsModal(false);
                    }, 500);
                  }}
                  className="btn-primary py-1.5 px-4 text-xs"
                >
                  {isSavingSettings ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
