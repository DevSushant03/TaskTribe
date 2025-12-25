import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { task } from "../utils/api";
import CircularLoader from "../Components/CircularLoader";
import { toast } from "react-toastify";

export default function PostTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: [],
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    attachments: [],
    agreedRules: false, // Checkbox for agreeing to rules & regulations
  });

  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = [];
    for (let file of files) {
      if (file.size > maxSize) {
        toast.warning(`File ${file.name} exceeds 10MB limit`);
        continue;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.warning(`File ${file.name} has unsupported format`);
        continue;
      }
      validFiles.push({
        file: file,
        filename: file.name,
      });
    }
    setForm({ ...form, attachments: validFiles });
  };

  const validateForm = () => {
    // Validate title
    if (!form.title.trim()) {
      toast.error("Title is required");
      return false;
    }
    if (form.title.length > 100) {
      toast.error("Title must be less than 100 characters");
      return false;
    }

    // Validate description
    if (!form.description.trim()) {
      toast.error("Description is required");
      return false;
    }
    if (form.description.length > 2000) {
      toast.error("Description must be less than 2000 characters");
      return false;
    }

    // Validate budget
    if (form.budgetMin && form.budgetMax) {
      const min = parseFloat(form.budgetMin);
      const max = parseFloat(form.budgetMax);
      if (min < 0 || max < 0) {
        toast.error("Budget values must be positive");
        return false;
      }
      if (min > max) {
        toast.error("Minimum budget cannot be greater than maximum budget");
        return false;
      }
    }

    // Validate deadline
    if (form.deadline) {
      const deadlineDate = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        toast.error("Deadline must be a future date");
        return false;
      }
    }

    // Validate rules agreement
    if (!form.agreedRules) {
      toast.warning("You must agree to the rules and regulations to post a task");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      // Basic text fields
      fd.append("title", form.title.trim());
      fd.append("description", form.description.trim());
      fd.append("tags", JSON.stringify(form.tags));
      if (form.budgetMin) fd.append("budgetMin", form.budgetMin);
      if (form.budgetMax) fd.append("budgetMax", form.budgetMax);
      if (form.deadline) fd.append("deadline", form.deadline);

      // Attach files
      form.attachments.forEach((f) => {
        fd.append("files", f.file);
      });

      const res = await task.createTask(fd);

      if (res.data.success) {
        toast.success("Task created successfully!");

        // Reset form
        setForm({
          title: "",
          description: "",
          tags: [],
          budgetMin: "",
          budgetMax: "",
          deadline: "",
          attachments: [],
          agreedRules: false,
        });
        setTagInput("");

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        // Navigate to task list or dashboard after a short delay
        setTimeout(() => {
          navigate(`/user/${id}/browse`);
        }, 1500);
      } else {
        toast.error(res.data.message || "Failed to post task!");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Error creating task. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
          <label className="block text-gray-300 font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            maxLength={100}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            {form.title.length}/100 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            className="w-full bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
            placeholder="Describe the task in detail…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            maxLength={2000}
            required
          ></textarea>
          <p className="text-xs text-gray-400 mt-1">
            {form.description.length}/2000 characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">Tags</label>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Add a tag (e.g., Design) - Press Enter to add"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Add
            </button>
          </div>

          {/* Tag list */}
          {form.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-400 hover:text-red-300 transition"
                    aria-label={`Remove ${tag} tag`}
                  >
                    ✖
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Budget (₹)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              className="bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Min"
              value={form.budgetMin}
              onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              className="bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Max"
              value={form.budgetMax}
              onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Deadline
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-[#161616] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Attachments (optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
            className="w-full bg-[#161616] border border-gray-600 rounded-lg p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
          />
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: Images, PDF, Word documents. Max size: 10MB per file
          </p>

          {/* File Preview */}
          {form.attachments.length > 0 && (
            <ul className="mt-3 space-y-2">
              {form.attachments.map((f, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#161616] border border-gray-600 rounded-lg p-2 text-sm text-gray-300"
                >
                  <span className="flex items-center gap-2">
                    <span>📎</span>
                    <span className="truncate max-w-xs">{f.filename}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newAttachments = form.attachments.filter(
                        (_, i) => i !== index
                      );
                      setForm({ ...form, attachments: newAttachments });
                    }}
                    className="text-red-400 hover:text-red-300 ml-2"
                    aria-label={`Remove ${f.filename}`}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Rules & Regulations Dropdown */}
        <div className="my-4">
          <details className="mb-2 bg-[#161616] border border-orange-500/30 rounded-lg p-3 group">
            <summary className="cursor-pointer font-semibold text-orange-400 select-none list-none flex items-center justify-between">
              <span>Rules & Regulations</span>
              <span className="text-sm group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <ul className="mt-3 ml-2 text-gray-300 text-sm space-y-2 list-disc list-inside">
              <li>Provide a clear and accurate task description.</li>
              <li>
                Mention expected deliverables, deadline, and budget (if
                applicable).
              </li>
              <li>Do not post illegal, unethical, or misleading tasks.</li>
              <li>
                Avoid sharing personal contact details in task description.
              </li>
              <li>
                Once a freelancer is assigned, editing the task may be
                restricted.
              </li>
              <li>
                TaskTribe is not responsible for disputes—clear instructions
                reduce conflicts.
              </li>
            </ul>
          </details>
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              id="agreeRules"
              checked={form.agreedRules || false}
              onChange={(e) =>
                setForm({ ...form, agreedRules: e.target.checked })
              }
              className="w-4 h-4 accent-orange-600 cursor-pointer"
            />
            <label
              htmlFor="agreeRules"
              className="text-sm text-gray-300 select-none cursor-pointer"
            >
              I have read and agree to the above rules and regulations.{" "}
              <span className="text-red-500">*</span>
            </label>
          </div>
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <CircularLoader />
              <span>Posting Task...</span>
            </>
          ) : (
            "Post Task"
          )}
        </button>
      </form>
    </div>
  );
}
