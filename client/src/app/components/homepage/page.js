"use client";
import React, { useState } from "react";
import "./banner1.css";

const options = ["Creams", "Moisturizers", "Face Washes", "Shampoos","Conditioners","Scrubs"];

const Banner1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    console.log("Navigating to", option);
    // Here, you can navigate to the respective page using Next.js routing
    switch (option) {
      case "Creams":
        window.location.href = "/pages/creamsdisplay";
        break;
     
      case "Moisturizers":
        window.location.href = "/pages/moisturizersdisplay";
        break;
      case "Face Washes":
        window.location.href = "/pages/facewashesdisplay";
        break;

        case "Shampoos":
          window.location.href = "/pages/shampoosdisplay";
          break;
        case "Conditioners":
          window.location.href = "/pages/conditionersdisplay";
          break;
        case "Scrubs":
          window.location.href = "/pages/scrubdisplay";
          break;
  
      default:
        break;
    }
  };

  return (
    <>
      <div
        className="h-screen bg-white bg-cover bg-bottom md:pl-[150px] rounded-b-[30px] flex flex-col items-start justify-center items-left smallhero_section"
        style={{
          backgroundImage: "url(/Slider-03.jpg)",
        }}
      >
        <div className="max-w-[668px] space-y-[54px] flex flex-col p-4 md:p-0 text-center md:text-left">
          <h1 className="font-[700] text-[36px] md:text-[64px] leading-[52px] md:leading-[85.31px] font-Playfair text-[#07484A] mt-[10rem] md:mt-0">
            Exclusive Deals of Skin Care Products
          </h1>

          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={handleInputChange}
            />
            {searchTerm && (
              <ul>
                {filteredOptions.map((option) => (
                  <li
                    key={option}
                    style={{ backgroundColor: "#fff" }}
                    className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner1;
