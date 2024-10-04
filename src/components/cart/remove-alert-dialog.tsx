'use client';

import { Product } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/lib/hooks";
import { removeFromCartAsync } from "@/lib/features/cart/cartThunks";

type RemoveAlertDialogProps = {
  isRemoveAlertDialogOpen: boolean
  setIsRemoveAlertDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>
  product: Product
}

export default function RemoveAlertDialog({ isRemoveAlertDialogOpen, setIsRemoveAlertDialogOpen, setIsEditDialogOpen, product }: RemoveAlertDialogProps) {
  const dispatch = useAppDispatch();

  const handleContinue = () => {
    if (product) {
      dispatch(removeFromCartAsync(product.id));
      setIsEditDialogOpen(false);
      setIsRemoveAlertDialogOpen(false);
    }
  }

  const handleCancel = () => setIsRemoveAlertDialogOpen(false);

  return (
    <AlertDialog open={isRemoveAlertDialogOpen} onOpenChange={setIsRemoveAlertDialogOpen}>
      <AlertDialogContent className="w-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Do you want to remove <strong>{product && product.title}</strong> from your cart?</AlertDialogTitle>
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