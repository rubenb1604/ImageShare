"use client";

import { twMerge } from "tailwind-merge";
import DragDropField from "./DragDropField";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadimg";

interface FieldProps {
	className?: string;
}

const UploadField: React.FC<FieldProps> = ({ className }) => {
	const [file, setFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [uploadStatus, setUploadStatus] = useState<string | null>(null);
	const router = useRouter();



	const handleFileDrop = (file: File) => {
		//funktion evtl. seperat machen




		if (file.type === "image/jpeg" || file.type === "image/png") {
			setFile(file);
			setImageUrl(URL.createObjectURL(file));
			console.log("File dropped:", file.name);
		} else {
			alert("Bitte lade ein Bild im JPG oder PNG Format hoch.");
		}
	};

	const handleContinue = async () => {
		if (!file) {
			return;
		}

		
		setUploadStatus("Uploading...");

		
		const result = await uploadImage(file);

		if (result) {
			setUploadStatus("Image uploaded successfully!");
			console.log("Image uploaded:", result);



			//filepath im router ergenzen
			router.push(`/upload?imageUrl=${encodeURIComponent(result.publicUrl)}`);
		} else {
			setUploadStatus("Failed to upload image.");
		}
	};

	return (
		<div
			className={twMerge(
				`
          bg-neutral-200
          rounded-lg
          p-6
          m-10
          flex
          items-center
          flex-col
          gap-4

		  
        `,
				className
			)}
		>
			<h1 className="text-center font-sans font-bold text-3xl">Upload Image</h1>

		
			{!imageUrl && (
				<DragDropField className="w-full" onFileDrop={handleFileDrop} />
			)}


			{imageUrl && (
				<>
					<img
						src={imageUrl}
						alt="Uploaded"
						className="mt-4 max-w-full h-auto rounded-lg border-4 border-black"



						
					/>
					<button
						onClick={handleContinue}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Continue
					</button>
				</>
			)}

			{uploadStatus && (
				<p className="mt-2 text-center text-gray-700">{uploadStatus}</p>
			)}
		</div>
	);
};

export default UploadField;
