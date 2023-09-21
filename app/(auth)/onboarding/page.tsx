import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  // Get the user's information
  const user = await currentUser();

  const userInfo = {};

  // Create a User object and pass data from the database and Clerk
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "User",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="flex flex-col justify-start max-w-3xl mx-auto px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to get started.
      </p>

      <section className="mt-9 p-10 bg-dark-2">
        <AccountProfile user={userData} btnTitle={"Continue"} />
      </section>
    </main>
  );
}

export default Page;
