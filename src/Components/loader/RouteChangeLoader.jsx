import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger on location change
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [location]);

  useEffect(() => {
    // Scroll to top on route (pathname or search) change
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch {
      // fallback for browsers without behavior option
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  return loading ? <Loader /> : null;
};

export default RouteChangeLoader;


