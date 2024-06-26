# Chrome Web Extension: Text Summarizer

# Overview

This project is a Chrome web extension that allows users to highlight text on any webpage and generate a concise summary using the OpenAI API. The extension provides an easy and efficient way to get the gist of long articles or complex information with a single click.

# Features

Text Highlighting: Users can select any portion of text on a webpage.
Summarization: The selected text is summarized into approximately 150 words using the OpenAI API.
User-Friendly Interface: Simple and intuitive design for seamless interaction.

# Installation

1. Clone or download the repository.
2. Open Chrome and navigate to chrome://extensions/.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the project folder.
5. The extension icon will appear in your Chrome toolbar.
6. Ensure notfication permissions are allowed in both the google chrome browser and allowed on your personal device. Otherwise the summaries will not be visible.

# Usage

Navigate to any webpage and highlight the text you want to summarize.
Right-Click on the mouse to bring up a list of options.
Click 'Summarize' and a google chrome notification will appear with a summary of the highlighted text.
If the summary is too long, there is an option within the notification to 'Show full message', 
selecting that will cause a new window to open with the complete summary.

# Configuration

Sign up for an OpenAI API key if you don’t have one.
In the project folder, locate the background.js file and add your API key.
const OPEN_AI_API_KEY = 'your-api-key-here';
