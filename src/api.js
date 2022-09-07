function encodeUrl(url, options) {
  fetch(`http://localhost:8000/encode/${url}`, {
    method: "POST",
    body: JSON.stringify(options)
  });
}

const api = {
  encodeUrl
};

export default api;
