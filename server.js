const express = require("express"),
  app = express(),
  path = require("path"),
  axios = require("axios"),
  cheerio = require("cheerio"),
  PORT = process.env.PORT || 3001;

const responseData = async () => {
  const axiosObj = await axios.get("http://finance.yahoo.com/cryptocurrencies");
  const cheerioObj = cheerio.load(axiosObj.data);
  //console.log(cheerioObj)
  //console.log(cheerioObj("body").html());
};
responseData();

const fetchData = async (url) => {
  let result = await axios.get(url);
  return cheerio.load(result.data);
};
// express middleware
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// app.get("/config", (req,res)=>{
// res.json({
//     msg:"server running"
// })
// })
app.get("/api", async (req, res) => {
    const data = [];
    const cd = await fetchData("https://finance.yahoo.com/cryptocurrencies");
    cd("body").find("#scr-res-table > div > table > tbody > tr > td").each((i, elem) => {
      const stockInfo = cd(elem).text();
      data.push(stockInfo);
    })
    const joined = data.join(" ").split("  ");
    const filtered = joined.filter(d => {
        if(d !=='' && d !== undefined && d.trim().split(" ")[0] !== "BAT-USD" && d !== null) {
            return d;
        }
    })
   const cleaned = filtered.map(d => {
       return {
           abbr: d.trim().split(" ")[0],
           name: d.trim().split(" ")[1],
           cost: d.trim().split(" ")[3] === "USD" || d.trim().split(" ")[3] === "Token" ? d.trim().split(" ")[4] : d.trim().split(" ")[3],
           change: d.trim().split(" ")[4].charAt(0) === "+" || d.trim().split(" ")[4].charAt(0) === "-" ? d.trim().split(" ")[4] : d.trim().split(" ")[5],
           per_change: d.trim().split(" ")[5].charAt(d.trim().split(" ")[5].length - 1) === "%" ? d.trim().split(" ")[5] : d.trim().split(" ")[6],
           cap: d.trim().split(" ")[6].charAt(d.trim().split(" ")[6].length - 1) === "%" ? d.trim().split(" ")[7] : d.trim().split(" ")[6],
       }
   })
  res.json({
      data, 
      joined,
      filtered,
      cleaned
  })
  })
  // a route to check if server is still up
app.get("/config", (req, res) => {
    res.json({
      status: "Server up"
    });
})
    // route to show html page
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"));
//   })

app.listen(PORT, () =>{
    console.log(`Server Up http://localhost:${PORT}`)
})
