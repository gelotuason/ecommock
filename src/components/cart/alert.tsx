'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFromCart, clearAlert } from "@/lib/features/cart/cartSlice";

export default function Alert() {
  const dispatch = useAppDispatch();
  const { productName, productId } = useAppSelector(state => state.cartReducer.alert);

  const handleContinue = () => {
    if (productId) dispatch(removeFromCart(productId))

    dispatch(clearAlert());
  }

  const handleCancel = () => dispatch(clearAlert());

  if (!productName) return null;

  return (
    <AlertDialog open={!!productName}>
      <AlertDialogContent className="w-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Do you want to remove <strong>{productName}</strong> from your cart?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">{productName}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleCancel()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleContinue()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}