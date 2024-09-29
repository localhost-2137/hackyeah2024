"use client";

import { useEffect, useState, useTransition } from "react";
import { SiFreelancer } from "react-icons/si";
import { IoIosBusiness } from "react-icons/io";
import { FaBuildingNgo } from "react-icons/fa6";
import { getUser } from "@/actions/user-data";
import { Input } from "../ui/input";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { fulfillUserData } from "@/actions/fulfill-user-data";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";

type UserType = "FREELANCER" | "BUSINESS" | "NGO";

interface UserDataToBeFulfilled {
  name: string;
  description: string;
  type: UserType;
  image: string;
  tags: string[];
}

export const convertToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};


export default function FulFillUserDataForm() {
  const [user, setUser] = useState<any>();
  const [role, setRole] = useState<UserType>();
  const [name, setName] = useState<string>(user ? user.name : "");
  const [tags, setTags] = useState<Option[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [description, setDescription] = useState<string>("Pusty opis");
  const [imageBase64, setImageBase64] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const Router = useRouter();

  useEffect(() => {
    getUser().then((data: any) => {
      if (data) {
        if (data.data.isFulfilled) {
          Router.push("/settings");
        }
        setUser(data.data);
        setName(data.data.name);
        setTags(
          data.data.tags.map((tag: string) => ({ label: tag, value: tag }))
        );
      }
    });
  }, []);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep, role]);

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file && file.size / 1024 / 1024 < 2) {
      // Check if file size is less than 2MB
      const base64 = await convertToBase64(file);
      setImageBase64(base64 as string);
    } else {
      alert("Image size must be 2MB or less");
    }
  };

  const onSubmit = async () => {
    startTransition(() => {
      const data: UserDataToBeFulfilled = {
        name,
        description,
        type: role!,
        image: imageBase64,
        tags: tags.map((tag) => tag.value),
      };
      fulfillUserData(data).then((data) => {
        if (data?.error) {
          alert(data.error);
        } else {
          Router.push("/settings");
        }
      });
    });
  };

  return (
    <div className="w-1/4 h-2/3 flex flex-col items-center justify-between rounded-xl border bg-card text-card-foreground shadow p-16">
      <h2 className="text-2xl text-center font-semibold">
        Zanim zaczniesz używać TrustLink, odpowiedz na kilka pytań
      </h2>
      {currentStep === 1 ? (
        <RoleChoosing setRole={setRole} />
      ) : currentStep === 2 ? (
        <NameAndTageChoosing
          name={name}
          setName={setName}
          tags={tags}
          setTags={setTags}
        />
      ) : currentStep === 3 ? (
        <DescriptionChoosing
          description={description}
          setDescription={setDescription}
        />
      ) : (
        <AvatarChoosing
          image={imageBase64}
          handleImageChange={handleImageChange}
        />
      )}
      {currentStep !== 1 && description !== "" && (
        <Controls
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      )}
    </div>
  );
}

function RoleChoosing({ setRole }: { setRole: (role: UserType) => void }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg text-center font-semibold mb-2">Wybierz rolę</h2>
      <button
        className="border shadow text-xl duration-300 rounded-xl transition-all flex items-center hover:translate-y-1 hover:shadow-none hover:text-rose-600"
        onClick={() => setRole("FREELANCER")}
      >
        <div className="flex items-center px-4 border-r justify-center w-16 h-16">
          <SiFreelancer size={32} />
        </div>
        <p className="text-center w-full">Freelancer</p>
      </button>
      <button
        className="border duration-300 shadow text-xl rounded-xl transition-all flex items-center hover:translate-y-1 hover:shadow-none hover:text-rose-600"
        onClick={() => setRole("BUSINESS")}
      >
        <div className="flex items-center px-4 border-r justify-center w-16 h-16">
          <IoIosBusiness size={32} />
        </div>
        <p className="text-center w-full">Biznes</p>
      </button>
      <button
        className="border duration-300 shadow text-xl rounded-xl transition-all flex items-center hover:translate-y-1 hover:shadow-none hover:text-rose-600"
        onClick={() => setRole("NGO")}
      >
        <div className="flex items-center px-4 border-r justify-center w-16 h-16">
          <FaBuildingNgo size={32} />
        </div>
        <p className="text-center w-full">NGO</p>
      </button>
    </div>
  );
}

export function NameAndTageChoosing({
  name,
  setName,
  tags,
  setTags,
}: {
  name: string;
  setName: (name: string) => void;
  tags: Option[];
  setTags: (options: Option[]) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">Wybierz nazwę</h2>
      <Input
        placeholder="Nazwa"
        onChange={(e) => {
          setName(e.target.value);
        }}
        defaultValue={name}
        type="input"
      />
      <MultipleSelector
        defaultOptions={[]}
        placeholder="Wpisz tagi..."
        creatable
        value={tags}
        onChange={(tags) => {
          setTags(tags);
        }}
      />
    </div>
  );
}

function Controls({
  setCurrentStep,
  currentStep,
  onSubmit,
  isPending,
}: {
  setCurrentStep: (step: any) => void;
  currentStep: 1 | 2 | 3 | 4;
  onSubmit: () => void;
  isPending: boolean;
}) {
  return (
    <div className="flex flex-row w-full gap-2">
      {currentStep !== 1 && !isPending && (
        <button
          onClick={() => setCurrentStep((prev: any) => prev - 1)}
          className={`w-full h-12 rounded-xl border bg-card text-card-foreground shadow hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Wstecz
        </button>
      )}
      {currentStep !== 4 && !isPending && (
        <button
          onClick={() => setCurrentStep((prev: any) => prev + 1)}
          className={`w-full h-12 rounded-xl border bg-card text-card-foreground shadow  hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Dalej
        </button>
      )}
      {currentStep === 4 && !isPending && (
        <button
          onClick={onSubmit}
          className={`w-full h-12 rounded-xl border bg-card text-card-foreground shadow  hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Zapisz
        </button>
      )}
      {isPending && (
        <button
          onClick={onSubmit}
          className={`w-full h-12 flex items-center justify-center rounded-xl border bg-card text-card-foreground shadow  hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          <DotLoader color="#000" size={20} />
        </button>
      )}
    </div>
  );
}

export function DescriptionChoosing({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (description: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">Napisz opis</h2>
      <textarea
        className="border rounded-xl p-4 resize-none h-48"
        placeholder="Opis"
        defaultValue={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
    </div>
  );
}

export function AvatarChoosing({
  image,
  handleImageChange,
}: {
  image: string;
  handleImageChange: (event: any) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <h2 className="text-lg font-semibold">Dodaj zdjęcie</h2>
      <Input
        placeholder="Zdjęcie"
        onChange={(e) => {
          handleImageChange(e);
        }}
        type="file"
      />
      <img src={image} className="w-[200px] h-[200px] rounded-full" />
    </div>
  );
}
