const questions = [
    { 
        question: "Which of the following is the strongest password?", 
        options: ["123456", "password", "Admin2023!", "G5@kLp!9zXwQ#"], 
        correct: 3 
    },
    { 
        question: "What should you do if you receive an email asking for your banking details?", 
        options: ["Reply with details", "Click the link and login", "Ignore it", "Report it as phishing"], 
        correct: 3 
    },
    { 
        question: "What is social engineering?", 
        options: ["A coding technique", "A cyber attack that manipulates people", "A firewall system", "An encryption method"], 
        correct: 1 
    },
    { 
        question: "Which of these is a sign of a phishing email?", 
        options: ["Generic greeting", "Urgent action required", "Suspicious link", "All of the above"], 
        correct: 3 
    },
    { 
        question: "Public Wi-Fi is safe for online banking.", 
        options: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "Which encryption method is considered strong?", 
        options: ["Caesar Cipher", "MD5", "AES", "ROT13"], 
        correct: 2 
    },
    { 
        question: "What should you do if someone calls pretending to be from IT and asks for your login?", 
        options: ["Give it to them", "Verify their identity", "Ignore them", "Hang up"], 
        correct: 1 
    },
    { 
        question: "What does 'HTTPS' mean?", 
        options: ["High Tech Protocol System", "HyperText Transfer Protocol Secure", "Hacker Tracking Protection Service", "Hyper Transfer Proxy System"], 
        correct: 1 
    },
    { 
        question: "What is a common form of multi-factor authentication?", 
        options: ["Username and password", "Security questions only", "A one-time code sent to your phone", "None of the above"], 
        correct: 2 
    },
    { 
        question: "Which is a strong passphrase?", 
        options: ["dog123", "letmein", "BlueTiger$Jump99", "qwerty"], 
        correct: 2 
    },
    { 
        question: "Cybercriminals only target big companies.", 
        options: ["True", "False"], 
        correct: 1 
    },
    { 
        question: "Which attack involves locking users out of their files and demanding payment?", 
        options: ["Phishing", "Ransomware", "Trojan Horse", "Spyware"], 
        correct: 1 
    },
    { 
        question: "What is the best way to protect against malware?", 
        options: ["Don't install any software", "Use strong passwords", "Keep software updated and use antivirus", "Click on pop-ups to close them"], 
        correct: 2 
    },
    { 
        question: "What does a firewall do?", 
        options: ["Blocks unauthorized access", "Detects viruses", "Speeds up the internet", "Deletes files"], 
        correct: 0 
    },
    { 
        question: "What is an example of two-factor authentication?", 
        options: ["Typing a password twice", "Using your fingerprint and a password", "Logging in from two devices", "None of the above"], 
        correct: 1 
    },
    { 
        question: "Which is NOT a safe browsing habit?", 
        options: ["Using HTTPS websites", "Clicking on unknown links", "Keeping software updated", "Using a password manager"], 
        correct: 1 
    },
    { 
        question: "What does a VPN do?", 
        options: ["Makes you anonymous online", "Blocks ads", "Cleans your computer", "Deletes viruses"], 
        correct: 0 
    },
    { 
        question: "What is a common method hackers use to steal passwords?", 
        options: ["Phishing", "Guessing", "Keylogging", "All of the above"], 
        correct: 3 
    },
    { 
        question: "If your computer suddenly slows down, what might be the cause?", 
        options: ["Too many browser tabs", "A virus", "Old hardware", "All of the above"], 
        correct: 3 
    },
    { 
        question: "What should you do if your account is hacked?", 
        options: ["Ignore it", "Change your password immediately", "Tell no one", "Create a new account"], 
        correct: 1 
    }
];

let currentQuestion = 0;
let score = 0;
let userName = prompt("Enter your name:");

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    
    let optionsHTML = "";
    q.options.forEach((option, index) => {
        optionsHTML += `<button onclick="checkAnswer(${index})">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

function endGame() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("your-score").innerText = score;

    fetch("save_score.php", {
        method: "POST",
        body: JSON.stringify({ name: userName, score: score }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        let leaderboardHTML = "";
        data.topThree.forEach((entry, index) => {
            leaderboardHTML += `<p>${index + 1}. ${entry.name} - ${entry.score} points</p>`;
        });
        document.getElementById("top-three").innerHTML = leaderboardHTML;
    });
}

loadQuestion();
