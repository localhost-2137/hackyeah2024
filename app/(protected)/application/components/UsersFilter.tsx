"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import qs from "query-string";

const UsersFilter = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const query = {
            type: value,
        };

        const url = qs.stringifyUrl({
            url: '/application',
            query
        });

        router.push(url);
    }, [router, value]);

    return (
        <Select onValueChange={setValue} value={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="BUSINESS">Firmy</SelectItem>
                <SelectItem value="NGO">NGO</SelectItem>
                <SelectItem value="FREELANCER">Freelancerzy</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default UsersFilter;