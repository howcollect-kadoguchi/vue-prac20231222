import axios from 'axios';

export async function getBookList(offset: number, token?: string) {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}${!token && '/public'}/books?offset=${offset}`;

    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.error('APIからデータを取得できませんでした:', error);
    throw error; // エラーを呼び出し元に伝える
  }
}
