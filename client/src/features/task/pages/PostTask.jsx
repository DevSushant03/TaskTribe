import { useState } from "react";
import CircularLoader from "../../../Components/ui/CircularLoader";
import { TaskValidationSchema } from "../validator/task_validation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import TitleField from "../components/PostTaskForm/TitleField";
import AttachmentField from "../components/PostTaskForm/AttachmentField";
import BudgetField from "../components/PostTaskForm/BudgetField";
import DeadLineField from "../components/PostTaskForm/DeadLineField";
import DescriptionField from "../components/PostTaskForm/DescriptionField";
import RulesField from "../components/PostTaskForm/RulesField";
import TagField from "../components/PostTaskForm/TagField";

import useCreateTask from "../hooks/useCreateTask"


export default function PostTask() {
  const methods = useForm({
    resolver: zodResolver(TaskValidationSchema),
    mode: "onSubmit",
  });
  const { handleSubmit ,formState:{errors},reset} = methods;
  const { mutate, isPending } = useCreateTask(reset);
  const onSubmit = (data) => {
    console.log(data);
    
    const fd = new FormData();
    fd.append("title", data.title.trim());
    fd.append("description", data.description.trim());
    fd.append("tags", JSON.stringify(data.tags));
    if (data.budgetMin) fd.append("budgetMin", data.budgetMin);
    if (data.budgetMax) fd.append("budgetMax", data.budgetMax);
    if (data.deadline) fd.append("deadline", data.deadline);
    data.attachments.forEach((f) => fd.append("files", f.file));

    mutate(fd);
  };
  return (
    <div className="p-6 md:p-10 w-full mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Post a Task</h1>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1a1a1a] text-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          <TitleField />
          <DescriptionField />
          <TagField />
          <BudgetField />
          <DeadLineField />
          <AttachmentField />
          <RulesField/>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <CircularLoader /> : "Post Task"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
