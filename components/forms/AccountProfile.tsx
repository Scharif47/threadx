"use client";

interface AccountProfileProps {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {
  return (
    <div>
      <h1>Account Profile</h1>
    </div>
  );
};

export default AccountProfile;
