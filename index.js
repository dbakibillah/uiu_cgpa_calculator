const coursesContainer = document.getElementById("courses");

// Reset Button
document.getElementById("btn-reset").addEventListener("click", () => {
    window.location.reload();
});

// Add More Button
document.getElementById("btn-add-more").addEventListener("click", () => {
    addCourseRow();
});

// Retake Button
// Function to add a new row for retake courses
function addRetakeRow() {
    const coursesContainer = document.getElementById("retakes");

    // Create a new row for the retake
    const newRow = document.createElement("div");
    newRow.className = "grid grid-cols-3 gap-5 p-2 px-5 relative";

    // Define the structure of the new retake course row
    newRow.innerHTML = `
        <div class="absolute -top-1 left-2 btn btn-ghost btn-circle btn-sm p-0">
            <i class="fa-solid fa-xmark bg-[#f68b1f] w-6 h-6 flex items-center justify-center text-white rounded-full"></i>
        </div>

        <!-- Select for Credits -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>Credits</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <!-- Select for Previous Grade -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>Previous Grade</option>
            <option value="4.00">A (4.00)</option>
            <option value="3.67">A- (3.67)</option>
            <option value="3.33">B+ (3.33)</option>
            <option value="3.00">B (3.00)</option>
            <option value="2.67">B- (2.67)</option>
            <option value="2.33">C+ (2.33)</option>
            <option value="2.00">C (2.00)</option>
            <option value="1.67">C- (1.67)</option>
            <option value="1.33">D+ (1.33)</option>
            <option value="1.00">D (1.00)</option>
            <option value="0.00">F (0.00)</option>
        </select>

        <!-- Select for New Grade -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>New Grade</option>
            <option value="4.00">A (4.00)</option>
            <option value="3.67">A- (3.67)</option>
            <option value="3.33">B+ (3.33)</option>
            <option value="3.00">B (3.00)</option>
            <option value="2.67">B- (2.67)</option>
            <option value="2.33">C+ (2.33)</option>
            <option value="2.00">C (2.00)</option>
            <option value="1.67">C- (1.67)</option>
            <option value="1.33">D+ (1.33)</option>
            <option value="1.00">D (1.00)</option>
            <option value="0.00">F (0.00)</option>
        </select>
    `;

    // Append the new row to the courses container
    coursesContainer.appendChild(newRow);

    // Add functionality to remove this row
    newRow.querySelector('.fa-xmark').addEventListener('click', () => {
        newRow.remove();
    });
}

// Add event listener for the retake button
document.getElementById("btn-retake").addEventListener("click", addRetakeRow);

// Function to add a new course row
// Function to add a new course row
function addCourseRow() {
    const currentCourseCount = document.querySelectorAll(".course-number").length + 1; // Calculate current course count

    const newCourse = document.createElement("div");
    newCourse.classList.add("grid", "grid-cols-3", "gap-5", "p-2", "px-5", "relative");
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
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <!-- Select for Grade -->
        <select class="select select-bordered h-12 w-full text-[#f68b1f] border-[#f68b1f] focus:border-[#f68b1f] appearance-none hover:bg-[#fffae5]">
            <option disabled selected>Grade</option>
            <option value="4.00">A (4.00)</option>
            <option value="3.67">A- (3.67)</option>
            <option value="3.33">B+ (3.33)</option>
            <option value="3.00">B (3.00)</option>
            <option value="2.67">B- (2.67)</option>
            <option value="2.33">C+ (2.33)</option>
            <option value="2.00">C (2.00)</option>
            <option value="1.67">C- (1.67)</option>
            <option value="1.33">D+ (1.33)</option>
            <option value="1.00">D (1.00)</option>
            <option value="0.00">F (0.00)</option>
        </select>
    `;

    // Append the new course to the course list
    document.getElementById('courses').appendChild(newCourse);

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

    // Check if the inputs are valid
    if (cgpaInput > 4.0 || cgpaInput < 0.0) {
        alert("CGPA should be between 0.0 and 4.0");
        return;
    }

    // Call the function to perform the CGPA calculation
    calculateCGPA(completedCredits, currentCGPA);
});

// Function to calculate CGPA
function calculateCGPA(completedCredits, currentCGPA) {
    let totalCredits = completedCredits;
    let totalGradePoints = completedCredits * currentCGPA;

    let gpaCredits = 0;
    let gpaGrades = 0;

    const courses = document.querySelectorAll("#courses .grid");
    const retakes = document.querySelectorAll("#retakes .grid");

    courses.forEach(course => {
        const creditSelect = parseFloat(course.querySelector("select").value);
        const gradeSelect = parseFloat(course.querySelectorAll("select")[1].value);

        if (!isNaN(creditSelect) && !isNaN(gradeSelect)) {
            totalCredits += creditSelect;
            totalGradePoints += creditSelect * gradeSelect;

            gpaCredits += creditSelect;
            gpaGrades += gradeSelect * creditSelect;
        }
    });

    let retakedCredits = 0;
    retakes.forEach(retake => {
        const retakeCredit = parseFloat(retake.querySelector("select").value); // Retake course credit
        const oldGradeSelect = parseFloat(retake.querySelectorAll("select")[1].value); // Old GPA (previous grade)
        const newGradeSelect = parseFloat(retake.querySelectorAll("select")[2].value); // New GPA (new grade)

        if (!isNaN(retakeCredit) && !isNaN(oldGradeSelect) && !isNaN(newGradeSelect)) {
            const retakeContribution = retakeCredit * (newGradeSelect - oldGradeSelect);
            totalGradePoints += retakeContribution;

            retakedCredits += retakeCredit;
            gpaCredits += retakeCredit;
            gpaGrades += newGradeSelect * retakeCredit;
        }
    });

    let newCGPA = totalGradePoints / totalCredits;
    let newGPA = gpaGrades / gpaCredits;

    showModal(newCGPA, totalCredits + retakedCredits - completedCredits, newGPA, totalCredits);
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
