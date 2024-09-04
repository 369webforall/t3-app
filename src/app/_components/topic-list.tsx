"use client";
import React from "react";
import { api } from "~/trpc/react";

const TopicsList = () => {
  // Fetch all topics using TRPC's useQuery hook
  const { data: topics, isLoading, error } = api.topic.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading topics: {error.message}</div>;
  }

  // Ensure topics is defined
  const safeTopics = topics ?? [];

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
                {topic.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(topic.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {/* Add your action buttons here */}
                <button className="rounded bg-blue-500 px-2 py-1 text-white">
                  Edit
                </button>
                <button className="ml-2 rounded bg-red-500 px-2 py-1 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopicsList;
