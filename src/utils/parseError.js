export default function parseError(err) {
  try {
    if (!err) return 'An unknown error occurred';

    // Axios response payload
    const res = err.response?.data;
    if (res) {
      // If backend returned a plain string
      if (typeof res === 'string' && res.trim()) return res;

      // Common message fields
      if (typeof res.message === 'string' && res.message.trim()) return res.message;
      if (Array.isArray(res.message) && res.message.length) return res.message.join(', ');

      if (typeof res.error === 'string' && res.error.trim()) return res.error;
      if (Array.isArray(res.error) && res.error.length) return res.error.join(', ');

      // Validation style: { errors: [ { msg: 'x' }, 'y' ] }
      if (Array.isArray(res.errors) && res.errors.length) {
        const parts = res.errors.map((it) => {
          if (!it) return '';
          if (typeof it === 'string') return it;
          if (typeof it.msg === 'string') return it.msg;
          if (typeof it.message === 'string') return it.message;
          return JSON.stringify(it);
        }).filter(Boolean);
        if (parts.length) return parts.join(', ');
      }

      // Some APIs nest validation under data.errors or errors object
      const nested = res.data || res.result || res.error || res.errors;
      if (typeof nested === 'string' && nested.trim()) return nested;

      // If res has a top-level object with useful keys, stringify small objects
      if (typeof res === 'object') {
        // Try common shapes
        const possible = res?.detail || res?.msg || res?.Message || res?.message || res?.error;
        if (typeof possible === 'string' && possible.trim()) return possible;
      }

      // Fallback: stringified response body (shortened)
      const json = JSON.stringify(res);
      if (json && json.length < 500) return json;
      return 'Server responded with an error';
    }

    // Fallback to axios/JS error message
    if (err.message) return err.message;

    return 'An unknown error occurred';
  } catch (e) {
    return 'An error occurred while parsing the server error';
  }
}
