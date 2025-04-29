import React, { useState } from "react";
import { Option } from "../types/filters.type";

const DropdownSelect: React.FC<{ onChange: (option: Option) => void; activeFilter: Option }> = ({ onChange, activeFilter }) => { 
const [open, setOpen] = useState<boolean>(false); 
const [selected, setSelected] = useState<Option>(activeFilter);

const options:Option[] = [{label:"All", option:"all"}, {label:"A-Z", option:"alphabetical"}, {label:"By Count", option:"count"}];

const handleSelect = (option:Option) => { 
    setSelected(option); 
    setOpen(false); 
    if (onChange) { 
        onChange(option); 
    } 
};

return ( 
    <div>
        <div className="relative inline-block text-left w-48"> 
            <button onClick={() => setOpen((prev) => !prev)} 
            className="inline-flex justify-between w-full rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-[#ffffff46] focus:outline-none" > 
                {selected.label} 
                <svg className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${ open ? "rotate-180" : "rotate-0" }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" > <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" /> </svg>
            </button>
            <div className={`absolute z-10 mt-2 w-full origin-top-right rounded-md bg-[#ffffff] shadow-lg  transition-all duration-200 ${
                            open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                            }`}
            >
                <div className="py-1">
                {options.map((option:Option) => (
                    <button
                    key={option.label}
                    onClick={() => handleSelect(option)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                        selected.option === option.option
                        ? "bg-gray-100 text-gray-900 "
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    >
                    {option.label}
                    </button>
                ))}
                </div>
            </div>
        </div>
    </div>
)}

export default DropdownSelect;