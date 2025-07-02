"use client";
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
    UploadResponse,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
interface ImageInputProps {
  value?: string;
  onChange?: (value: string) => void;
}
const ImageInput = ({ value, onChange }: ImageInputProps) => {
  const [imageResponse, setImageResponse]=useState<UploadResponse>()
    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();
  const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };
     const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        fileInput?.click(); // Trigger the file input click to open the file dialog
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            // alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;
        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file?.name, // Optionally set a custom file name
            
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            if(uploadResponse && uploadResponse.fileType) {
              setImageResponse(uploadResponse)
            }
             if (onChange && uploadResponse && uploadResponse.url) {
            onChange(uploadResponse.url);
      }
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };
  return (

    // <Input
    //                     required
    //                   type={FIELD_TYPES[key as keyof typeof FIELD_TYPES] || key}
    //                     placeholder={`Type your ${key}..`}
    //                     {...field}
    //                     className="font-bold p-5 mt-1"
    //                   />
      <>

      <Button type="button" onClick={handleUpload}>

            <Input className="hidden" type="file" ref={fileInputRef} onChange={handleUpload}/>
            {/* Button to trigger the upload process */}
                Upload file <Image src={'/icons/upload.svg'} alt="upload_image" width={16} height={16}></Image> <span>{imageResponse?.name}</span>
            <br />
            {/* Display the current upload progress */}
      </Button>
     {imageResponse?.fileType==='image' && <Image src={`${imageResponse?.url}`} alt="uploaded_image" width={50} height={30}></Image>}
          
        </>
  )
}

export default ImageInput