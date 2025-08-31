const axios = require("axios");

module.exports.initializeRoutes = (app) => {

    // Get the arabic surah
    app.get("/quran/arabic/:surah", async function (req, res) {
        const { surah } = req.params;

        const remoteUrl = `https://api.alquran.cloud/v1/surah/${surah}`
        try {
            const { data } = await axios.get(remoteUrl, {
                timeout: 8000,
                validateStatus: () => true
            })
            const ayahs =  data.data.ayahs.map(ayah => ayah.text);
            res.json({
              name: data.data.englishName,
              ayahs: ayahs
            });
        } catch (err) {
            if (err.response) {
              return res.status(err.response.status).json({
                error: `Upstream error ${err.response.status}`,
                source: remoteUrl,
              });
            }
            // Timeout or network problem
            res.status(502).json({
              error: "Bad Gateway: failed to fetch upstream",
              details: err.message,
              source: remoteUrl,
            });
          }

    })
}