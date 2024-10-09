'use client';

import { Product } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/lib/hooks";
import { removeFromCart } from "@/lib/features/cart/cartSlice";

type RemoveAlertDialogProps = {
  isRemoveAlertDialogOpen: boolean
  setIsRemoveAlertDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>
  selectedProduct: Product
}

export default function RemoveAlertDialog({ isRemoveAlertDialogOpen, setIsRemoveAlertDialogOpen, setIsEditDialogOpen, selectedProduct }: RemoveAlertDialogProps) {
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    if (selectedProduct) {
      dispatch(removeFromCart(selectedProduct.id));
      setIsEditDialogOpen(false);
      setIsRemoveAlertDialogOpen(false);
    }
  }

  const handleCancel = () => setIsRemoveAlertDialogOpen(false);

  return (
    <AlertDialog open={isRemoveAlertDialogOpen} onOpenChange={setIsRemoveAlertDialogOpen}>
      <AlertDialogContent className="w-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Do you want to remove <strong>{selectedProduct && selectedProduct.title}</strong> from your cart?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleContinue()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}