// Define the global API key constant
const OPEN_AI_API_KEY = "YOUR OPENAI API KEY HERE";

// Create the context menu item
chrome.contextMenus.create({
    id: "summarizeText",
    title: 'Summarize',
    contexts: ['selection']
});

// Add listener for the context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "summarizeText") {
        summarizeSelection(info, tab);
    }
});

// Function to summarize the selected text
function summarizeSelection(info, tab) {
    let selectedText = info.selectionText.trim();

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant."
                },
                {
                    role: "user",
                    content: "Briefly summarize the following text: " + selectedText
                }
            ],
            max_tokens: 150,
            temperature: 0.35,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.choices && data.choices.length > 0) {
            const summaryText = data.choices[0].message.content;
            
            // Display notification with summary text
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'RobotIcon.png',
                title: 'Summary Of Highlighted Text',
                message: summaryText,
                buttons: [{ title: 'View Full Message' }]
            }, (notificationId) => {
                if (chrome.runtime.lastError) {
                    console.error('Notification creation failed:', chrome.runtime.lastError.message);
                } else {
                    console.log("Notification created with ID: ", notificationId)
                }
            });
            chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
                if (buttonIndex === 0) {
                    console.log("View Full Message Button Clicked");
            
                    chrome.windows.create({
                        url: `popup.html?summary=${encodeURIComponent(summaryText)}`,
                        type: 'popup',
                        width: 400,
                        height: 300
                    })
                }
            });

        } else {
            throw new Error('Invalid response format from API');
        }
    })
    .catch(error => {
        console.error('Error fetching or parsing data:', error.message);
        // Handle specific errors here, e.g., show an error message to the user or retry the request
    });
}
