export interface HistoryItem {
  id: string;
  title: string;
}

export interface HistoryResponse {
  chats: HistoryItem[];
}
