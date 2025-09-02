const axios = require("axios");

module.exports.initializeRoutes = (app) => {

    // Get arabic surah
    app.get("/quran/arabic/:surah", async function (req, res) {
        const { surah } = req.params;

        const remoteUrl = `https://api.alquran.cloud/v1/surah/${surah}`
        try {
            const { data } = await axios.get(remoteUrl, {timeout: 8000})
            const verses =  data.data.ayahs.map((ayah) => ayah.text);
            res.json({
              name: data.data.englishName,
              verses: verses
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

    // Get quran translation
    app.get("/quran/indonesian/:surah", async function (req, res){
      const { surah } = req.params;
      
      const remoteUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ind-indonesianislam/${surah}.json`;

      try {
        const { data } = await axios.get(remoteUrl, {timeout: 8000,})
        
        const translations = data.chapter.map((translation) => translation.text);
        res.json(translations)
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