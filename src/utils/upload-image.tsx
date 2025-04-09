import React, { useRef, useState } from "react";
import { Image } from "lucide-react";
interface UploadImageProps {
  onChange: (files: File[]) => void;
}

export default function UploadImage({ onChange }: UploadImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const selected = [...images, ...files].slice(0, 3); // 최대 3장 제한
    setImages(selected);
    onChange(selected);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="w-[80%] mx-auto">
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
        className="w-full text-white bg-neutral-900 button-style flex justify-center items-center gap-4"
      >
        <Image/><p>이미지 선택하기 (최대 3장)</p>
      </button>

      <div className="flex gap-4 mt-3">
        {images.map((file, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
