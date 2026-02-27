import { Field, Input } from "@base-ui/react";
import { Camera, Upload } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function UploadImage({
  setImageFile,
}: {
  setImageFile: (file: File) => void;
}) {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Image Upload */}
      <Field.Root
        name="imageUpload"
        className="flex flex-col items-center justify-center"
      >
        <div className="group relative cursor-pointer">
          <div
            className={`border-brown/30 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all duration-300 ${imagePreview ? "border-none" : "bg-cream group-hover:bg-sand/50"}`}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={t("preview")}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-brown/60 flex flex-col items-center">
                <Camera className="mb-2 h-8 w-8" />
                <Field.Label className="text-sm font-medium">
                  {t("add_photo")}
                </Field.Label>
              </div>
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="bg-forest absolute right-1 bottom-1 rounded-full p-2 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <Upload className="h-4 w-4" />
          </div>
        </div>
      </Field.Root>
    </>
  );
}
