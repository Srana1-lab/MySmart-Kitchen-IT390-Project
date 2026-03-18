const GEMINI_API_KEY = "AIzaSyALPOaUcbUhYOrKVHpHy-eQc8pSi8b_Q0U";

// The Gemini API endpoint we send requests to
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function generateRecipes() {

    // Check that user actually added ingredients before calling API
    if (ingredients.length === 0) {
        alert("Please add at least one ingredient first.");
        return;
    }
    
    // Show a loading message while waiting for Gemini to respond
    document.getElementById("results-area").innerHTML = "Generating recipes...";

	// Connection of filtering line
	const cuisineText = activeFilters.cuisine ? `Cuisine type: ${activeFilters.cuisine}.` : '';
	const dietText = activeFilters.diet.length > 0 ? `Dietary restrictions: ${activeFilters.diet.join(", ")}.` : '';

    //Sends isntructions to gemini and sends 3 recipe/ dish options to give the user options rather than being locked into one result
    //Also connects the filter section line 3-4
    const prompt = `
        You are a professional recipe developer and culinary expert pulling from credible sources.
		Your task is to generate 3 beginner-friendly recipes using these ingredients: ${ingredients.join(", ")}.
		${activeFilters.cuisine ? `Only generate recipes that are ${activeFilters.cuisine} cuisine.` : ''}
		${activeFilters.diet.length > 0 ? `All recipes must strictly follow these dietary restrictions: ${activeFilters.diet.join(", ")}.` : ''}
		Prioritize the provided ingredients and minimize additional ones.
		For each recipe provide:
		- Recipe Name
		- Cuisine Type
        - Short Description (2-3 sentences)
        - Estimated Time (Prep + Cook)
        - Difficulty Level (Easy / Medium / Hard)
        - Ingredients (with measurements)
        - Step-by-Step Instructions (numbered)
        - Nutritional Estimate (Calories, Protein, Carbs, Fat)
        - Storage intructions
		Keep tone clear, encouraging, and practical.
        Avoid long introductions or unnecessary background.
        Use clean and organized, spacing between sections.
        `;

        try {
            // Sending the prompt using fetch() to Gemini's API
            const response = await fetch(GEMINI_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                       parts: [{ text: prompt }]
                    }]
                })
            });
			// Parse the response Gemini sends back
            const data = await response.json();
            
			// Extract the actual text from Gemini's response structure
            const recipeText = data.candidates[0].content.parts[0].text;
            
               // Display the results on the page
        displayResults(recipeText);
        
    // If something goes wrong like no internet or a bad key.
    } catch (error) {
        document.getElementById("results-area").innerHTML = "Something went wrong. Please try again.";
        console.error(error);
    }
}

function displayResults(recipeText) {
    const resultsArea = document.getElementById("results-area");
    // Replaces newlines with <br> so the recipe text is readable on the page
    resultsArea.innerHTML = recipeText.replace(/\n/g, "<br>");
}
