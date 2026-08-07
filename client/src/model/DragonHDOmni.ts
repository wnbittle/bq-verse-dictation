// https://learn.microsoft.com/en-us/azure/ai-services/speech-service/high-definition-voices#supported-styles-for-dragon-hd-omni
export const DragonHDOmniStyles = [
  { name: "Amazed", value: "amazed" },
  { name: "Amused", value: "amused" },
  { name: "Angry", value: "angry" },
  { name: "Annoyed", value: "annoyed" },
  { name: "Anxious", value: "anxious" },
  { name: "Appreciative", value: "appreciative" },
  { name: "Calm", value: "calm" },
  { name: "Cautious", value: "cautious" },
  { name: "Concerned", value: "concerned" },
  { name: "Confident", value: "confident" },
  { name: "Confused", value: "confused" },
  { name: "Curious", value: "curious" },
  { name: "Defeated", value: "defeated" },
  { name: "Defensive", value: "defensive" },
  { name: "Defiant", value: "defiant" },
  { name: "Determined", value: "determined" },
  { name: "Disappointed", value: "disappointed" },
  { name: "Disgusted", value: "disgusted" },
  { name: "Doubtful", value: "doubtful" },
  { name: "Ecstatic", value: "ecstatic" },
  { name: "Encouraging", value: "encouraging" },
  { name: "Excited", value: "excited" },
  { name: "Fast", value: "fast" },
  { name: "Fearful", value: "fearful" },
  { name: "Frustrated", value: "frustrated" },
  { name: "General", value: "general" },
  { name: "Happy", value: "happy" },
  { name: "Hesitant", value: "hesitant" },
  { name: "Hurt", value: "hurt" },
  { name: "Impatient", value: "impatient" },
  { name: "Impressed", value: "impressed" },
  { name: "Intrigued", value: "intrigued" },
  { name: "Joking", value: "joking" },
  { name: "Laughing", value: "laughing" },
  { name: "Optimistic", value: "optimistic" },
  { name: "Painful", value: "painful" },
  { name: "Panicked", value: "panicked" },
  { name: "Panting", value: "panting" },
  { name: "Pleading", value: "pleading" },
  { name: "Proud", value: "proud" },
  { name: "Quiet", value: "quiet" },
  { name: "Reassuring", value: "reassuring" },
  { name: "Reflective", value: "reflective" },
  { name: "Relieved", value: "relieved" },
  { name: "Remorseful", value: "remorseful" },
  { name: "Resigned", value: "resigned" },
  { name: "Sad", value: "sad" },
  { name: "Sarcastic", value: "sarcastic" },
  { name: "Secretive", value: "secretive" },
  { name: "Serious", value: "serious" },
  { name: "Shocked", value: "shocked" },
  { name: "Shouting", value: "shouting" },
  { name: "Shy", value: "shy" },
  { name: "Skeptical", value: "skeptical" },
  { name: "Slow", value: "slow" },
  { name: "Struggling", value: "struggling" },
  { name: "Surprised", value: "surprised" },
  { name: "Suspicious", value: "suspicious" },
  { name: "Sympathetic", value: "sympathetic" },
  { name: "Terrified", value: "terrified" },
  { name: "Upset", value: "upset" },
  { name: "Urgent", value: "urgent" }
];

export const DragonHDOmniLocales: { [key: string]: string } = {
  "en-au": "English (Australia)",
  "en-ca": "English (Canada)",
  "en-gb": "English (United Kingdom)",
  "en-hk": "English (Hong Kong)",
  "en-ie": "English (Ireland)",
  "en-in": "English (India)",
  "en-ke": "English (Kenya)",
  "en-ng": "English (Nigeria)",
  "en-nz": "English (New Zealand)",
  "en-ph": "English (Philippines)",
  "en-sg": "English (Singapore)",
  "en-tz": "English (Tanzania)",
  "en-us": "English (United States)"
};

// https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/Blog-Samples/Introducing-Dragon-HD-Omni/dragonhdomni_voice_list.json
export const DragonHDOmniVoices = [
    {
        "Voice Name": "en-au-annette:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian female voice with a friendly and engaging conversational style, perfect for a podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-carly:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A child voice that's great at conveying curiousity",
        "Gender": "Female",
        "Age Group": "Child"
    },
    {
        "Voice Name": "en-au-darren:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian male with an engaging and conversational tone, well-suited for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-duncan:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian male whose energetic and engaging tone would be a great fit for a conversational podcast or an informative explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-elsie:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "This young adult Australian female voice has an engaging and thoughtful tone, with a smooth delivery well-suited for a tech podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-freya:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A middle-aged Australian female speaks with a smooth, professional tone, making her voice ideal for corporate presentations or documentary narration.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-au-joanne:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "This young adult Australian female has an engaging and upbeat tone, making her voice perfect for a tech podcast or explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-ken:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian male with an enthusiastic and knowledgeable tone, making his polished delivery perfect for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-kim:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian female with an upbeat, engaging tone, making it well-suited for a technology podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-natasha:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A clear-sounding voice with great versatility that can adapt to any use case and speak in a way that's easy to understand.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-au-neil:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian male voice with a smooth, articulate delivery, making it well-suited for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-tim:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A young Australian male voice with a confident and articulate delivery, making it well-suited for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-tina:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "A bright and engaging young adult Australian female voice with a smooth, professional finish, well-suited for an informative podcast or corporate presentation.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-au-william:DragonHDOmniLatestNeural",
        "Locale": "en-au",
        "Description": "An engaging and strong voice, delivering messages with energy and confidence.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-ca-clara:DragonHDOmniLatestNeural",
        "Locale": "en-ca",
        "Description": "A clear-sounding voice with great versatility that can adapt to any use case and speak in a way that's easy to understand.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-ca-liam:DragonHDOmniLatestNeural",
        "Locale": "en-ca",
        "Description": "A young Canadian male speaks with an enthusiastic and articulate style, making his voice a great fit for a tech podcast or educational content.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-abbi:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A young British female with a soft, thoughtful tone that would be well-suited for a podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-ada:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A cheerful and friendly voice, bringing a positive and engaging energy to every conversation.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-gb-alfie:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A middle-aged male with a British accent, whose smooth and knowledgeable tone would be perfect for narrating a tech podcast or documentary.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
      {
        "Voice Name": "en-gb-bella:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "This is an enthusiastic and professional young adult British female voice with a crisp delivery, perfect for e-learning or a tech podcast.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-elliot:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A middle-aged British male voice with a polished, professional tone, well-suited for narrating a documentary or an educational podcast.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-gb-ethan:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A young British male speaker with a conversational and engaging tone, ideal for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-hollie:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "This young British female voice has a bright, energetic tone and a fast-paced delivery perfect for a modern podcast or explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
   {
        "Voice Name": "en-gb-libby:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A clear-sounding voice with great versatility that can adapt to any use case and speak in a way that's easy to understand.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-gb-maisie:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A child voice that's great at conveying curiousity.",
        "Gender": "Female",
        "Age Group": "Child"
    },
    {
        "Voice Name": "en-gb-noah:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A young British male with an enthusiastic, conversational tone, perfect for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-oliver:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A young British male voice with an engaging and enthusiastic tone, and his articulate delivery would be well-suited for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-olivia:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "This young adult British female speaker has a polished and articulate tone, making her voice ideal for corporate narration or a technology podcast.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-ollie:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A friendly and pleasant voice, perfect for creating a comfortable and approachable atmosphere.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-gb-ryan:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A bright and engaging voice, capturing attention with its vibrant and inviting tone.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-gb-sandoverture:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "The authoritative voice of a mature queen, boasting a strong British accent, exuding respect and authority.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-sonia:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A gentle and soft voice, providing a calm and soothing presence.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-gb-thomas:DragonHDOmniLatestNeural",
        "Locale": "en-gb",
        "Description": "A young British male voice with a smooth, knowledgeable tone, ideal for a tech podcast or educational content.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-hk-sam:DragonHDOmniLatestNeural",
        "Locale": "en-hk",
        "Description": "This young adult male speaker has a conversational Hong Kong English accent and an engaged tone, making his voice ideal for a podcast or an informal discussion.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-hk-yan:DragonHDOmniLatestNeural",
        "Locale": "en-hk",
        "Description": "A young female with a Hong Kong English accent, whose friendly and inquisitive tone would be well-suited for a podcast or conversational AI.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-ie-connor:DragonHDOmniLatestNeural",
        "Locale": "en-ie",
        "Description": "A friendly voice with slightly whimsical undertones but with a wide expressive range",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-ie-emily:DragonHDOmniLatestNeural",
        "Locale": "en-ie",
        "Description": "A middle-aged Irish woman with a smooth, professional tone, ideal for news reading or corporate narration.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-in-aarav:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young Indian male speaker with a polished, engaging tone, making his voice well-suited for an educational podcast or a tech review.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-aarti:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "This young female speaker with an Indian English accent has a confident, professional tone, making her voice ideal for a tech podcast or corporate narration.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-aashi:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young female speaker with an Indian English accent; her articulate and professional tone is well-suited for a podcast or e-learning material.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-ananya:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young Indian female with an engaging, conversational style and a smooth finish, making it well-suited for a podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-arjun:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young male with an Indian English accent, whose enthusiastic and polished delivery would be well-suited for a tech podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-kavya:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young female speaker with an Indian English accent; her pleasant and engaging tone would be well-suited for a tech podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-kunal:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A middle-aged Indian male voice with a professional and confident tone, featuring a smooth finish that is well-suited for corporate narration or e-learning.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-in-neerja:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A young Indian female speaker with a smooth, formal tone, whose articulate delivery would be well-suited for e-learning or corporate narration.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-in-prabhat:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A middle-aged Indian male with a deep, resonant, and authoritative voice, whose steady delivery is well-suited for news reading or documentaries.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-in-rehaan:DragonHDOmniLatestNeural",
        "Locale": "en-in",
        "Description": "A middle-aged Indian male voice with an engaging and articulate tone, well-suited for a tech podcast or educational content.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-ke-asilia:DragonHDOmniLatestNeural",
        "Locale": "en-ke",
        "Description": "A young Kenyan female with a smooth, engaging tone, well-suited for a podcast or conversational content.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-ke-chilemba:DragonHDOmniLatestNeural",
        "Locale": "en-ke",
        "Description": "A young Kenyan male with a thoughtful, measured tone, well-suited for an informative podcast or an educational explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-ng-abeo:DragonHDOmniLatestNeural",
        "Locale": "en-ng",
        "Description": "A young Nigerian male with a smooth, engaging, and conversational style that would be a great fit for a podcast or a YouTube explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-ng-ezinne:DragonHDOmniLatestNeural",
        "Locale": "en-ng",
        "Description": "A young Nigerian woman with a smooth and engaging delivery, well-suited for a conversational podcast or an informal explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-nz-mitchell:DragonHDOmniLatestNeural",
        "Locale": "en-nz",
        "Description": "A middle-aged New Zealand male with a smooth, engaging tone and articulate delivery, well-suited for a technology podcast or educational content.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-nz-molly:DragonHDOmniLatestNeural",
        "Locale": "en-nz",
        "Description": "A middle-aged New Zealand woman with a professional, measured tone, whose smooth delivery would be perfect for a corporate presentation or a tech podcast.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-ph-james:DragonHDOmniLatestNeural",
        "Locale": "en-ph",
        "Description": "A young Filipino male with a smooth, informative tone, well-suited for a technology podcast or an educational presentation.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-ph-rosa:DragonHDOmniLatestNeural",
        "Locale": "en-ph",
        "Description": "A young Filipino female voice with a bright, engaging tone and polished delivery, well-suited for a podcast or an explainer video.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-sg-luna:DragonHDOmniLatestNeural",
        "Locale": "en-sg",
        "Description": "A young Singaporean woman with a measured and thoughtful tone, well-suited for a podcast or an educational presentation.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-sg-wayne:DragonHDOmniLatestNeural",
        "Locale": "en-sg",
        "Description": "A young Singaporean male voice with a calm, informative tone, well-suited for a podcast or an educational presentation.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-tz-elimu:DragonHDOmniLatestNeural",
        "Locale": "en-tz",
        "Description": "A young Tanzanian male speaking in a conversational and enthusiastic tone, making it well-suited for a podcast or an educational video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-tz-imani:DragonHDOmniLatestNeural",
        "Locale": "en-tz",
        "Description": "A young Tanzanian female with a professional and enthusiastic tone, well-suited for narrating a documentary or a corporate presentation.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-adam:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A deep, engaging voice that feels warm and inviting.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-alloy:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Alloy voice from OpenAI, a versatile male voice suitable for various contexts.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-amanda:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A bright and clear voice with a youthful energy.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-amber:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An engaging voice for children's stories that's warm and approachable, perfect for capturing the attention of young listeners.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-ana:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A child voice that's great at conveying curiosity and engaging users with a fun and playful tone that's sure to delight.",
        "Gender": "Female",
        "Age Group": "Child"
    },
    {
        "Voice Name": "en-us-andrew:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A warm, engaging voice that sounds like someone you want to know, perfect for building a connection with listeners.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-aria:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A clear-sounding voice with great versatility that can adapt to any use case and speak in a way that's easy to understand.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-ashley:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A young voice that sounds a little shy but honest and sincere, conveying a sense of authenticity and approachability.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-ava:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A bright, engaging voice with a beautiful tone that's perfect for delivering search results and capturing users' attention.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-azabachemyrtille:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A young adult queen with a standard American accent, confident yet reserved, exuding authority while maintaining caution.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-brandon:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An honest and soft-spoken voice that's warm and good for conversation, connecting with users on a personal level and building trust.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-brian:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A youthful, cheerful, and versatile voice that can handle any task you throw its way, well-suited to a wide variety of contexts.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-caleb:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A clear and friendly male voice with neutral accent, suitable for call-center conversations.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-christopher:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A warm voice for imparting information, especially for conversation,  great for conveying information in a fun and approachable way.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-cora:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A softer voice with a touch of melancholy that conveys understanding and empathy, delivering content in a sensitive and compassionate way.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-dana:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A friendly and professional female voice, perfect for customer service or call center roles.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-davis:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A generally calm and relaxed voice that can switch between tones seamlessly and be highly expressive when needed.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-derek:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A formal, knowledgeable voice that exudes confidence.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-dustin:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A voice good for news and podcasts with a unique timbre.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-echo:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Echo voice from OpenAI, a clear and expressive male voice.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-elizabeth:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A professorial voice that's clear and authoritative, great for delivering educational content in a way that's easy to understand.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-emma:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A friendly, sincere voice with a light-hearted and pleasant tone that's ideal for education and explanations.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-eric:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A friendly voice that conveys soft-spoken confidence, inspiring trust and reliability with a calm and collected tone.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-fable:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Fable voice from OpenAI, a voice with a touch of mystery and intrigue (gender unspecified).",
        "Gender": "Neutral",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-guy:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A friendly voice with slightly whimsical undertones and a wide expressive range that can convey any emotion with ease.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-indigobagatelle:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A charming, softly-spoken young female voice with a General American accent, tender and pleasant.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-jacob:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A mature voice that conveys a strong sense of believability, delivering content in a way that's straightforward and to the point.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-jane:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An early-20s female voice like the girl next door that's warm and friendly, great for building a connection with users.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-jason:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An early-20s male voice that's polite and unassuming, perhaps a little shy, with a respectful and professional tone that leaves a good impression.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-jenny:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A youthful voice with a wide range of expressions, perfect for customer service and keeping users satisfied.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-kai:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A sincere, pleasant, and warm voice, offering a heartfelt and approachable tone to the conversation.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-lewis:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A confident, formal voice that conveys expertise and authority.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-lola:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A calm and sincere voice with a warm, reassuring tone.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-luna:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A warm, sincere, and pleasant voice that conveys genuine care and trustworthiness in every interaction.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-marin:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A clear young female voice that is of average pitch, amiable and approachable.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-michelle:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An honest voice that conveys confidence and understanding.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-monica:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A mature voice that conveys a strong sense of believability, perfect for delivering content in the best possible way",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-nancy:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A confident-sounding voice that's perfect for delivering important information with a professional and authoritative tone that inspires trust.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-nova:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Nova voice from OpenAI, a deep, resonant female voice.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-onyx:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Onyx voice from OpenAI, a confident and authoritative male voice.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-phoebe:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A confident and upbeat voice with youthful energy.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-pistachethyme:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A compassionate, serene young adult female with a general American accent, speaking in gentle warmth.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-roger:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A friendly voice that conveys information in a approachable manner",
        "Gender": "Male",
        "Age Group": "Adult"
    },
   {
        "Voice Name": "en-us-samuel:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An expressive voice that feels warm and sincere.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-sandcadenza:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "An affable and tranquil young adult female voice, composed and inviting, with a neutral American accent.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
   {
        "Voice Name": "en-us-sara:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A female teenager voice with a wide range of expressive capabilities that can convey any emotion with ease and keep users engaged.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-us-serena:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A mature, formal voice that commands confidence and respect.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-shimmer:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "Shimmer voice from OpenAI, a bright and engaging female voice.",
        "Gender": "Female",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-steffan:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A pleasant sounding voice that can be someone you know.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-us-tony:DragonHDOmniLatestNeural",
        "Locale": "en-us",
        "Description": "A versatile voice that can sound both casual and professional, adaptable to any use case and situation.",
        "Gender": "Male",
        "Age Group": "Adult"
    },
    {
        "Voice Name": "en-za-leah:DragonHDOmniLatestNeural",
        "Locale": "en-za",
        "Description": "A young South African female with a thoughtful and inquisitive tone, well-suited for a podcast or conversational content.",
        "Gender": "Female",
        "Age Group": "Young Adult"
    },
    {
        "Voice Name": "en-za-luke:DragonHDOmniLatestNeural",
        "Locale": "en-za",
        "Description": "A young South African male with a relaxed, conversational tone, suitable for a technology podcast or an explainer video.",
        "Gender": "Male",
        "Age Group": "Young Adult"
    }
];
