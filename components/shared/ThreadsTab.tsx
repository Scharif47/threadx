interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  // TODO: Fetch profile threads

  return <section>ThreadsTab</section>;
};

export default ThreadsTab;
