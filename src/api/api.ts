import axios from "axios";

const API_BASE = "https://6625f26d052332d55322fc6d.mockapi.io/api/v1";

export const getPolls = async () => {
  const res = await axios.get(`${API_BASE}/polls`);
  return res.data;
};

export const createPoll = async (pollData: { question: string; options: string[] }) => {
  const res = await axios.post(`${API_BASE}/polls`, {
    ...pollData,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};

export const voteOnPoll = async (pollId: string, optionIndex: number) => {
  const res = await axios.post(`${API_BASE}/votes`, {
    pollId,
    optionIndex,
    votedAt: new Date().toISOString(),
  });
  return res.data;
};

export const getComments = async (pollId: string) => {
  const res = await axios.get(`${API_BASE}/comments`, {
    params: { pollId },
  });
  return res.data;
};

export const addComment = async (pollId: string, username: string, message: string) => {
  const res = await axios.post(`${API_BASE}/comments`, {
    pollId,
    username,
    message,
    createdAt: new Date().toISOString(),
  });
  return res.data;
};
