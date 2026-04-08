import { useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Tips from "./components/Tips";

function App() {
  const [form, setForm] = useState({
    textData: "",
    question: "",
  });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpload(e) {
    e.preventDefault();
    
    if (!form.textData.trim()) {
      setUploadStatus("Please enter document content to upload");
      setTimeout(() => setUploadStatus(""), 3000);
      return;
    }
    
    setIsLoading(true);
    setUploadStatus("");
    
    try {
      const response = await axios.post("http://localhost:3000/upload", {
        textData: form.textData,
      });
      
      setUploadStatus(response.data.message || "Document uploaded successfully!");
      setTimeout(() => setUploadStatus(""), 3000);
      
      // Don't clear textData - keep it for multiple questions
      // Only clear any previous response to indicate new context
      setResponse("");
      
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("Error: " + (err.response?.data?.message || err.message));
      setTimeout(() => setUploadStatus(""), 5000);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAsk(e) {
    e.preventDefault();
    
    if (!form.question.trim()) {
      setResponse("Please enter a question to ask.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:3000/ask", {
        question: form.question,
      });
      
      console.log(res.data);
      setResponse(res.data.answer || res.data.message || "Response received!");
      
      // Clear only the question field after asking
      setForm(prev => ({
        ...prev,
        question: ""
      }));
      
    } catch (err) {
      console.error("Ask error:", err);
      setResponse("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Document Q&A System
              </h2>

              {/* Document Upload Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Document Content
                  </label>
                  <textarea
                    name="textData"
                    placeholder="Enter your document text, context, or data here..."
                    onChange={handleChange}
                    value={form.textData}
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={isLoading || !form.textData.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Uploading Document...</span>
                    </div>
                  ) : (
                    "📄 Upload Document"
                  )}
                </button>

                {/* Upload Status Message */}
                {uploadStatus && (
                  <div className={`text-sm text-center py-2 px-3 rounded-lg ${
                    uploadStatus.includes("Error") 
                      ? "bg-red-900/50 text-red-300 border border-red-700" 
                      : "bg-green-900/50 text-green-300 border border-green-700"
                  }`}>
                    {uploadStatus}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800/50 text-gray-400">Ask Questions</span>
                </div>
              </div>

              {/* Question Asking Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    placeholder="What would you like to know about the document?"
                    onChange={handleChange}
                    value={form.question}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>

                {/* Ask Button */}
                <button
                  onClick={handleAsk}
                  disabled={isLoading || !form.question.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                      <span>Asking Question...</span>
                    </div>
                  ) : (
                    "❓ Ask Question"
                  )}
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <Tips />
          </div>

          {/* Response Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 shadow-xl h-fit">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
              AI Response
            </h2>

            {response ? (
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                </div>
                <button
                  onClick={() => setResponse("")}
                  className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Clear response
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
                <p className="text-gray-500">
                  Your AI response will appear here
                  <br />
                  after asking a question
                </p>
                {form.textData && !response && (
                  <p className="text-gray-600 text-sm mt-2">
                    Document is ready! Ask a question above.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;