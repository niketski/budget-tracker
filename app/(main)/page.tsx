// import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function Page() {

  const session = await auth();

  if(!session) {
    redirect('/login');
  }
  console.log('session: ', session);

  return (
    <>
      <h1>Homepage</h1>
      <form action={async () => {
        'use server'

        await signOut();
      }}>
        <button type="submit">Sign Out</button>
      </form>
    </>
  )
}
