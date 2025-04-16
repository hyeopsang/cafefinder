import React, { useRef } from "react";
import { Image, X } from "lucide-react";

interface UploadImageProps {
  newImages: File[];
  imageUrls: string[];
  onChange: (files: File[]) => void;
}

export default function ReviewPhoto({ onChange, imageUrls, newImages }: UploadImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxCount = 3;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const allowed = maxCount - newImages.length - imageUrls.length;
    const selected = [...newImages, ...files.slice(0, allowed)];
    onChange(selected); 
  };

  const handleRemoveNewImage = (index: number) => {
    const updated = newImages.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="w-[80%] mx-auto pt-3">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full text-white bg-blue-500 button-style font-medium text-sm flex justify-center items-center gap-4"
        disabled={newImages.length + imageUrls.length >= maxCount}
      >
        <Image className="w-5 h-5" />
        <p>이미지 선택하기 (최대 3장)</p>
      </button>

      <div className="flex gap-2 mt-3 flex-wrap">
        {/* 기존 이미지 렌더링 */}
        <ul className="w-full grid grid-cols-3">
        {imageUrls.map((url, index) => (
          <li key={`existing-${index}`} className="relative w-24 h-24">
            <img
              src={url}
              alt={`기존 이미지 ${index}`}
              className="w-full h-full object-cover rounded"
            />
          </li>
        ))}
        </ul>
        {newImages.map((file, index) => (
          <div key={`new-${index}`} className="relative w-24 h-24">
            <img
              src={URL.createObjectURL(file)}
              alt={`새 이미지 ${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveNewImage(index)}
              className="absolute top-0 right-0 bg-neutral-900 text-white text-xs p-1 rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
