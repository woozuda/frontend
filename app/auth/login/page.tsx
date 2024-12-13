"use client";

import BackButton from "@/app/_component/BackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import useSubmit from "../_lib/login";

function showMessage(message: string | null | undefined) {
  if (message === "no_email") {
    return "이메일을 입력하세요.";
  }
  if (message === "not_email") {
    return "올바른 이메일을 입력하세요.";
  }
  if (message === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (message === "user_not_found") {
    return "사용자를 찾을 수 없습니다.";
  }
  return "";
}

export default function LoginPage() {
  const onSubmit = useSubmit();
  const [state, formAction] = useFormState(onSubmit, { message: "" });
  const { pending } = useFormStatus();

  return (
    <main className="w-full h-screen flex flex-col items-center gap-12 py-6 px-4">
      <section className="w-full">
        <div className="flex gap-6">
          <BackButton />
          <h1 className="font-bold">로그인</h1>
        </div>
      </section>
      <section className="w-full h-full flex">
        <form action={formAction} className="flex flex-col flex-grow gap-6 ">
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              placeholder="woozuda@email.com"
              className="h-12 bg-slate-100 border-none p-4 font-light"
            />
            {state?.message.includes("_email") && (
              <div className="text-red-500 text-sm">
                {showMessage(state?.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="h-12 bg-slate-100 border-none p-4 font-light"
            />
            {state?.message.includes("_password") && (
              <div className="text-red-500 text-sm">
                {showMessage(state?.message)}
              </div>
            )}
          </div>
          <div className="flex flex-col mt-auto gap-4">
            {state?.message.includes("users") && (
              <div className="text-red-500">{showMessage(state?.message)}</div>
            )}
            <Button
              type="submit"
              className="w-full h-12 rounded-3xl"
              disabled={pending}
            >
              로그인
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
