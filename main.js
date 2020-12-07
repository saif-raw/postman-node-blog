const express = require("express");
const fs = require("fs");
const path = require("path");

// instantiating the express
const app = express();

// middleware
app.use(express.json());

const PORT = 3000;
const USERS = path.join(__dirname, "data", "blogs.json");
const blogData = JSON.parse(fs.readFileSync(USERS, "utf-8"));

// get all the blogs
app.get("/blogs", (req, res) => {
    let data = blogData.filter((blog) => {
        return Object.keys(req.query).every((key) => {
            return blog[key] == req.query[key];
        });
    });

    res.status(200).json({
        status: "Successful",
        data,
    });

    res.status(200).json(blogData);
});

// get the blogs passed with the id
app.get("/blogs/:id", (req, res) => {
    let blog = blogData.find((blog) => {
        return blog.id === req.params.id;
    });

    if (blog) {
        res.status(200).json({
            status: "Successful",
            data: blog,
        });
    } else {
        res.status(200).json({
            status: "Blog not found",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT : ${PORT}`);
});