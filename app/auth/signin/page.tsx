"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BackButton from "@/app/_component/BackButton";
import { useFormState, useFormStatus } from "react-dom";
import onSubmit from "../_lib/signin";

function showMessage(message: string | null | undefined) {
    if (message === "no_email") {
      return "이메일을 입력하세요.";
    }
    if (message === "not_email") {
      return "올바른 이메일을 입력하세요."
    }
    if (message === "no_password") {
      return "비밀번호를 입력하세요.";
    }
    if (message === "valid_password") {
      return "영문 소문자, 숫자, 특수기호를 포함해 주세요.";
    }    
    if (message === "check_password") {
        return "비밀번호가 일치하지 않습니다."
    }
    if (message === 'user_exists') {
        return '이미 사용 중인 아이디입니다.';
    }
    return "";
}

export default function SigninPage() {
    const [state, formAction] = useFormState(onSubmit, { message: '' });
    const { pending } = useFormStatus();
  return (
    <main className="w-full h-screen flex flex-col items-center gap-12 py-6 px-4">
      <section className="w-full">
        <div className="flex gap-6">
          <BackButton />
          <h1 className="font-bold">회원가입</h1>
        </div>
      </section>
      <section className="w-full h-full flex">
        <form action={formAction} className="flex flex-col gap-6 flex-grow">
          <div className="flex flex-col gap-4">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              placeholder="woozuda@email.com"
              className="h-12 bg-slate-100 border-none p-4 font-light"
            />
            { state?.message.includes('_email') &&
              <div className="text-red-500 text-sm">{showMessage(state?.message)}</div>
            }
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="영문 소문자, 숫자, 특수기호를 포함해 주세요."
              className="h-12 bg-slate-100 border-none p-4 font-light"
            />
            { state?.message.includes('_password') &&
              <div className="text-red-500 text-sm">{showMessage(state?.message)}</div>
            }
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password-check">비밀번호 확인</Label>
            <Input
              id="password-check"
              name="password-check"
              type="password"
              className="h-12 bg-slate-100 border-none p-4 font-light"
            />
            { state?.message.includes('check_password') &&
              <div className="text-red-500 text-sm">{showMessage(state?.message)}</div>
            }
          </div>
          <div className="flex flex-col mt-auto w-full gap-4">
            { 
              state?.message.includes('users') &&
              <div className="text-red-500">{showMessage(state?.message)}</div>
            }
            <Button type="submit" className="w-full h-12 rounded-3xl" disabled={pending}>
              가입하기
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
