import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';
import {currentUser} from '@clerk/nextjs';
import {redirect} from 'next/navigation';

async function Page() {
  // Get the current user from Clerk API
  const user = await currentUser();

  if(!user) return null;

  // Fetch the user information
  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding'); 

  return (
    <>
    <h1  className="head-text">Create Thread</h1>

    <PostThread userId={userInfo._id} />
    </>
  )
}

export default Page;
