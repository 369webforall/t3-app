"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const TopicsList = () => {
  // Fetch all topics using TRPC's useQuery hook
  const { data: topics, isLoading, error } = api.topic.getAll.useQuery();
  const utils = api.useUtils();

  // Mutations for deleting and updating
  const deleteTopic = api.topic.delete.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate(); // Await the invalidate promise
    },
  });

  const updateTopic = api.topic.udate.useMutation({
    onSuccess: async () => {
      await utils.topic.invalidate(); // Await the invalidate promise
      setEditingTopicId(null); // Reset editing state after update
    },
  });

  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading topics: {error.message}</div>;
  }

  // Ensure topics is defined
  const safeTopics = topics ?? [];

  const handleEdit = (topic: { id: string; title: string }) => {
    setEditingTopicId(topic.id); // Set the topic being edited
    setEditTitle(topic.title); // Pre-fill the input with the topic title
  };

  const handleUpdate = (id: string) => {
    if (editTitle.trim() !== "") {
      updateTopic.mutate({ id, title: editTitle });
    }
  };

  const handleDelete = (id: string) => {
    deleteTopic.mutate({ id });
  };

  return (
    <div className="w-full">
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {safeTopics.map((topic) => (
            <tr key={topic.id}>
              <td className="border border-gray-300 px-4 py-2">
                {editingTopicId === topic.id ? (
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                    className="w-full"
                  />
                ) : (
                  topic.title
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(topic.createdAt).toLocaleDateString()}
              </td>
              <td className="space-x-2 border border-gray-300 px-4 py-2">
                {editingTopicId === topic.id ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => handleUpdate(topic.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setEditingTopicId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => handleEdit(topic)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(topic.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopicsList;
