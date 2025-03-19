useEffect(() => {
  const fetchHackathons = async () => {
    try {
      const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://your-actual-deployed-api.com/hackathons' // This should be your real API URL!
        : 'http://localhost:5000/hackathons';
      
      const response = await fetch(API_URL);
      
      // ... rest of your fetch function
    } catch (error) {
      setError('Failed to fetch hackathons: ' + error.message);
    }
  };
  
  fetchHackathons();
}, []); 