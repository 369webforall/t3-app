import React from "react";
import { TopicForm } from "../_components/note";
import TopicsList from "../_components/topic-list";
const NotePage = () => {
  return (
    <div className="max-w-6xl p-4">
      <TopicForm />
      <TopicsList />
    </div>
  );
};

export default NotePage;
