"use client";

import { useEffect, useState } from "react";
import { SiFreelancer } from "react-icons/si";
import { IoIosBusiness } from "react-icons/io";
import { FaBuildingNgo } from "react-icons/fa6";
import { getUser } from "@/actions/user-data";
import { Input } from "../ui/input";
import { encodeBase64 } from "bcryptjs";
import MultipleSelector, { Option } from "../ui/multiple-selector";

type UserType = "FREELANCER" | "BUSINESS" | "NGO";

interface UserDataToBeFulfilled {
  name: string;
  description: string;
  type: UserType;
  image: string;
  tags: string[];
}

export default function FulFillUserDataForm() {
  const [user, setUser] = useState<any>();
  const [role, setRole] = useState<UserType>();
  const [name, setName] = useState<string>(user ? user.name : "");
  const [tags, setTags] = useState<Option[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [description, setDescription] = useState<string>("Pusty opis");
  const [imageBase64, setImageBase64] = useState<string>("");

  useEffect(() => {
    getUser().then((data) => {
      if (data) {
        setUser(data.data);
        setName(data.data.name);
        setTags(data.data.tags.map((tag: string) => ({ label: tag, value: tag })));
      }
    });
  }, []);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep, role]);

  return (
    <div className="w-1/4 h-2/3 flex flex-col items-center justify-between rounded-xl border bg-card text-card-foreground shadow p-16">
      <h2 className="text-2xl text-center font-semibold">
        Zanim zaczniesz używać TrustLink, odpowiedz na kilka pytań
      </h2>
      {currentStep === 1 ? (
        <RoleChoosing setRole={setRole} />
      ) : currentStep === 2 ? (
        <NameAndTageChoosing name={name} setName={setName} tags={tags} setTags={setTags} />
      ) : currentStep === 3 ? (
        <DescriptionChoosing
          description={description}
          setDescription={setDescription}
        />
      ) : (
        <AvatarChoosing image={imageBase64} setImage={setImageBase64} />
      )}
      {currentStep !== 1 && description !== "" && (
        <Controls setCurrentStep={setCurrentStep} currentStep={currentStep} />
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

function NameAndTageChoosing({
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
}: {
  setCurrentStep: (step: any) => void;
  currentStep: 1 | 2 | 3 | 4;
}) {
  return (
    <div className="flex flex-row w-full gap-2">
      {currentStep !== 1 && (
        <button
          onClick={() => setCurrentStep((prev: any) => prev - 1)}
          className={`w-full h-12 rounded-xl border bg-card text-card-foreground shadow hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Wstecz
        </button>
      )}
      {currentStep !== 4 && (
        <button
          onClick={() => setCurrentStep((prev: any) => prev + 1)}
          className={`w-full h-12 rounded-xl border bg-card text-card-foreground shadow  hover:translate-y-1 hover:shadow-none hover:text-rose-600 transition-all duration-300`}
        >
          Dalej
        </button>
      )}
    </div>
  );
}

function DescriptionChoosing({
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

function AvatarChoosing({
  image,
  setImage,
}: {
  image: string;
  setImage: (image: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-lg font-semibold">Dodaj zdjęcie</h2>
      <Input
        placeholder="Zdjęcie"
        onChange={(e) => {
        //   const file = e.target.files[0];
        //   const reader = new FileReader();
        //   reader.onloadend = () => {
        //     setImage(reader.result as string);
        //   };
        //   reader.readAsDataURL(file);
        }}
        type="file"
      />
      <img
        src={`data:image/png;base64, ${image}`}
        className="w-full rounded-full"
      />
    </div>
  );
}
