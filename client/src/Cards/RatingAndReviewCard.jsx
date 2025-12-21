import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { task } from "../utils/api";
import CircularLoader from "../Components/CircularLoader";

export default function RatingAndReviewCard({ taskId, onClose, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!review.trim()) {
      setError("Please write a review");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await task.markAsComplete(taskId, review.trim(), rating);
      alert(res.data.message);
      onSuccess();
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to submit rating and review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#050505] border border-[#1b1b1b] shadow-[0_15px_10px_rgba(0,0,0,0.65)] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Rate & Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                  disabled={loading}
                >
                  <FaStar
                    className={`${
                      star <= (hoveredRating || rating)
                        ? "text-[#ff6b00] fill-[#ff6b00]"
                        : "text-gray-500 fill-gray-500"
                    } transition-colors`}
                    size={32}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-gray-400 text-sm">
                  {rating} {rating === 1 ? "star" : "stars"}
                </span>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience working on this task..."
              rows={5}
              className="w-full rounded-lg bg-[#0b0b0b] border border-[#222] px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] transition resize-none"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg border border-[#2b2b2b] bg-[#101010] px-4 py-2.5 text-[13px] font-medium text-gray-200 hover:border-[#ff6b00] hover:text-white hover:bg-[#151515] transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || rating === 0 || !review.trim()}
              className="flex-1 rounded-lg bg-[#ff6b00] px-4 py-2.5 text-[13px] font-semibold text-black  transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <CircularLoader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
