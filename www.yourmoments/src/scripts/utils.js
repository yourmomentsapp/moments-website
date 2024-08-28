async function statusCheck(res) {
  if (!res.ok) {
    throw new Error(await res.text())
  }
  return res;
}

const BASE_URL = "https://api.yourmoments.app";

export { statusCheck, BASE_URL}