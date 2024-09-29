'use client';

import { useState } from "react";

export function useDrawerState(initialState = false): [boolean, () => void] {
    const [isOpen, setIsOpen] = useState(initialState);

    const toggleDrawer = () => setIsOpen(!isOpen);

    return [isOpen, toggleDrawer];
}