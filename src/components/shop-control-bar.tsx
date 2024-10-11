'use client';

import { useState, Dispatch, SetStateAction } from "react";
import { ListFilter, ArrowDownUp, LayoutList, Grid2X2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";

type ShopControlBarProps = {
    setLayout: Dispatch<SetStateAction<string>>
    sortBy: string
    setSortBy: Dispatch<SetStateAction<'bestSelling' | 'titleAsc' | 'titleDesc' | 'priceAsc' | 'priceDesc' | ''>>
    setFilterBy?: string
}

export default function ShopControlBar({ setLayout, sortBy, setSortBy }: ShopControlBarProps) {

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
                        <DropdownMenuRadioGroup value={sortBy}>
                            <DropdownMenuRadioItem value='bestSelling' onClick={() => setSortBy('bestSelling')}>Best selling</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='titleAsc' onClick={() => setSortBy('titleAsc')}>Alphabetically, A-Z</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='titleDesc' onClick={() => setSortBy('titleDesc')}>Alphabetically, Z-A</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='priceAsc' onClick={() => setSortBy('priceAsc')}>Price, low to high</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='priceDesc' onClick={() => setSortBy('priceDesc')}>Price, high to low</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex">
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setLayout('grid grid-cols-2 lg:grid-cols-3')}
                >
                    <Grid2X2 strokeWidth={1} size={20} />
                </Button>
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => setLayout('grid grid-cols-1')}
                >
                    <LayoutList strokeWidth={1} size={20} />
                </Button>
            </div>
        </div>
    )
}