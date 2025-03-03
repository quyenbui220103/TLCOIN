
    function initMakeTest() {
        const tests = [
            { id: 1, name: "Bài kiểm tra 1" },
            { id: 2, name: "Bài kiểm tra 2" },
            { id: 3, name: "Bài kiểm tra 3" },
            { id: 4, name: "Bài kiểm tra 4" },
            { id: 5, name: "Bài kiểm tra 5" },
            { id: 6, name: "Bài kiểm tra 6" },
            { id: 7, name: "Bài kiểm tra 7" },
            { id: 8, name: "Bài kiểm tra 8" }
        ];

        function renderTests(tests) {
            const testList = document.getElementById("testList");
            if (!testList) return;
            testList.innerHTML = "";
            tests.forEach(test => {
                testList.innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="test-card text-center">
                            <div class="test-header"></div>
                            <div class="test-body">
                                <h5>${test.name}</h5>
                                <button class="btn btn-dark mt-2" onclick="startTest(${test.id})">Làm ngay</button>
                            </div>
                        </div>
                    </div>`;
            });
        }

        renderTests(tests);

        window.searchTests = function () {
            const query = document.getElementById("searchInput").value.toLowerCase();
            const filteredTests = tests.filter(test => test.name.toLowerCase().includes(query));
            renderTests(filteredTests);
        };

        window.startTest = function (id) {
            alert(`Bắt đầu bài kiểm tra ${id}`);
            loadContent(`quiz.html?id=${id}`);
        };
    }
// const DOMContentLoaded = document.getElementById("content");
    document.addEventListener("DOMContentLoaded", function () {
        const tests = [
            { id: 1, name: "Bài kiểm tra 1" },
            { id: 2, name: "Bài kiểm tra 2" },
            { id: 3, name: "Bài kiểm tra 3" },
            { id: 4, name: "Bài kiểm tra 4" },
            { id: 5, name: "Bài kiểm tra 5" },
            { id: 6, name: "Bài kiểm tra 6" },
            { id: 7, name: "Bài kiểm tra 7" },
            { id: 8, name: "Bài kiểm tra 8" }
        ];

        function renderTests(tests) {
            const testList = document.getElementById("testList");
            testList.innerHTML = "";
            tests.forEach(test => {
                testList.innerHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="test-card text-center">
                            <div class="test-header"></div>
                            <div class="test-body">
                                <h5>${test.name}</h5>
                                <button class="btn btn-dark mt-2" onclick="startTest(${test.id})">Làm ngay</button>
                            </div>
                        </div>
                    </div>`;
            });
        }
        
        renderTests(tests);

        window.searchTests = function () {
            const query = document.getElementById("searchInput").value.toLowerCase();
            const filteredTests = tests.filter(test => test.name.toLowerCase().includes(query));
            renderTests(filteredTests);
        };

        window.startTest = function (id) {
            alert(`Bắt đầu bài kiểm tra ${id}`);
            window.location.href = `quiz.html?id=${id}`;
        };
    });
    