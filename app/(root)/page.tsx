import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  // Get current user
  const user = await currentUser();

  // Fetch threads
  const result = await fetchThreads(1, 30);
  const { threads } = result;

  return (
    <>
      <section className="flex flex-col mt-9 gap-10">
        {threads.length === 0 ? (
          <p className="no-result">No Threads found</p>
        ) : (
          <>
            {threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
