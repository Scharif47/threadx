"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
// import { updateUser } from "@/lib/actions/user.actions";
// import { UserValidationSchema } from "@/lib/validations/user";

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

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Get zod schema for form
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {
     thread: '',
     accountId: userId,
    },
  });

  return <h1>Post Thread Form</h1>;
}

export default PostThread;
