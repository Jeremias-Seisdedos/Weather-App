import { useEffect, useRef, useState } from 'react';
import type { Units } from '../utils/Props';

function Navbar({ units, onChange }: { units: Units; onChange: (u: Units) => void }) {
    const [unitsMenuOpen, setUnitsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setUnitsMenuOpen(false);
            }
        }
        if (unitsMenuOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [unitsMenuOpen]);

    const switchToMetric = () => onChange({ temp: 'c', wind: 'kmh', precip: 'mm' });
    const switchToImperial = () => onChange({ temp: 'f', wind: 'mph', precip: 'in' });

    const isImperial = units.temp === 'f' && units.wind === 'mph' && units.precip === 'in';

    const itemClass = (active: boolean) =>
        `w-full flex items-center justify-between px-3 py-2 rounded-lg font-dm-sans text-gray-200 hover:bg-[#1a1a3a] ${active ? 'bg-[#1a1a3a]' : ''}`;

    return (
        <nav className="flex justify-between items-center p-3 sm:p-4">
            <img src="/images/logo.svg" alt="Logo" className="h-7 sm:h-8" />

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setUnitsMenuOpen((s) => !s)}
                    className="bg-gray-800 border border-transparent text-white py-1.5 px-3 rounded cursor-pointer flex items-center hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
                >
                    <img src="/images/icon-units.svg" alt="units" className="inline pr-1 sm:pr-2 w-4 h-4 sm:w-5 sm:h-5" />
                    <p className="font-bricolage-grotesque whitespace-nowrap">Units</p>
                    <img src="/images/icon-dropdown.svg" alt="arrow" className="inline px-1 w-3 h-3 sm:w-4 sm:h-4" />
                </button>

                {unitsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#0a0a33] border border-gray-600 rounded-xl p-2 sm:p-3 shadow-xl z-40 max-h-[80vh] overflow-y-auto">
                        
                        <button
                            onClick={isImperial ? switchToMetric : switchToImperial}
                            className="w-full mb-2 px-3 py-2 rounded-lg bg-[#505079] text-white font-dm-sans hover:bg-[#606091] text-sm sm:text-base"
                        >
                            {isImperial ? 'Switch to Metric' : 'Switch to Imperial'}
                        </button>

                        
                        <div className="mb-2 sm:mb-3">
                            <h4 className="text-gray-400 font-dm-sans mb-1 text-sm sm:text-base">Temperature</h4>
                            <button
                                onClick={() => onChange({ ...units, temp: 'c' })}
                                className={itemClass(units.temp === 'c')}
                            >
                                <span className="text-sm sm:text-base">Celsius (°C)</span>
                                {units.temp === 'c' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, temp: 'f' })}
                                className={itemClass(units.temp === 'f')}
                            >
                                <span className="text-sm sm:text-base">Fahrenheit (°F)</span>
                                {units.temp === 'f' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>

                        
                        <div className="mb-2 sm:mb-3">
                            <h4 className="text-gray-400 font-dm-sans mb-1 text-sm sm:text-base">Wind Speed</h4>
                            <button
                                onClick={() => onChange({ ...units, wind: 'kmh' })}
                                className={itemClass(units.wind === 'kmh')}
                            >
                                <span className="text-sm sm:text-base">km/h</span>
                                {units.wind === 'kmh' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, wind: 'mph' })}
                                className={itemClass(units.wind === 'mph')}
                            >
                                <span className="text-sm sm:text-base">mph</span>
                                {units.wind === 'mph' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>

                        
                        <div>
                            <h4 className="text-gray-400 font-dm-sans mb-1 text-sm sm:text-base">Precipitation</h4>
                            <button
                                onClick={() => onChange({ ...units, precip: 'mm' })}
                                className={itemClass(units.precip === 'mm')}
                            >
                                <span className="text-sm sm:text-base">Millimeters (mm)</span>
                                {units.precip === 'mm' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, precip: 'in' })}
                                className={itemClass(units.precip === 'in')}
                            >
                                <span className="text-sm sm:text-base">Inches (in)</span>
                                {units.precip === 'in' && <img src="/images/icon-checkmark.svg" alt="selected" className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar