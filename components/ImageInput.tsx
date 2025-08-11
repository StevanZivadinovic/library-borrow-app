"use client";
import { CiImageOn } from "react-icons/ci";
import { MdOndemandVideo } from "react-icons/md";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
  } from "@imagekit/next";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { authenticator } from "@/lib/actions/addMedia";
import { getCsrfToken } from "next-auth/react";

interface ImageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  type: "image" | "video";
}
const ImageInput = ({ value, onChange, type }: ImageInputProps) => {
  const [selectedFile, setSelectedFile] = useState<any>(null); // Fajl čuvamo ovde
  const [fileID, setFileID] = useState<string>(""); // ID fajla čuvamo ovde
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName]= useState(false);
  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);
   useEffect(() => {
    async function fetchCsrfToken() {
      const token = await getCsrfToken();
      setCsrfToken(token);
      }
    fetchCsrfToken();
  }, []);
  const abortController = new AbortController();
  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      type === "image" &&
      ![
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      toast("Please select a valid image file (PNG, JPEG, JPG)!");
      return;
    }
    if (
      type === "video" &&
      !["video/mp4", "video/webm", "video/ogg"].includes(file.type)
    ) {
      toast("Please select a valid video file (MP4, WEBM, OGG)!");
      return;
    }
    setSelectedFile(file);
    onChange && onChange(file?.name);
    await handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    console.log("Handling upload for file:", file);
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
      const folder = type === "image" ? "/images" : "/videos";
       if (!csrfToken) {
      console.error("CSRF token not ready");
      return;
    }
      if (file && fileID.length > 0) {    
        const fileIDValue = `${fileID}`;    
     const res=   await fetch("/api/delete-file", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
                       
          },
          body: JSON.stringify({ fileIDValue,
            csrfToken: csrfToken,
           }),
          credentials: "include" 
        });
        try {
            const data = await res.json();
            if (!res.ok) {
              setShowName(false);
              throw new Error(`Failed to delete file: ${res.statusText}`);
            }else{
            setShowName(true);
            console.log("File deleted successfully:", data);
          }
        }catch (error) {
              setShowName(false);
            console.error("Error parsing delete response:", error);
        }
      }
      if(file.size >= 1024 * 1024 * 10 && type === "image") {
        toast("File size exceeds 10MB limit. Please select a smaller file.");
        return
      }
      if(file.size >= 1024 * 1024 * 10 && type === "video") {
        toast("File size exceeds 20MB limit. Please select a smaller file.");
        return
      }
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file: file,
        fileName: file && file?.name,
        folder,
        abortSignal: abortController.signal,
          onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
      });

      if (onChange && uploadResponse && uploadResponse.url) {
        onChange(uploadResponse.url);
        uploadResponse.fileId && setFileID(uploadResponse.fileId);
        setShowName(true);
      }
      console.log("Upload response:", uploadResponse);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
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

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };
console.log("Selected file:", selectedFile);
  return (
    <>
      <Button type="button" onClick={handleSelectFile}>
        <Input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {/* Button to trigger the upload process */}
        {type === "image" ? `Upload image ` : `Upload video`}{" "}
        {type === "image" ? <CiImageOn /> : <MdOndemandVideo />}{" "}
        {progress === 100 && showName && <span>{selectedFile?.name}</span>}
        <br />
        {/* Display the current upload progress */}
      </Button>
      {selectedFile &&
      type === "image" &&
      selectedFile?.type?.startsWith("image") ? (
        <div className="mt-2">
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            width={150}
            height={100}
          />
        </div>
      ) :""}
      
      {selectedFile &&
      type === "video" &&
      selectedFile?.type?.startsWith("video") ? (
        <div className="mt-2">
          <video
            src={URL.createObjectURL(selectedFile)}
            width={150}
            height={100}
          />
        </div>
      ):""}
      {progress > 0 && progress < 100 && (
  <div className="w-full bg-gray-200 rounded h-3 mt-4 overflow-hidden">
    <div
      className="bg-blue-600 h-3 rounded transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
)}
    </>
  );
};

export default ImageInput;
