import { Wand2, Brain, CheckCircle, Loader2 } from 'lucide-react';

export default function AISuggestions({ onGetSuggestions, isLoading, showSuggestions }) {
  return (
    <div className="bg-light border border-primary-subtle rounded-4 p-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="bg-purple rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
          <Brain size={20} color="white" />
        </div>
        <div>
          <h5 className="mb-0 fw-semibold text-dark">Gợi ý AI</h5>
          <small className="text-muted">Tìm khóa học phù hợp với bạn</small>
        </div>
      </div>

      <p className="text-muted mb-3">
        AI sẽ phân tích lịch sử học tập và sở thích của bạn để đưa ra những gợi ý khóa học tốt nhất.
      </p>

      <button
        onClick={onGetSuggestions}
        disabled={isLoading}
        className="btn btn-primary bg-purple w-100 d-flex align-items-center justify-content-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="spinner-border spinner-border-sm me-2" />
            Đang phân tích...
          </>
        ) : (
          <>
            <Wand2 size={18} />
            Lấy gợi ý AI
          </>
        )}
      </button>

      {showSuggestions && !isLoading && (
        <div className="mt-3 p-2 border rounded bg-white text-primary d-flex align-items-center gap-2">
          <CheckCircle size={16} />
          <small>Đã tìm thấy gợi ý phù hợp!</small>
        </div>
      )}
    </div>
  );
}
