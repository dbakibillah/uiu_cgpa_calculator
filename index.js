const coursesContainer = document.getElementById("courses");

// reset button
document.getElementById("btn-reset").addEventListener("click", () => {
    window.location.reload();
});

// Add More Button
document.getElementById("btn-add-more").addEventListener("click", () => {
    addCourseRow();
});

// Function to add a new course row
function addCourseRow() {
    const currentCourseCount =
        document.querySelectorAll(".course-number").length + 1; // Calculate current course count

    const newCourse = document.createElement("div");
    newCourse.classList.add(
        "grid",
        "grid-cols-3",
        "gap-5",
        "p-2",
        "px-5",
        "relative"
    );
    newCourse.innerHTML = `
        <!-- Course Number -->
        <h2 class="text-lg flex items-center justify-center p-3 border border-[#f68b1f] rounded-md text-[#f68b1f] bg-[#fffae5] h-12 w-full">
            <span class="course-number">${currentCourseCount}</span>
        </h2>

        <div class="absolute -top-1 left-2 btn btn-ghost btn-circle btn-sm p-0 delete-item">
            <i class="fa-solid fa-xmark bg-[#f68b1f] w-6 h-6 flex items-center justify-center text-white rounded-full"></i>
        </div>

        <!-- Select for Credits -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>Credits</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>

        <!-- Select for Grade -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>Grade</option>
            <option>A (4.00)</option>
            <option>A- (3.67)</option>
            <option>B+ (3.33)</option>
            <option>B (3.00)</option>
            <option>B- (2.67)</option>
            <option>C+ (2.33)</option>
            <option>C (2.00)</option>
            <option>C- (1.67)</option>
            <option>D+ (1.33)</option>
            <option>D (1.00)</option>
            <option>F (0.00)</option>
        </select>
    `;

    // Append the new course to the course list
    coursesContainer.appendChild(newCourse);

    // Event listener for delete button in the new course
    newCourse.querySelector(".delete-item").addEventListener("click", () => {
        newCourse.remove();
        renumberCourses(); // Recalculate course numbers after deletion
    });
}

// Function to renumber the courses
function renumberCourses() {
    const courseNumbers = document.querySelectorAll(".course-number");
    courseNumbers.forEach((element, index) => {
        element.textContent = index + 1; // Recalculate based on the current order
    });
}

// Calculate button event listener
document.getElementById("btn-calculate").addEventListener("click", () => {
    const creditsInput = document.getElementById("input-credits").value;
    const cgpaInput = document.getElementById("input-cgpa").value;
    const completedCredits = parseFloat(creditsInput);
    const currentCGPA = parseFloat(cgpaInput);

    // Check if the inputs are empty
    if (isNaN(completedCredits) || isNaN(currentCGPA)) {
        alert("Please fill in both the completed credits and current CGPA fields.");
        return; // Exit the function if inputs are invalid
    }

    // Call the function to perform the CGPA calculation
    calculateCGPA(completedCredits, currentCGPA);
});

// Function to calculate CGPA
function calculateCGPA(completedCredits, currentCGPA) {
    let totalCredits = 0;
    let totalGradePoints = 0;

    const courses = document.querySelectorAll("#courses .grid");

    // Loop through all the courses
    courses.forEach((course) => {
        const creditSelect = course.querySelector("select").value;
        const gradeSelect = course.querySelectorAll("select")[1].value;

        // Check if the credit or grade is not selected
        if (creditSelect === "Credits" || gradeSelect === "Grade") {
            alert("Please select both credits and grade for all courses.");
            return;
        }

        const credit = parseFloat(creditSelect);
        const grade = gradeToPoints(gradeSelect); // Convert grade to points

        totalCredits += credit;
        totalGradePoints += credit * grade;
    });

    // Check if totalCredits is zero to avoid NaN
    if (totalCredits === 0) {
        alert("No valid course credits selected. Please add courses.");
        return; // Exit the function if no courses are added
    }

    // Calculate CGPA
    const gpa = totalGradePoints / totalCredits;

    // Calculate new CGPA if current CGPA and completed credits are provided
    if (!isNaN(completedCredits) && !isNaN(currentCGPA) && completedCredits > 0) {
        const totalCompletedCredits = completedCredits + totalCredits;
        const newCGPA =
            (completedCredits * currentCGPA + gpa * totalCredits) /
            totalCompletedCredits;
        showModal(newCGPA, totalCredits, gpa, totalCompletedCredits);
    } else {
        showModal(gpa, totalCredits, gpa, totalCredits);
    }
}

// Function to convert grade to grade points
function gradeToPoints(grade) {
    switch (grade) {
        case "A (4.00)":
            return 4.0;
        case "A- (3.67)":
            return 3.67;
        case "B+ (3.33)":
            return 3.33;
        case "B (3.00)":
            return 3.0;
        case "B- (2.67)":
            return 2.67;
        case "C+ (2.33)":
            return 2.33;
        case "C (2.00)":
            return 2.0;
        case "C- (1.67)":
            return 1.67;
        case "D+ (1.33)":
            return 1.33;
        case "D (1.00)":
            return 1.0;
        case "F (0.00)":
            return 0.0;
        default:
            return 0;
    }
}

// Function to show the calculated CGPA and GPA in the modal
function showModal(cgpa, credits, gpa, totalCredits) {
    document.querySelector(
        "#my_modal_1 .modal-box h3"
    ).textContent = `Your CGPA is ${cgpa.toFixed(2)}`;
    document.querySelector(
        "#my_modal_1 .modal-box p:nth-child(2) span"
    ).textContent = totalCredits.toFixed(2);
    document.querySelector(
        "#my_modal_1 .modal-box p:nth-child(3) span"
    ).textContent = credits.toFixed(2);
    document.querySelector(
        "#my_modal_1 .modal-box p:nth-child(4) span"
    ).textContent = gpa.toFixed(2);
    document.querySelector(
        "#my_modal_1 .modal-box p:nth-child(5) span"
    ).textContent = cgpa.toFixed(2);

    // Show the modal
    my_modal_1.showModal();
}


// history update section here