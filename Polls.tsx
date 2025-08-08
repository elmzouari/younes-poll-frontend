import { useEffect, useState } from "react";
import {
  getPolls,
  voteOnPoll,
  getComments,
  addComment,
} from "./src/api/api";

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    getPolls().then(setPolls);
  }, []);

  const handleVote = async (pollId, index) => {
    await voteOnPoll(pollId, index);
    const updated = await getPolls();
    setPolls(updated);
  };

  const loadComments = async (pollId) => {
    const data = await getComments(pollId);
    setComments((prev) => ({ ...prev, [pollId]: data }));
  };

  const handleAddComment = async (pollId) => {
    const message = newComments[pollId];
    if (!message) return;
    await addComment(pollId, "younes", message);
    setNewComments((prev) => ({ ...prev, [pollId]: "" }));
    loadComments(pollId);
  };

  return (
    <div className="p-4 space-y-8">
      {polls.map((poll) => (
        <div key={poll.id} className="border p-4 rounded-lg bg-white text-black">
          <h2 className="text-xl font-bold mb-2">{poll.question}</h2>
          {poll.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleVote(poll.id, index)}
              className="block w-full mb-2 bg-blue-500 text-white p-2 rounded"
            >
              {option}
            </button>
          ))}

          <div className="mt-4">
            <button
              onClick={() => loadComments(poll.id)}
              className="text-sm text-blue-700 underline"
            >
              Load Comments
            </button>

            {comments[poll.id]?.map((c) => (
              <p key={c.id} className="text-sm mt-1">
                <b>{c.username}:</b> {c.message}
              </p>
            ))}

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComments[poll.id] || ""}
                onChange={(e) =>
                  setNewComments((prev) => ({
                    ...prev,
                    [poll.id]: e.target.value,
                  }))
                }
                className="flex-1 border rounded p-1"
              />
              <button
                onClick={() => handleAddComment(poll.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
