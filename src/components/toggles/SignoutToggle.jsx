// SignoutToggle.js

import { useUser } from "@/context/user";
import { SignOut } from "@/services/firebase/config";
import { Button, Modal } from "flowbite-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SignoutToggle = () => {
    const user = useUser();
    const { uuid } = user;

    const handleSignout = () => {
        SignOut();
    }

    return uuid && (
        <>
            <button className='flex gap-3 items-center bg-background border border-stroke px-5 py-3 rounded-2xl justify-center' onClick={handleSignout}>
                Signout <i className="text-primary fa-duotone fa-arrow-right-from-bracket mt-1"></i>
            </button>
        </>
    );
};

export default SignoutToggle;
