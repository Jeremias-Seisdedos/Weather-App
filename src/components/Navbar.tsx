import { useEffect, useRef, useState } from 'react';
import type { Units } from '../utils/Props';

function Navbar({ units, onChange }: { units: Units; onChange: (u: Units) => void }) {
    const [unitsMenuOpen, setUnitsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Close on outside click
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
        <nav className="flex justify-between items-center p-4">
            <img src="/images/logo.svg" alt="Logo" className="h-8" />

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setUnitsMenuOpen((s) => !s)}
                    className="bg-gray-800 border border-transparent text-white py-1.5 px-3 rounded cursor-pointer flex items-center hover:bg-gray-700 transition-colors duration-300"
                >
                    <img src="/images/icon-units.svg" alt="units" className="inline pr-2" />
                    <p className="font-bricolage-grotesque">Units</p>
                    <img src="/images/icon-dropdown.svg" alt="arrow" className="inline px-1" />
                </button>

                {unitsMenuOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-[#0a0a33] border border-gray-600 rounded-xl p-3 shadow-xl z-40">
                        {/* Quick switch */}
                        <button
                            onClick={isImperial ? switchToMetric : switchToImperial}
                            className="w-full mb-2 px-3 py-2 rounded-lg bg-[#505079] text-white font-dm-sans hover:bg-[#606091]"
                        >
                            {isImperial ? 'Switch to Metric' : 'Switch to Imperial'}
                        </button>

                        {/* Temperature */}
                        <div className="mb-3">
                            <h4 className="text-gray-400 font-dm-sans mb-1">Temperature</h4>
                            <button
                                onClick={() => onChange({ ...units, temp: 'c' })}
                                className={itemClass(units.temp === 'c')}
                            >
                                <span>Celsius (°C)</span>
                                {units.temp === 'c' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, temp: 'f' })}
                                className={itemClass(units.temp === 'f')}
                            >
                                <span>Fahrenheit (°F)</span>
                                {units.temp === 'f' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                        </div>

                        {/* Wind speed */}
                        <div className="mb-3">
                            <h4 className="text-gray-400 font-dm-sans mb-1">Wind Speed</h4>
                            <button
                                onClick={() => onChange({ ...units, wind: 'kmh' })}
                                className={itemClass(units.wind === 'kmh')}
                            >
                                <span>km/h</span>
                                {units.wind === 'kmh' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, wind: 'mph' })}
                                className={itemClass(units.wind === 'mph')}
                            >
                                <span>mph</span>
                                {units.wind === 'mph' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                        </div>

                        {/* Precipitation */}
                        <div>
                            <h4 className="text-gray-400 font-dm-sans mb-1">Precipitation</h4>
                            <button
                                onClick={() => onChange({ ...units, precip: 'mm' })}
                                className={itemClass(units.precip === 'mm')}
                            >
                                <span>Millimeters (mm)</span>
                                {units.precip === 'mm' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                            <button
                                onClick={() => onChange({ ...units, precip: 'in' })}
                                className={itemClass(units.precip === 'in')}
                            >
                                <span>Inches (in)</span>
                                {units.precip === 'in' && <img src="/images/icon-checkmark.svg" alt="selected" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar