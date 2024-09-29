"use client"

import {Input} from "@/components/ui/input";
import {EventHandler, MouseEventHandler, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import qs from "query-string";
import {Button} from "@/components/ui/button";
import {MdSend} from "react-icons/md";

export default function UsersSearch() {
    const [value, setValue] = useState('');
    const router = useRouter();

    const clickHandler = () => {
        const query = {
            search: value,
        };

        const url = qs.stringifyUrl({
            url: '/application',
            query
        });

        router.push(url);
    }

    return (
        <div className="flex flex-row gap-2 items-center">
            <Input value={value} onChange={(e) => setValue(e.target.value)}
                   className="max-w-[300px]" placeholder="Wyszukaj według frazy..."/>
            <Button className="bg-red-700 hover:bg-red-800" onClick={clickHandler}><MdSend/></Button>
        </div>
    )
}
