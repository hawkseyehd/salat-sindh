"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [state, formAction] = useActionState(loginUser, null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    toast({ title: state.success ? "کامیابی" : "خرابی", description: state.message });
    if (state.success) {
      router.replace("/");
    }
  }, [state, toast, router]);
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-blue-200">
          صارف نام
        </Label>
        <Input id="username" name="username" type="text" className="bg-gray-800 border-blue-700/30 text-blue-200" placeholder="اپنا صارف نام درج کریں" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-blue-200">
          پاس ورڈ
        </Label>
        <Input id="password" name="password" type="password" className="bg-gray-800 border-blue-700/30 text-blue-200" placeholder="اپنا پاس ورڈ درج کریں" required />
      </div>
      <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white" disabled={state?.success === true}>
        {state?.success ? "کامیاب" : "لاگ ان"}
      </Button>
      {state && (
        <p className={`mt-2 text-center ${state.success ? "text-green-400" : "text-red-400"}`}>{state.message}</p>
      )}
    </form>
  );
}


