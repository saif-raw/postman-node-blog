const express = require("express");
const fs = require("fs");
const path = require("path");


const app = express();


app.use(express.json());

const PORT = 3000;
const USERS = path.join(__dirname, "data", "blogs.json");
const blogData = JSON.parse(fs.readFileSync(USERS, "utf-8"));




    app.get("/blogs", (req, res) => {
        if (req.query) {
            let data = blogData.filter((blog) => {
                return Object.keys(req.query).every((key) => {
                    return (
                        blog[key].trim().replace(/[#-\s]/g, "").toLowerCase() === req.query[key].trim().replace(/[#-\s]/g, "").toLowerCase()
                    );
                });
            });
            if (data < 1) {
                res.status(404).json({
                    status: "Blog does not exist",
                });
            } else {
                res.status(200).json({
                    status: "Success",
                    data,
                });

            }
        } else {
            res.status(200).json(blogData);
        }
    });


app.get("/blogs/:id", (req, res) => {
    let blog = blogData.find((blog) => {
        return blog.id === req.params.id;
    });

    if (blog) {
        res.status(200).json({
            status: "Success",
            data: blog,
        });
    } else {
        res.status(200).json({
            status: "Blog does not exist",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is on PORT : ${PORT}`);
});