import { Check, X } from 'lucide-react';

const Toast = ({ children, onClose, type = 'success' }) => (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown max-w-[90vw] w-max">
    <div className={`flex items-center gap-2 px-4 py-3 bg-white border rounded-lg shadow-lg
      ${type === 'success' ? 'border-emerald-200' : 'border-red-200'}`}>
      <div className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full
        ${type === 'success' ? 'bg-emerald-100' : 'bg-red-100'}`}>
        {type === 'success' ? (
          <Check className="h-4 w-4 text-emerald-600" />
        ) : (
          <X className="h-4 w-4 text-red-600" />
        )}
      </div>
      <span className={`text-sm font-medium break-words ${type === 'success' ? 'text-gray-700' : 'text-red-700'}`}>
        {children}
      </span>
      <button onClick={onClose} className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default Toast;
