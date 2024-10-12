"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Hier importieren wir useParams
import { supabase } from "@/lib/supabase";
import { decryptId } from "@/lib/encryption";

const ViewImage = () => {
  const { id } = useParams(); // Holt die ID aus den URL-Parametern
  const [imageData, setImageData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (id) {
        try {
          // URL-Dekodierung der ID
          const decodedId = decodeURIComponent(Array.isArray(id) ? id[0] : id);
          console.log("ID after decoding:", decodedId); // Debugging

          // Entschlüssele die ID
          const decryptedId = decryptId(decodedId);
          console.log("Decrypted ID:", decryptedId); // Debugging

          const { data, error } = await supabase
            .from("ImgStorage")
            .select("*")
            .eq("id", decryptedId)
            .single();

          if (error) {
            setError(error.message);
            console.error("Error fetching image:", error.message);
          } else {
            setImageData(data);
          }
        } catch (err) {
          console.error("Decryption error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchImage();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>; // Ladeanzeige
  }

  if (error) {
    return <div>Error: {error}</div>; // Fehleranzeige
  }

  return (
    <div className="w-full flex justify-center items-baseline min-h-screen">
      <div className="flex flex-col items-center bg-neutral-200 max-w-full p-4 rounded-md mt-16">
        <h1 className="text-2xl font-bold mb-4">{imageData?.title}</h1>{" "}
        {/* Bildtitel anzeigen */}
        {imageData ? (
          <>
            <img
              src={imageData.src_url}
              alt={imageData.title}
              className="max-w-full h-auto rounded-lg border-4 border-black"
            />
          </>
        ) : (
          <p>No image found.</p> // Anzeige, wenn kein Bild gefunden wird
        )}
      </div>
    </div>
  );
};

export default ViewImage;
