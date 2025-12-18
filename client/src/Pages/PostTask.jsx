import React, { useState } from "react";
// import axios from "../utils/axiosInstance"; // adjust path based on your setup
import { task } from "../utils/api";
import CircularLoader from "../Components/CircularLoader";
export default function PostTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    attachments: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((f) => ({
      file: f,
      filename: f.name,
    }));
    setForm({ ...form, attachments: mapped });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // Basic text fields
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("tags", JSON.stringify(form.tags));
      fd.append("budgetMin", form.budgetMin);
      fd.append("budgetMax", form.budgetMax);
      fd.append("deadline", form.deadline);

      // Attach files
      form.attachments.forEach((f) => {
        fd.append("files", f.file);
      });

      const res = await task.createTask(fd);

      if (res.data.success) {
        alert("Task created successfully!");
      } else {
        alert("Failed to post task!");
      }

      // Reset form
      setForm({
        title: "",
        description: "",
        tags: [],
        budgetMin: "",
        budgetMax: "",
        deadline: "",
        attachments: [],
      });
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 md:p-10 w-full mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Post a Task</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1a1a] text-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block text-white-700 font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Description
          </label>
          <textarea
            rows="5"
            className="w-full border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
            placeholder="Describe the task…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-white-700 font-medium mb-2">Tags</label>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
              placeholder="Add a tag (e.g., Design)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Tag list */}
          <div className="flex flex-wrap gap-2 mt-3">
            {form.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Budget (₹)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              className="border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
              placeholder="Min"
              value={form.budgetMin}
              onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
            />
            <input
              type="number"
              className="border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
              placeholder="Max"
              value={form.budgetMax}
              onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Deadline
          </label>
          <input
            type="date"
            className="w-full border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Attachments (optional)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border border-white-300 rounded-lg p-2"
          />

          {/* File Preview */}
          <ul className="mt-2 text-sm text-white-600">
            {form.attachments.map((f) => (
              <li key={f.filename}>📎 {f.filename}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-orange-700 transition"
        >
          {loading ? <CircularLoader/> : "Post Task"}
        </button>
      </form>
    </div>
  );
}
