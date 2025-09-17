import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import Loader from './Loader';

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger on location change
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300); // small grace time
    return () => clearTimeout(t);
  }, [location]);

  return loading ? <Loader /> : null;
};

export default RouteChangeLoader;


