import { Controller, useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

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

export default function AttachmentsField() {
  const { control } = useFormContext();

  return (
    <Controller
      name="attachments"
      control={control}
      render={({ field: { value = [], onChange } }) => {

        const handleFileChange = (e) => {
          const files = Array.from(e.target.files);
          const validFiles = [];
          const fileErrors = [];

          files.forEach((file) => {
            if (file.size > MAX_FILE_SIZE) {
              fileErrors.push(`${file.name} exceeds 10MB limit.`);
              return;
            }
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
              fileErrors.push(`${file.name} has an unsupported file type.`);
              return;
            }
            validFiles.push({ file, filename: file.name });
          });

          if (fileErrors.length > 0) toast.error(fileErrors.join(" "));
          if (validFiles.length > 0) onChange(validFiles);
        };

        const removeAttachment = (filename) =>
          onChange(value.filter((f) => f.filename !== filename));

        return (
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

            {value.length > 0 && (
              <ul className="mt-3 space-y-2">
                {value.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded-lg text-sm"
                  >
                    <span className="text-gray-300">📎 {file.filename}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.filename)}
                      className="text-red-500 hover:text-red-700 transition ml-2"
                      aria-label={`Remove ${file.filename}`}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }}
    />
  );
}
