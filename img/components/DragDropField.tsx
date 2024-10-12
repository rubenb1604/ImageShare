"use client";

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface FieldProps {
  className?: string;
  onFileDrop: (file: File) => void;
}

//todo: (fix) Gibt manchmal errors beim drag cancel
// kommt nicht mehr vor?! -> weiter beobachten


const DragDropField: React.FC<FieldProps> = ({ className, onFileDrop }) => {
  const [dragging, setDragging] = useState(false);



  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();


    setDragging(true);

  };



  const handleDragLeave = () => {
    
    setDragging(false);

  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();


    setDragging(false);

    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];

      onFileDrop(file);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {



      //todo windows testen, Linux, Android funktioniert
      const file = event.target.files[0];
      onFileDrop(file);

    }
  };

  return (
    <div
      className={twMerge(
        `
        bg-neutral-400
        rounded-lg
        w-2/3
        p-2
        ${dragging ? "border-2 border-dashed border-blue-500" : ""}
    `,
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}

      
      onDrop={handleDrop}



      onClick={() => document.getElementById("fileInput")?.click()}
    >
      
      <input
        type="file"
        id="fileInput"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex items-center justify-center flex-col gap-3">

        <FaFileUpload className="size-24" />


        <p className="font-sans font-medium">
          Drop Image here or <u className="cursor-pointer">select</u>
        </p>
        <p className="font-sans font-medium">
          please use <b>png</b> or <b>jpg</b> format!
        </p>
      </div>
    </div>
  );
};

export default DragDropField;
