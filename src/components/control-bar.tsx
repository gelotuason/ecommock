'use client';

import { useState } from "react";
import { ListFilter, ArrowDownUp, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, } from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function ShopControlBar() {
    const [showBestselling, setShowBestselling] = useState<Checked>(false);
    const [showAtoZ, setShowAtoZ] = useState<Checked>(false);
    const [showZtoA, setShowZtoA] = useState<Checked>(false);
    const [showPriceLowToHigh, setShowPriceLowToHigh] = useState<Checked>(false);
    const [showPriceHighToLow, setShowPriceHighToLow] = useState<Checked>(false);

    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center px-4 space-x-2 bg-primary text-white rounded py-1">
                        <ListFilter size={12} />
                        <small>FILTER</small>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[12rem] pb-2">
                        <DropdownMenuLabel>Filter by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col items-start gap-2">
                            <p className="text-base">Price: $0.00 - $399.99</p>
                            <Slider defaultValue={[0]} max={100} step={0.1} />
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-col items-start gap-2">
                            <p className="text-base">Rating: 0</p>
                            <Slider defaultValue={[0]} max={5} step={1} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center px-4 space-x-2 border text-primary rounded py-1">
                        <ArrowDownUp size={12} />
                        <small>SORT</small>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={showBestselling}
                            onCheckedChange={setShowBestselling}
                        >
                            Best selling
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showAtoZ}
                            onCheckedChange={setShowAtoZ}
                        >
                            Alphabetically, A-Z
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showZtoA}
                            onCheckedChange={setShowZtoA}
                        >
                            Alphabetically, Z-A
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPriceLowToHigh}
                            onCheckedChange={setShowPriceLowToHigh}
                        >
                            Price, low to high
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={showPriceHighToLow}
                            onCheckedChange={setShowPriceHighToLow}
                        >
                            Price, high to low
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex">
                <Button variant='ghost' size='icon'>
                    <LayoutGrid strokeWidth={1} size={20} />
                </Button>
                <Button variant='ghost' size='icon'>
                    <List strokeWidth={1} size={20} />
                </Button>
            </div>
        </div>
    )
}