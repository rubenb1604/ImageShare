"use client";

import TitleField from "@/components/TitleField";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // Importiere Suspense

const Upload = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("imageUrl");

  // TODO: Cancel button

  return (
    <div className="flex justify-center mt-16 p-2">
      <div className="bg-white p-6 rounded shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Uploaded Image</h1>

        {imageUrl ? (
          <div className="flex flex-col items-center">
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full w-2/3 h-auto rounded-lg border-4 border-black"
            />
          </div>
        ) : (
          <p className="text-gray-600">No image uploaded yet.</p>
        )}

        <TitleField link={imageUrl || ""} />
      </div>
    </div>
  );
};

// Wrapper-Komponente hinzufügen
const SuspenseWrapper = () => {
  return (
    <Suspense fallback={<div>Lädt...</div>}>
      <Upload />
    </Suspense>
  );
};

export default SuspenseWrapper;
