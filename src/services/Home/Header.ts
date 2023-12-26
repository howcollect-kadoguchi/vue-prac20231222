import axios from 'axios';

// ユーザデータを取得
export const fetchGetUserData = async (
  cookiesToken: string,
  setUser: (data: any) => void,
  remove: () => void,
  setErrorMessage: (message: string) => void
) => {
  try {
    const url = `https://railway.bookreview.techtrain.dev`;
    const res = await axios.get(`${url}/users`, {
      headers: {
        Authorization: `Bearer ${cookiesToken}`,
      },
    });
    setUser(res.data);
  } catch (err: any) {
    if (err.response) {
      // 401 認証エラー
      if (err.response.status === 401) {
        // dispatch(signOut());
        // removeCookie('token');
        remove();
        setErrorMessage('セッションの有効期限が切れています。再度ログインしてください。');
        return;
      }
      if (err.response.data && err.response.data.ErrorMessageJP) {
        setErrorMessage(`データ取得に失敗しました。${err.response.data.ErrorMessageJP}`);
      } else {
        setErrorMessage(`エラー：${err}`);
      }
    } else {
      setErrorMessage(`エラー：${err}`);
    }
  }
};
