import React, { useState, useEffect } from "react";
import { task } from "../utils/api";
import CircularLoader from "./CircularLoader";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function EditTaskModal({ task: taskData, isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    attachments: [],
  });

  const [existingAttachments, setExistingAttachments] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize form with task data when modal opens
  useEffect(() => {
    if (isOpen && taskData) {
      setForm({
        title: taskData.title || "",
        description: taskData.description || "",
        tags: taskData.tags || [],
        budgetMin: taskData.budget?.min || "",
        budgetMax: taskData.budget?.max || "",
        deadline: taskData.deadline ? new Date(taskData.deadline).toISOString().split('T')[0] : "",
        attachments: [],
      });
      setExistingAttachments(taskData.attachments || []);
    }
  }, [isOpen, taskData]);

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
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

  const handleDeleteAttachment = (url) => {
    setExistingAttachments(existingAttachments.filter((att) => att.url !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (taskData.status !== "open") {
      toast.warning("You can only edit tasks that are open");
      return;
    }

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

      // Get URLs of deleted attachments
      const deletedUrls = (taskData.attachments || [])
        .filter((att) => !existingAttachments.some((eAtt) => eAtt.url === att.url))
        .map((att) => att.url);
      
      if (deletedUrls.length > 0) {
        fd.append("deleteAttachments", JSON.stringify(deletedUrls));
      }

      // Attach new files
      form.attachments.forEach((f) => {
        fd.append("files", f.file);
      });

      const res = await task.editTask(taskData._id, fd);

      if (res.data.success) {
        toast.success("Task Updated Successfully")
        onSuccess();
        onClose();
      } else {
        toast.error(res.data.message || "Failed to update task!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating task");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] text-white rounded-2xl shadow-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Edit Task</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white-700 font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
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
              className="w-full border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
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
                className="flex-1 border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
                placeholder="Add a tag (e.g., Design)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
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
                    className="text-red-500 hover:text-red-700"
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
                className="border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
                placeholder="Min"
                value={form.budgetMin}
                onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
              />
              <input
                type="number"
                className="border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
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
              className="w-full border border-white-300 rounded-lg p-3 bg-[#0a0a0a] focus:ring-2 focus:ring-orange-300"
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>

          {/* Existing Attachments */}
          {existingAttachments.length > 0 && (
            <div>
              <label className="block text-white-700 font-medium mb-1">
                Current Attachments
              </label>
              <div className="space-y-2">
                {existingAttachments.map((att, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded-lg border border-gray-700"
                  >
                    <a
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-500 hover:text-orange-400 flex-1 truncate"
                    >
                      📎 {att.filename || "Attachment"}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDeleteAttachment(att.url)}
                      className="ml-2 text-red-500 hover:text-red-400 px-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Attachments */}
          <div>
            <label className="block text-white-700 font-medium mb-1">
              Add New Attachments (optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border border-white-300 rounded-lg p-2 bg-[#0a0a0a]"
            />

            {/* File Preview */}
            <ul className="mt-2 text-sm text-gray-400">
              {form.attachments.map((f, index) => (
                <li key={index}>📎 {f.filename}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-orange-700 transition"
            >
              {loading ? <CircularLoader /> : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

