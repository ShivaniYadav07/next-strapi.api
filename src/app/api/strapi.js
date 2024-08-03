export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { id, username, email, token } = req.body;
  
      let strapiData = {
        data: {
          id,
          username,
          email,
          token,
        },
      };
  
      try {
        const response = await fetch('http://localhost:1337/api/accounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(strapiData),
        });
  
        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const error = await response.json();
          res.status(response.status).json(error);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  