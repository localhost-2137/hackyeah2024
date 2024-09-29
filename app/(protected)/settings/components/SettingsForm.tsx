"use client";

import { getUser } from "@/actions/user-data";
import { useEffect, useState, useTransition } from "react";
import { Option } from "@/components/ui/multiple-selector";
import {
  AvatarChoosing,
  DescriptionChoosing,
  NameAndTageChoosing,
  convertToBase64,
} from "@/components/fulfilling/FulFillUserDataForm";
import { Input } from "@/components/ui/input";
import { updateSettings } from "@/actions/update-settings";

const SettingsForm = () => {
  const [user, setUser] = useState<any>();
  const [name, setName] = useState<string>(user ? user.name : "");
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [description, setDescription] = useState<string>(
    user ? user.description : ""
  );
  const [imageBase64, setImageBase64] = useState<string>("");

  const [tags, setTags] = useState<Option[]>([]);
  const [isPending, _] = useTransition();

  useEffect(() => {
    getUser().then((data: any) => {
      if (data) {
        setUser(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
        setDescription(data.data.description);
        setTags(
          data.data.tags.map((tag: string) => ({ label: tag, value: tag }))
        );
        setImageBase64(data.data.image);
      }
    });
  }, []);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file && file.size / 1024 / 1024 < 2) {
      const base64 = await convertToBase64(file);
      setImageBase64(base64 as string);
    } else {
      alert("Image size must be 2MB or less");
    }
  };

  const onSubmit = () => {
    const data = {
      name,
      description,
      image: imageBase64,
      email: email,
      tags: tags.map((tag) => tag.value),
    };
    updateSettings(data).then((data) => {
      if (data?.error) {
        alert(data.error);
      } else {
        alert("Zapisano");
      }
    });
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Adres e-mail</h2>
        <Input
          placeholder="Adres e-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          defaultValue={email}
          type="input"
          disabled={isPending}
        />
        <NameAndTageChoosing
          name={name}
          tags={tags}
          setName={setName}
          setTags={setTags}
        />
        <DescriptionChoosing
          description={description}
          setDescription={setDescription}
        />
      </div>
      <div className="space-y-4 flex flex-col justify-between">
        <AvatarChoosing
          image={imageBase64}
          handleImageChange={handleImageChange}
        />
        <button
          onClick={onSubmit}
          className={`w-full mt-auto h-12 rounded-xl border bg-card text-card-foreground shadow hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Zapisz
        </button>
      </div>
    </>
  );
};

export default SettingsForm;
