import React, { useState } from "react";
// import axios from "../utils/axiosInstance"; // adjust path based on your setup
import { task } from "../utils/api";
import CircularLoader from "../Components/CircularLoader";
import { toast } from "react-toastify";
import { TaskValidationSchema } from "../Validation/task_validation";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

export default function PostTask() {
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const addTag = () => {
    if (!tagInput.trim()) return;

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));

    setTagInput("");
  };

  const handleTagInputKeyPress = (e) => {
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
    const validFiles = [];
    const fileErrors = [];

    files.forEach((file) => {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name} exceeds 10MB limit.`);
        return;
      }

      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name} has an unsupported file type.`);
        return;
      }

      validFiles.push({
        file: file,
        filename: file.name,
      });
    });

    if (fileErrors.length > 0) {
      toast.error(fileErrors.join(" "));
    }

    if (validFiles.length > 0) {
      setForm({ ...form, attachments: validFiles });
    }
  };

  const removeAttachment = (filename) => {
    setForm({
      ...form,
      attachments: form.attachments.filter((f) => f.filename !== filename),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mark all fields as touched
    const allFields = [
      "title",
      "description",
      "tags",
      "budgetMin",
      "budgetMax",
      "deadline",
      "agreedRules",
    ];
    const newTouched = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    try {
      // Validate form data using Zod
      const validationResult = TaskValidationSchema.safeParse({
        title: form.title,
        description: form.description,
        tags: form.tags,
        budgetMin: form.budgetMin,
        budgetMax: form.budgetMax,
        deadline: form.deadline,
        agreedRules: form.agreedRules,
      });

      if (!validationResult.success) {
        const validationErrors = {};
        const issues = validationResult.error.issues || [];

        issues.forEach((err) => {
          const field = err.path?.[0] || "form";
          validationErrors[field] = err.message;
        });

        setErrors(validationErrors);

        const firstMessage =
          issues.length > 0 ? issues[0].message : "Validation failed";

        toast.error(firstMessage);
        setLoading(false);
        return;
      }

      // Clear errors if validation passes
      setErrors({});

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
        setErrors({});
        setTouched({});
      } else {
        toast.error(res.data.message || "Failed to post task!");
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || err.message || "Error creating task";
      toast.error(errorMessage);
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
          <label className="block text-white-700 font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
              touched.title && errors.title
                ? "border-red-500"
                : "border-white-300"
            }`}
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          {touched.title && errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-gray-400 text-xs mt-1">
            {form.title.length}/100 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="5"
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
              touched.description && errors.description
                ? "border-red-500"
                : "border-white-300"
            }`}
            placeholder="Describe the task…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          ></textarea>
          {touched.description && errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-gray-400 text-xs mt-1">
            {form.description.length}/2000 characters
          </p>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-white-700 font-medium mb-2">
            Tags <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              className="flex-1 border border-white-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-300"
              placeholder="Add a tag (e.g., Design) - Press Enter to add"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              maxLength={30}
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Add
            </button>
          </div>
          {touched.tags && errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}

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
                  className="text-red-500 hover:text-red-700 transition"
                  aria-label={`Remove ${tag} tag`}
                >
                  ✖
                </button>
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {form.tags.length}/10 tags
          </p>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Budget (₹)  <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 w-full ${
                  touched.budgetMin && errors.budgetMin
                    ? "border-red-500"
                    : "border-white-300"
                }`}
                placeholder="Min"
                value={form.budgetMin}
                onChange={(e) =>
                  setForm({ ...form, budgetMin: e.target.value })
                }
              />
              {touched.budgetMin && errors.budgetMin && (
                <p className="text-red-500 text-sm mt-1">{errors.budgetMin}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 w-full ${
                  touched.budgetMax && errors.budgetMax
                    ? "border-red-500"
                    : "border-white-300"
                }`}
                placeholder="Max"
                value={form.budgetMax}
                onChange={(e) =>
                  setForm({ ...form, budgetMax: e.target.value })
                }
              />
              {touched.budgetMax && errors.budgetMax && (
                <p className="text-red-500 text-sm mt-1">{errors.budgetMax}</p>
              )}
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Deadline  <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-300 ${
              touched.deadline && errors.deadline
                ? "border-red-500"
                : "border-white-300"
            }`}
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          {touched.deadline && errors.deadline && (
            <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
          )}
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-white-700 font-medium mb-1">
            Attachments{" "}
            <span className="text-gray-400 text-sm">
              (Optional, max 10MB per file)
            </span>
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
            className="w-full border border-white-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700"
          />
          <p className="text-gray-400 text-xs mt-1">
            Allowed: Images (JPG, PNG, GIF), PDF, Word docs, Text files
          </p>

          {/* File Preview */}
          {form.attachments.length > 0 && (
            <ul className="mt-3 space-y-2">
              {form.attachments.map((f) => (
                <li
                  key={f.filename}
                  className="flex items-center justify-between bg-gray-800 p-2 rounded-lg text-sm"
                >
                  <span className="text-gray-300">📎 {f.filename}</span>
                  <button
                    type="button"
                    onClick={() => removeAttachment(f.filename)}
                    className="text-red-500 hover:text-red-700 transition ml-2"
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
          <details className="mb-2 bg-[#161616] border border-orange-500/30 rounded-lg p-3 cursor-pointer group">
            <summary className="flex items-center cursor-pointer font-semibold text-orange-400 select-none">
              <input
                type="checkbox"
                id="agreeRules"
                checked={form.agreedRules}
                onChange={(e) =>
                  setForm({ ...form, agreedRules: e.target.checked })
                }
                className={`w-4 h-4 mr-2 accent-orange-600 ${
                  touched.agreedRules && errors.agreedRules
                    ? "ring-2 ring-red-500"
                    : ""
                }`}
              />
              <label
                htmlFor="agreeRules"
                className="text-sm text-gray-300 select-none cursor-pointer"
              >
                I have read and agree to the above rules and regulations.{" "}
                <span className="text-red-500">*</span>
              </label>
            </summary>
            <ul className="mt-3 ml-7 text-white text-sm space-y-2 list-disc">
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
          {touched.agreedRules && errors.agreedRules && (
            <p className="text-red-500 text-sm mt-1">{errors.agreedRules}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-xl text-lg font-medium hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <CircularLoader /> : "Post Task"}
        </button>
      </form>
    </div>
  );
}
