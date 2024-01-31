"use client";

import React, { FC, forwardRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUpload from "./ModalUtils/useUpload";
import { useUser } from "@/utils/useUser";
import ParentModal from "./ParentModal";
import { InputProps, UploadModalFileInputProps } from "./Interfaces";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type, disabled, ...props },
  ref,
) {
  return (
    <input
      type={type}
      className={`flex w-full rounded-md bg-menu-bg border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none ${disabled ? "opacity-75" : ""} ${className || ""}`}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});

const FileInput: FC<UploadModalFileInputProps> = ({
  id,
  disabled,
  register,
  placeholder,
  accept,
}) => (
  <div className="flex flex-col gap-y-1">
    <div className="pb-1">{placeholder}</div>
    <Input
      id={id}
      placeholder="test"
      disabled={disabled}
      type="file"
      accept={accept}
      {...register(id, { required: true })}
    />
  </div>
);

const UploadModal: FC = () => {
  const { user } = useUser();
  const { isOpen, onClose } = useUpload();

  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { author: "", title: "", song: null, image: null },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Fields Not Filled");
        return;
      }

      const uploadFile = async (file: File, folder: string) => {
        const UID = uniqid();
        return supabaseClient.storage
          .from(folder)
          .upload(`${folder}-${values.title}-${UID}`, file, {
            cacheControl: "3600",
            upsert: false,
          });
      };

      const { data: songData, error: songError } = await uploadFile(
        songFile,
        "songs",
      );

      if (songError) {
        setIsLoading(false);
        return toast.error("Song Upload Failed");
      }

      const { data: imageData, error: imageError } = await uploadFile(
        imageFile,
        "images",
      );

      if (imageError) {
        setIsLoading(false);
        return toast.error("Image Upload Failed");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          author: values.author,
          href: songData.path,
          img: imageData.path,
          label: values.title,
          user_id: user.id,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();

      setIsLoading(false);
      toast.success("Song Upload Successful");

      reset();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Song Upload Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ParentModal
      title="Add a song"
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 py-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <FileInput
          id="song"
          disabled={isLoading}
          register={register}
          placeholder="Select a song file"
          accept=".mp3"
        />
        <FileInput
          id="image"
          disabled={isLoading}
          register={register}
          placeholder="Select an image"
          accept="image/*"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-full bg-link-active border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Please Wait..." : "Create"}
        </button>
      </form>
    </ParentModal>
  );
};

export default UploadModal;
