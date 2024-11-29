"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/user";
import { PenSquare } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploadModal } from "./ImageUploadModal";

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password))
    return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(password))
    return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return null;
};

const validateField = (value: string): string | null => {
  if (!value) return "This field is required";
  if (value.length < 3) return "Must be at least 3 characters long";
  return null;
};

type FormField = {
  label: string;
  name: keyof User;
  type?: string;
};

const formFields: FormField[] = [
  { label: "Your Name", name: "name", type: "text" },
  { label: "User Name", name: "username", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "Date of Birth", name: "dob", type: "select" },
  { label: "Present Address", name: "presentAddress", type: "text" },
  { label: "Permanent Address", name: "permanentAddress", type: "text" },
  { label: "City", name: "city", type: "text" },
  { label: "Postal Code", name: "postalCode", type: "text" },
  { label: "Country", name: "country", type: "text" },
];

export function EditProfile() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState<Record<string, any>>(
    user ? { ...user } : {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/images/profile-1.jpg");

  const handleUpload = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  // Check specifically for /uploads/profile.jpg
  useEffect(() => {
    const checkProfileImage = async () => {
      try {
        const response = await fetch("/uploads/profile.jpg");
        if (response.ok) {
          setProfileImage("/uploads/profile.jpg");
        } else {
          setProfileImage("/images/profile-1.jpg");
        }
      } catch (error) {
        setProfileImage("/images/profile-1.jpg");
      }
    };

    checkProfileImage();
  }, []);

  const handleBlur = (name: string) => {
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const newErrors: Record<string, string> = { ...errors };

    let error = null;
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    } else {
      error = validateField(value);
    }

    if (error) {
      newErrors[name] = error;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    formFields.forEach(({ name }) => {
      let error: string | null = null;
      if (name === "email") {
        error = validateEmail(formData.email);
      } else if (name === "password") {
        error = validatePassword(formData.password);
      } else {
        error = validateField(formData[name]);
      }
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setTouchedFields(
      formFields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {})
    );
    if (validateForm()) {
      try {
        updateUser(formData);
        toast.success("Profile Updated Successfully", {
          description: "Your profile information has been updated.",
        });
      } catch (error) {
        toast.error("Update Failed", {
          description: "There was an error updating your profile.",
        });
      }
    } else {
      toast.error("Form Validation Failed", {
        description: "Please correct the errors in the form.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 py-12 lg:flex-row">
        <div className="mb-8 flex w-full flex-col items-center md:mb-12 lg:w-[21%]">
          <div className="relative">
            <Image
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="relative h-[100px] w-[100px] rounded-full md:h-[120px] md:w-[120px]"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-0 left-20 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
            >
              <PenSquare className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 md:gap-y-6">
            {formFields.map((field) => (
              <div key={field.name} className="col-span-1">
                <label className="mb-2 block text-sm text-[#1A1D1F]">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.name] || ""}
                    onValueChange={(value) => handleChange(field.name, value)}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-[#E8ECEF] bg-white text-[#1A1D1F] focus:ring-1 focus:ring-[#2A85FF]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1990-01-25">1990-01-25</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <>
                    <Input
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      onBlur={() => handleBlur(field.name)}
                      className={`h-11 rounded-lg border-[#E8ECEF] bg-white text-[#1A1D1F] focus-visible:ring-1 focus-visible:ring-[#2A85FF] ${
                        touchedFields[field.name] && errors[field.name]
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {touchedFields[field.name] && errors[field.name] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end md:mt-12">
        <Button
          className="h-11 w-full rounded-xl bg-[#1A1D1F] px-8 text-white hover:bg-[#1A1D1F]/90 md:w-auto"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <ImageUploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      </div>
    </>
  );
}
