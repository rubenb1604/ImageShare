"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { encryptId } from "@/lib/encryption";

interface FieldProps {
  link?: string;
}

const TitleField: React.FC<FieldProps> = ({ link }) => {

  //todo unbedingt description adden



  //evtl Style für mobile verbessern



  //
  const [inputValue, setInputValue] = useState<string>("");
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [linkId, setLinkId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    //checken funktion lagt manchmal?! 
    setInputValue(event.target.value);
  };






  const onContinue = async (event: React.FormEvent<HTMLFormElement>) => {

    

    

    event.preventDefault();
    const title = inputValue;
    const imglink = link;


    //debug 
    console.log("TITLE: " + title + ", LINK: " + imglink);

  
    //supabase da5tas abfragen
    const { data, error } = await supabase.from("ImgStorage").insert([{ title, src_url: imglink }]).select();

    
    if (error) {
      //


      console.error("Error inserting data:", error.message);
      return;
    }

    //checken, ob data min 1 ist
    if (data && data.length > 0) {


      const insertedId = data[0].id;
      setLinkId(insertedId);
      console.log("Inserted ID:", insertedId);
    }

    setInputValue("");
    setIsUploaded(true);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Fehler beim Kopieren in die Zwischenablage:', error);
    }
  };

  return (
    <div className="flex flex-col w-full bg-neutral-200 m-4 p-2 rounded-xl">
      {!isUploaded && (
        <>
          <h1 className="font-semibold text-2xl text-center">
            Setze einen Title fest:
          </h1>
          <form
            onSubmit={onContinue}
            className="flex items-center content-center gap-2"
          >
            <input
              type="text"
              id="inp"


              value={inputValue}
              onChange={handleInputChange}
              className="bg-neutral-200 border-neutral-600 border-2 rounded-md mt-4 px-4 py-2 text-center font-sans w-full"
              placeholder="Enter Image Title"
            />
            <button


              type="submit"
              className="
          mt-4
          px-4
          py-2
          bg-blue-500
          text-white rounded-lg
          hover:bg-blue-600
          border-blue-500
          hover:border-blue-600
          border-2
          "



            >
              Continue
            </button>
          </form>
        </>
      )}
      {isUploaded && (


        <div className="max-w-full">
          <h1 className="font-semibold text-2xl text-center">Dein Link:</h1>
          
            <div className="text-center">
              {!copied && (
                <span onClick={() => {copyToClipboard(`https://image-share-mu.vercel.app/view/${encryptId(linkId || "")}`)}}
                  className="underlined cursor-pointer text-sm">
                Click to Copy!
              </span>
              )}
              {copied && (
                <span onClick={() => {copyToClipboard(`https://image-share-mu.vercel.app/view/${encryptId(linkId || "")}`)}}
                  className="underlined cursor-pointer text-sm">
                Sucessfully copied!
              </span>
              )}
            </div>
            
          
        </div>
      )}
    </div>
  );
};

export default TitleField;
