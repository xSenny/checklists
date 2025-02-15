"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });
  const {mutate} = api.post.deletePost.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate()
    }
  })

  const { data, isLoading } = api.post.getAllPosts.useQuery();

  return (
    <div className="w-full max-w-xs">
      {isLoading ? (<p>We are currently loading!</p>) : (<>
        {data?.map((post) => {
          return (
            <p onClick={() => {
              mutate({ id: post.id })
            }} key={post.id} className="truncate">
              {post.name}
            </p>
          );
        })}
      </>)}
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
