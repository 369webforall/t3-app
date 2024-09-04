import React from "react";
import { TopicForm } from "~/app/_components/note";
const UpdateTopic = ({ id }: { id: string }) => {
  return (
    <div>
      <TopicForm id={id} />
    </div>
  );
};

export default UpdateTopic;
