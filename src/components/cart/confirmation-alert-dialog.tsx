'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeFromCart, clearAlert } from "@/lib/features/cart/cartSlice";

export default function ConfirmationAlertDialog() {
  const { type, productId, productName } = useAppSelector(state => state.cartReducer.alert);
  const dispatch = useAppDispatch();

  const handleContinue = () => productId && dispatch(removeFromCart(productId));

  const handleCancel = () => dispatch(clearAlert());

  if (type !== 'confirmation') return null;

  return (
    <AlertDialog open={type === 'confirmation'}>
      <AlertDialogContent className="w-3/4">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Do you want to remove <strong>{productName}</strong> from your cart?</AlertDialogTitle>
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