import {db} from "@/lib/db";
import {UserType} from "@prisma/client";

import dotenv from 'dotenv';
import {_fulfillUserData} from "@/actions/fulfillUserData";
dotenv.config();

// it is encrypted "123456" password
const hashedDummyPassword = "$2a$10$rApU36vyoahl1UpmTaDaX.Q8DNo2SMoPqviLqc4.kp3KP7.TFHS1K";

const users = [
    {
        id: "1",
        name: "Eko Innowatorzy",
        email: "kontakt@ekoinnowatorzy.com",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.BUSINESS,
        tags: ["zrównoważony rozwój", "innowacja", "środowisko"],
        image: "https://placehold.co/100x100",
        description:
            "Firma dedykowana technologiom zrównoważonym oraz rozwiązaniom na rzecz ochrony środowiska.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Fundacja Zielona Przyszłość",
        email: "info@zielonaprzyszlosc.org",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.NGO,
        tags: ["działania na rzecz klimatu", "ochrona środowiska", "edukacja"],
        image: "https://placehold.co/100x100",
        description:
            "Organizacja non-profit działająca na rzecz walki ze zmianami klimatycznymi i ochrony zasobów naturalnych.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Technologia dla Dobra",
        email: "wsparcie@technologiadladobra.io",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.BUSINESS,
        tags: ["technologia", "innowacja", "wpływ społeczny"],
        image: "https://placehold.co/100x100",
        description:
            "Firma technologiczna tworząca rozwiązania na rzecz postępu społecznego i korzyści dla społeczeństwa.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Obserwatorium Praw Człowieka",
        email: "kontakt@opc.org",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.NGO,
        tags: ["prawa człowieka", "adwokatura", "sprawiedliwość"],
        image: "https://placehold.co/100x100",
        description:
            "Międzynarodowa organizacja pozarządowa, która promuje i broni praw człowieka na całym świecie.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Czysta Energia Sp. z o.o.",
        email: "info@czystaenergia.com",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.BUSINESS,
        tags: ["energia", "zrównoważony rozwój", "odnawialne źródła energii"],
        image: "https://placehold.co/100x100",
        description:
            "Lider w dziedzinie rozwiązań z zakresu energii odnawialnej, oferujący alternatywy dla paliw kopalnych.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "6",
        name: "Światowy Sojusz Przeciw Głodowi",
        email: "kontakt@sojuszglod.org",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.NGO,
        tags: [
            "pomoc głodującym",
            "bezpieczeństwo żywnościowe",
            "organizacja non-profit",
        ],
        image: "https://placehold.co/100x100",
        description:
            "Globalna organizacja non-profit, której misją jest walka z głodem i zapewnianie bezpieczeństwa żywnościowego.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "7",
        name: "Innowacyjne Rozwiązania Sp. z o.o.",
        email: "wsparcie@innowacyjnerozwiazania.com",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.BUSINESS,
        tags: ["innowacja", "technologia", "biznes"],
        image: "https://placehold.co/100x100",
        description:
            "Firma technologiczna skupiająca się na tworzeniu innowacyjnych rozwiązań dla wyzwań biznesowych.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "8",
        name: "Zdrowie dla Wszystkich",
        email: "info@zdrowiedlawszystkich.org",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.NGO,
        tags: ["ochrona zdrowia", "non-profit", "społeczność"],
        image: "https://placehold.co/100x100",
        description:
            "Organizacja pozarządowa, która działa na rzecz zapewnienia dostępu do usług medycznych w regionach niedostatecznie rozwiniętych.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "9",
        name: "Rozwiązania Gospodarki Obiegu Zamkniętego",
        email: "kontakt@rgobiezamkniety.com",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.BUSINESS,
        tags: ["zrównoważony rozwój", "redukcja odpadów", "innowacja"],
        image: "https://placehold.co/100x100",
        description:
            "Firma oferująca zrównoważone rozwiązania w zakresie gospodarki obiegu zamkniętego.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "10",
        name: "Globalny Fundusz Edukacyjny",
        email: "wsparcie@globaledu.org",
        emailVerified: new Date(),
        isFulfilled: false,
        type: UserType.NGO,
        tags: ["edukacja", "non-profit", "rozwój społeczności"],
        image: "https://placehold.co/100x100",
        description:
            "Organizacja pozarządowa, której celem jest zapewnienie zasobów edukacyjnych dla społeczności z ograniczonym dostępem do edukacji.",
        password: hashedDummyPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export async function seedDb() {
    const allPromises = [];

    for (const user of users) {
        allPromises.push(async () => {
            await db.user.upsert({
                where: {
                    id: user.id,
                },
                update: user,
                create: user,
            });

            await _fulfillUserData(user.name, user.id, user);
        });
    }

    await Promise.all(allPromises.map(e => e()));
}

seedDb().then(() => {
    console.log("Database seeded successfully");
}).catch((error) => {
    console.error("Error while seeding database", error);
    process.exit(1);
});