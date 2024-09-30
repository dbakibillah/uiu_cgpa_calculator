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
    const currentCourseCount = document.querySelectorAll('.course-number').length + 1; // Calculate current course count

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
    newCourse.querySelector('.delete-item').addEventListener('click', () => {
        newCourse.remove();
        renumberCourses();  // Recalculate course numbers after deletion
    });
}

// Function to renumber the courses
function renumberCourses() {
    const courseNumbers = document.querySelectorAll('.course-number');
    courseNumbers.forEach((element, index) => {
        element.textContent = index + 1;  // Recalculate based on the current order
    });
}
