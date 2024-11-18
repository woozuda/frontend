// import LoginButton from "./_component/LoginButton";
// import LogoutButton from "./_component/LogoutButton";

import { CallToAction } from "@/components/action";
import {
  DefaultHeader,
  HeaderLoading,
  HomeHeader,
  MenuHeader,
  ModalHeader,
} from "@/components/header";
import NotificationDemo from "@/components/notification";

export default function Home() {
  return (
    <main>
      <DefaultHeader title="타이틀" />
      <ModalHeader title="11월" />
      <HomeHeader date="12월 12일" />
      <MenuHeader title="다이어리" text="텍스트" href="/" />
      <HeaderLoading />
      <CallToAction text="버튼텍스트" />
      <h1>WOOZUDA</h1>
      {/* <LoginButton />
      <LogoutButton /> */}
      <p>Welcome to woozuda</p>
      <NotificationDemo />
    </main>
  );
}
