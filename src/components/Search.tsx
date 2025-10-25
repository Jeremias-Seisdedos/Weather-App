import { useState, useRef} from "react"
import type { WeatherData} from "../types/weather"
import getWeather from "../utils/GetWeather";

type SearchProps = {
    onSearch: (data: WeatherData | null) => void;
};

function Search({onSearch}: SearchProps)
{
    const [valueInput, setValueInput] = useState("")
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleSearch = () => {
        if(valueInput.trim() !== "") {
            getWeather({ name: valueInput }, { onSearch });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        const value = e.target.value;
        timeoutRef.current = setTimeout(() => {
            if (value.trim() !== "") {
                getWeather({ name: value }, { onSearch });
            }
        }, 600);
    }    

    return (
        
        <section className="max-w-3xl mx-auto px-3 py-3 flex flex-col md:flex-row md:items-stretch md:gap-3">
            <input 
                type="text"
                value={valueInput}
                onChange={handleChange}
                placeholder="Search for a place..."
                className="w-full bg-[url('/images/icon-search.svg')] 
                bg-no-repeat bg-[left_1rem_center] pl-12 pr-4
                rounded-xl mt-8 md:mt-6 bg-gray-800 border text-white border-transparent text-left text-lg md:text-xl px-3 py-3 md:flex-1 flex items-center">
            </input>
            <button
                onClick={handleSearch}
                className="w-full md:w-auto mt-5 md:mt-6 px-5 md:px-6 py-3 rounded-xl flex items-center justify-center font-bricolage-grotesque text-white bg-indigo-500 text-lg md:text-xl cursor-pointer hover:bg-indigo-600 transition-colors duration-300">
                Search
            </button>
    </section>
    )
}   
export default Search;