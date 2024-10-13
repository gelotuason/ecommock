'use client';

import ProductDetail from "@/components/product/product-detail";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProductModal({ params }: { params: { id: number } }) {
    const router = useRouter();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
                const data = await res.json();

                setSelectedProduct(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProduct();
    }, []);

    if (!selectedProduct) return null;

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent className="w-5/6 max-h-full p-0 overflow-auto">
                <DialogHeader className="sr-only">
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>

                <ProductDetail className={{ px: 'px-6', pb: 'pb-6' }} selectedProduct={selectedProduct} />

                <DialogFooter className="sr-only" />
            </DialogContent>
        </Dialog>
    )
}