// ARRAY TO STORE STORIES
let stories = [
    {
        title: "AI Changing Education",
        category: "Technology",
        journalist: "Abhay",
        priority: "High",
        status: "Pending",
        summary: "How AI is changing the education system.",
        comment: ""
    },
    {
        title: "University Sports Festival",
        category: "Sports",
        journalist: "Kishore",
        priority: "Medium",
        status: "Approved",
        summary: "Updates about the university sports festival.",
        comment: ""
    },
    {
        title: "New Education Policy",
        category: "Education",
        journalist: "Aditi",
        priority: "Low",
        status: "Published",
        summary: "Important information about the new education policy.",
        comment: ""
    }
];

// SELECT HTML ELEMENTS
const form = document.getElementById("storyForm");
const table = document.getElementById("storyTable");

// DISPLAY ALL STORIES
function displayStories() {

    table.innerHTML = "";

    for (let i = 0; i < stories.length; i++) {

        let story = stories[i];

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${story.title}</td>

            <td>${story.category}</td>

            <td>
                <select class="journalist-select">
                    <option ${story.journalist === "Abhay" ? "selected" : ""}>Abhay</option>
                    <option ${story.journalist === "Kishore" ? "selected" : ""}>Kishore</option>
                    <option ${story.journalist === "Parvat" ? "selected" : ""}>Parvat</option>
                    <option ${story.journalist === "Aditi" ? "selected" : ""}>Aditi</option>
                </select>
            </td>

            <td>
                <select class="priority-select">
                    <option ${story.priority === "High" ? "selected" : ""}>High</option>
                    <option ${story.priority === "Medium" ? "selected" : ""}>Medium</option>
                    <option ${story.priority === "Low" ? "selected" : ""}>Low</option>
                </select>
            </td>

            <td>
                <span class="status ${story.status}">
                    ${story.status}
                </span>
            </td>

            <td>
                <input type="text" class="comment-input"
                placeholder="Add comment" value="${story.comment}">

                <button class="action-button comment-button">
                    Add
                </button>
            </td>

            <td>
                <button class="action-button approve-button">
                    Approve
                </button>

                <button class="action-button publish-button">
                    Publish
                </button>

                ${story.status === "Published" ?
                    `<button class="action-button view-button">View</button>`
                    : ""
                }

                <button class="action-button delete-button">
                    Delete
                </button>
            </td>
        `;

        // CHANGE JOURNALIST
        let journalistSelect = row.querySelector(".journalist-select");

        journalistSelect.addEventListener("change", function() {
            stories[i].journalist = this.value;
        });

        // CHANGE PRIORITY
        let prioritySelect = row.querySelector(".priority-select");

        prioritySelect.addEventListener("change", function() {
            stories[i].priority = this.value;
        });

        // ADD COMMENT
        let commentInput = row.querySelector(".comment-input");
        let commentButton = row.querySelector(".comment-button");

        commentButton.addEventListener("click", function() {

            stories[i].comment = commentInput.value;

            alert("Comment added successfully!");

            displayStories();
        });

        // APPROVE STORY
        let approveButton = row.querySelector(".approve-button");

        approveButton.addEventListener("click", function() {

            if (stories[i].status === "Published") {
                alert("This story is already published!");
            }
            else {
                stories[i].status = "Approved";

                alert("Story approved successfully!");

                displayStories();
            }
        });

        // PUBLISH STORY
        let publishButton = row.querySelector(".publish-button");

        publishButton.addEventListener("click", function() {

            if (stories[i].status === "Approved") {

                stories[i].status = "Published";

                alert("Story published successfully!");

                displayStories();
            }
            else {
                alert("First approve the story!");
            }
        });

        // VIEW PUBLISHED STORY
        let viewButton = row.querySelector(".view-button");

        if (viewButton) {

            viewButton.addEventListener("click", function() {

                alert(
                    "STORY DETAILS\n\n" +
                    "Title: " + stories[i].title + "\n" +
                    "Category: " + stories[i].category + "\n" +
                    "Journalist: " + stories[i].journalist + "\n" +
                    "Priority: " + stories[i].priority + "\n" +
                    "Description: " + stories[i].summary + "\n" +
                    "Comment: " + stories[i].comment
                );

            });
        }

        // DELETE STORY
        let deleteButton = row.querySelector(".delete-button");

        deleteButton.addEventListener("click", function() {

            let confirmDelete = confirm("Do you want to delete this story?");

            if (confirmDelete) {

                stories.splice(i, 1);

                alert("Story deleted successfully!");

                displayStories();
            }
        });

        table.appendChild(row);
    }

    updateDashboard();
}

// SUBMIT NEW STORY
form.addEventListener("submit", function(event) {

    event.preventDefault();

    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let journalist = document.getElementById("journalist").value;
    let priority = document.getElementById("priority").value;
    let summary = document.getElementById("summary").value;

    let newStory = {
        title: title,
        category: category,
        journalist: journalist,
        priority: priority,
        status: "Pending",
        summary: summary,
        comment: ""
    };

    stories.push(newStory);

    alert("New story submitted successfully!");

    form.reset();

    displayStories();
});

// UPDATE DASHBOARD COUNTERS
function updateDashboard() {

    document.getElementById("totalStories").innerText = stories.length;

    document.getElementById("pendingStories").innerText =
        stories.filter(story => story.status === "Pending").length;

    document.getElementById("approvedStories").innerText =
        stories.filter(story => story.status === "Approved").length;

    document.getElementById("publishedStories").innerText =
        stories.filter(story => story.status === "Published").length;
}

// INITIAL DISPLAY
displayStories();