const express = require("express");
const app = express();

const PORT = 3000;

// Store student data in memory
let students = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

/*
Function to validate student input.
Returns true if both fields contain values.
*/

function validateStudent(name, course) {

    if (!name || !course) {
        return false;
    }

    return (
        String(name).trim() !== "" &&
        String(course).trim() !== ""
    );
}

/*
Home page route.
Displays registration form.
*/
app.get("/", (req, res) => {
    res.render("index");
});

/*
Handles form submission.
Adds multiple students if valid.
*/
app.post("/register", (req, res) => {

    const names = req.body.name;
    const courses = req.body.course;

    // Handle multiple students
    if (Array.isArray(names)) {

        for (let i = 0; i < names.length; i++) {

            if (validateStudent(names[i], courses[i])) {

                students.push({
                    name: names[i],
                    course: courses[i]
                });
            }
        }

    } else {

        // Handle single student
        if (validateStudent(names, courses)) {

            students.push({
                name: names,
                course: courses
            });
        }
    }

    res.redirect("/students");
});

/*
Displays all registered students.
*/
app.get("/students", (req, res) => {
    res.render("students", { students });
});

/*
About page route.
*/
app.get("/about", (req, res) => {
    res.render("about");
});

/*
Starts the local server.
*/
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});