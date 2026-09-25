import React, { useState } from 'react';
import { 
  Truck, Shield, Award, ArrowRight, ArrowLeft, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  MapPin, Clock, FileText, CheckSquare, RefreshCw
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface Stop {
  city: string;
  state: string;
  facility: string;
  time: string;
}

export default function App() {
  const [step, setStep] = useState<number>(1);
  
  // Step 1: Lane Configuration
  const [origin, setOrigin] = useState('Chicago, IL');
  const [destination, setDestination] = useState('Dallas, TX');
  const [equipmentType, setEquipmentType] = useState('53ft Dry Van');
  const [miles, setMiles] = useState(924);

  // Step 2: Weight & Accessorials
  const [weight, setWeight] = useState(42000);
  const [cargoType, setCargoType] = useState('Automotive Components');
  const [hasTarp, setHasTarp] = useState(false);
  const [hasLiftgate, setHasLiftgate] = useState(false);
  const [isHazmat, setIsHazmat] = useState(false);
  const [tempRequired, setTempRequired] = useState(false);

  // Step 3: Margin & Financials
  const [shipperRate, setShipperRate] = useState(3850);
  const [carrierPay, setCarrierPay] = useState(3150);

  // Step 4: Carrier Compliance Checklist
  const [compliance, setCompliance] = useState({
    activeInsurance: true,
    safetyRatingSatisfactory: true,
    eldTrackingEnabled: true,
    w9OnDeck: true
  });

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const grossMargin = shipperRate - carrierPay;
  const marginPercent = ((grossMargin / shipperRate) * 100).toFixed(1);
  const rpmShipper = (shipperRate / miles).toFixed(2);
  const rpmCarrier = (carrierPay / miles).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0D0E12] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-black tracking-widest text-cyan-400 flex items-center gap-2 text-base">
            <Truck size={18} /> APEX INTERMODAL // MULTI-STOP LANE STEPPER & RATE WIZARD
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-semibold uppercase text-xs">ARCHETYPE C: STEPPER WIZARD</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ BROKER DESK PASS ]
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 sm:p-8 space-y-8">
        {/* Stepper Progress Bar */}
        <div className="bg-[#12141C] border border-zinc-800 p-4 sm:p-6 rounded-2xl shadow-xl font-mono">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                STAGE {step} OF 4
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-xs text-zinc-300">
                {step === 1 && "LANE & ROUTE ARCHITECTURE"}
                {step === 2 && "CARGO & ACCESSORIAL PROFILING"}
                {step === 3 && "RATE SPREAD & MARGIN SIMULATOR"}
                {step === 4 && "CARRIER COMPLIANCE & RATE CONFIRMATION"}
              </span>
            </div>
            <span className="text-xs font-bold text-cyan-400">{step * 25}% COMPLETE</span>
          </div>

          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-xs font-bold text-center">
            {['1. Lane Route', '2. Cargo Specs', '3. Margin Calc', '4. Rate Con'].map((label, i) => (
              <button
                key={label}
                onClick={() => setStep(i + 1)}
                className={`py-1.5 rounded-lg border transition-all ${
                  step === i + 1 
                    ? 'border-cyan-500 text-cyan-400 bg-cyan-950/40' 
                    : i + 1 < step 
                    ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20' 
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard Form Panels */}
        <div className="bg-[#12141C] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* STEP 1: LANE & ROUTE ARCHITECTURE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <MapPin className="text-cyan-400" /> Lane Origin & Destination Routing
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Specify origin, destination, equipment profile, and loaded hub miles.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Origin (Shipper Dock)</label>
                  <input 
                    type="text"
                    value={origin}
                    onChange={e => setOrigin(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Destination (Receiver Dock)</label>
                  <input 
                    type="text"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Equipment Profile</label>
                  <select 
                    value={equipmentType}
                    onChange={e => setEquipmentType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]"
                  >
                    <option>53ft Dry Van</option>
                    <option>53ft Multi-Temp Reefer</option>
                    <option>48ft Heavy Flatbed</option>
                    <option>48ft Step Deck / Lowboy</option>
                    <option>Hotshot 40ft Gooseneck</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Loaded Hub Miles</label>
                  <input 
                    type="number"
                    value={miles}
                    onChange={e => setMiles(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CARGO & ACCESSORIAL PROFILING */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <Layers className="text-cyan-400" /> Cargo Specifications & Accessorials
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Tag required endorsements, weight ratings, and accessorial fees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Cargo Description</label>
                  <input 
                    type="text"
                    value={cargoType}
                    onChange={e => setCargoType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Gross Weight (LBS)</label>
                  <input 
                    type="number"
                    value={weight}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white font-mono text-sm focus:border-cyan-400 outline-none min-h-[44px]" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                {[
                  { label: "Liftgate Required", state: hasLiftgate, toggle: () => setHasLiftgate(!hasLiftgate) },
                  { label: "8ft Tarp Required", state: hasTarp, toggle: () => setHasTarp(!hasTarp) },
                  { label: "Hazmat Class 9", state: isHazmat, toggle: () => setIsHazmat(!isHazmat) },
                  { label: "Temp Controlled (34°F)", state: tempRequired, toggle: () => setTempRequired(!tempRequired) }
                ].map(acc => (
                  <button
                    key={acc.label}
                    onClick={acc.toggle}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all min-h-[70px] ${
                      acc.state 
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300' 
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400'
                    }`}
                  >
                    <span>{acc.label}</span>
                    <span className="font-bold text-[11px] mt-1">{acc.state ? '✓ ACTIVE' : '+ ADD'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: RATE SPREAD & MARGIN SIMULATOR */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <DollarSign className="text-emerald-400" /> Live Margin & Rate Spread Engine
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Adjust target shipper invoice and carrier buy rate to maximize brokerage margin.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3 bg-zinc-900/80 p-5 rounded-xl border border-zinc-800">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Shipper Invoice Rate ($)</label>
                  <input 
                    type="number" 
                    step="50"
                    value={shipperRate} 
                    onChange={e => setShipperRate(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-2xl font-black text-emerald-400 font-mono" 
                  />
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>Shipper RPM:</span>
                    <span className="text-white font-bold">${rpmShipper} / mile</span>
                  </div>
                </div>

                <div className="space-y-3 bg-zinc-900/80 p-5 rounded-xl border border-zinc-800">
                  <label className="text-xs font-mono font-bold text-zinc-400 uppercase">Carrier Target Pay ($)</label>
                  <input 
                    type="number" 
                    step="50"
                    value={carrierPay} 
                    onChange={e => setCarrierPay(Number(e.target.value))}
                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-2xl font-black text-amber-400 font-mono" 
                  />
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>Carrier RPM:</span>
                    <span className="text-white font-bold">${rpmCarrier} / mile</span>
                  </div>
                </div>
              </div>

              {/* Spread Telemetry Box */}
              <div className="bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-blue-950/40 border border-emerald-500/40 p-6 rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono">
                <div>
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">Gross Brokerage Spread</div>
                  <div className="text-3xl font-black text-emerald-400 mt-1">${grossMargin.toLocaleString()} USD</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400 uppercase tracking-wider">Margin Percentage</div>
                  <div className="text-3xl font-black text-cyan-400 mt-1">{marginPercent}%</div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CARRIER COMPLIANCE & RATE CONFIRMATION */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-400" /> Carrier Compliance Checklist & Dispatch Confirmation
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Verify FMCSA compliance prerequisites before publishing the binding rate confirmation.
                </p>
              </div>

              <div className="space-y-2.5 font-mono text-sm">
                {[
                  { key: 'activeInsurance', label: 'FMCSA $1,000,000 Auto Liability & $100k Cargo Insurance Active' },
                  { key: 'safetyRatingSatisfactory', label: 'DOT Safety Rating: Satisfactory / Zero Out-of-Service Order' },
                  { key: 'eldTrackingEnabled', label: 'MacroPoint / Project44 ELD Continuous Real-Time Tracking Link' },
                  { key: 'w9OnDeck', label: 'W-9 & Direct Deposit Wire Remittance Verified' }
                ].map(item => (
                  <div 
                    key={item.key}
                    onClick={() => setCompliance(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof compliance] }))}
                    className="flex items-center gap-3 p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl cursor-pointer hover:border-cyan-500/40 transition-all"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                      compliance[item.key as keyof typeof compliance] 
                        ? 'bg-emerald-500 border-emerald-400 text-black' 
                        : 'border-zinc-700 bg-black'
                    }`}>
                      {compliance[item.key as keyof typeof compliance] && <Check size={14} className="stroke-[3]" />}
                    </div>
                    <span className="text-zinc-200 text-xs sm:text-sm">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Rate Confirmation Sheet Preview */}
              <div className="bg-black/80 border border-zinc-700 p-5 rounded-xl font-mono text-xs space-y-2 text-zinc-300">
                <div className="text-cyan-400 font-bold uppercase tracking-wider pb-2 border-b border-zinc-800 flex justify-between">
                  <span>DISPATCH RATE CONFIRMATION // LANE-{Math.floor(Math.random()*8999)+1000}</span>
                  <span className="text-emerald-400">STATUS: READY TO ISSUE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>Origin: <strong className="text-white">{origin}</strong></div>
                  <div>Destination: <strong className="text-white">{destination}</strong></div>
                  <div>Equipment: <strong className="text-white">{equipmentType}</strong></div>
                  <div>Cargo: <strong className="text-white">{cargoType} ({weight.toLocaleString()} lbs)</strong></div>
                  <div>Carrier Remittance: <strong className="text-emerald-400">${carrierPay.toLocaleString()} Flat Rate</strong></div>
                  <div>Distance: <strong className="text-white">{miles} Loaded Miles</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-zinc-800 font-mono">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold rounded-xl flex items-center gap-2 text-sm transition-all min-h-[44px]"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-black rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-cyan-500/20 min-h-[44px]"
              >
                Continue to Stage {step + 1} <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => alert(`✓ Rate Confirmation issued for ${origin} → ${destination} at $${carrierPay}! Broker Margin: $${grossMargin} (${marginPercent}%)`)}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl flex items-center gap-2 text-sm transition-all shadow-lg shadow-emerald-500/30 min-h-[44px]"
              >
                <CheckCircle2 size={18} /> ISSUE BINDING RATE CONFIRMATION
              </button>
            )}
          </div>
        </div>
      </main>

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
