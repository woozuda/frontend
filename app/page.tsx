// import LoginButton from "./_component/LoginButton";
// import LogoutButton from "./_component/LogoutButton";

import NotificationDemo from "@/components/notification";

export default function Home() {
  return (
    <main>
      <h1>WOOZUDA</h1>
      {/* <LoginButton />
      <LogoutButton /> */}
      <p className="font-hans text-h1 text-app-blue-100">Welcome to woozuda</p>
      <NotificationDemo />
    </main>
  );
}
