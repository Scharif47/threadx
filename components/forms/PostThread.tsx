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
import { useOrganization } from "@clerk/nextjs";
import { ThreadValidationSchema } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

function PostThread({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  // Get zod schema for form
  const form = useForm({
    resolver: zodResolver(ThreadValidationSchema),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof ThreadValidationSchema>) => {
    await createThread({
      text: values.thread,
      author: values.accountId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    // Move user to home
    router.push("/");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex mt-10 flex-col justify-start gap-10"
      >
        {/* Field for thread */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500 hover:bg-indigo-400">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
